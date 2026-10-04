import {createHash} from 'node:crypto';
import {createRequire} from 'node:module';
import {mkdtempSync, mkdirSync, readFileSync, realpathSync, rmSync, statSync, symlinkSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, isAbsolute, join, relative, resolve, sep} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

export const PRESET_IDS = ['gold', 'gold-auto', 'gold-architect', 'gold-reviewer', 'gold-devops'];
export const EXPRESSIONS = Object.freeze({
  bash: "process.platform === 'win32'",
  pwsh: "process.platform !== 'win32'",
  skills: "process.getBuiltinModule('node:path').join(process.getBuiltinModule('node:path').dirname(process.getBuiltinModule('node:module').createRequire(baseUrl).resolve('@local/dsh-gold-preset/package.json')), 'skills')",
});
const fail = message => { throw new Error(message); };
const requireThat = (condition, message) => { if (!condition) fail(message); };
const record = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const inside = (root, path) => { const rel = relative(root, path); return rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel); };
const json = path => JSON.parse(readFileSync(path, 'utf8'));
const digest = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const ownKeys = (value, allowed, label) => requireThat(Object.keys(value).every(key => allowed.includes(key)), `${label}: unexpected field`);

export function parseArgs(args) {
  const result = {};
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i];
    requireThat(['--runtime', '--package'].includes(key) && !Object.hasOwn(result, key.slice(2)), `Unknown or duplicate argument: ${key}`);
    requireThat(typeof args[i + 1] === 'string' && isAbsolute(args[i + 1]), `${key} requires an explicit absolute directory`);
    result[key.slice(2)] = args[i + 1];
  }
  requireThat(result.runtime && result.package, 'Usage: node scripts/check-runtime.mjs --runtime /installed/dsh/root --package /extracted/package/root');
  return result;
}

export function validateManifest(manifest, kind) {
  requireThat(record(manifest), `${kind} manifest must be an object`);
  const expected = kind === 'runtime' ? '@deepseek-ai/dsh' : '@local/dsh-gold-preset';
  requireThat(manifest.name === expected, `${kind} manifest name must be ${expected}`);
  requireThat(typeof manifest.version === 'string' && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(manifest.version), `${kind} manifest must have a version`);
  if (kind === 'package') {
    requireThat(manifest.type === 'module' && manifest.private === true, 'GOLD manifest must be private ESM');
    requireThat(record(manifest.dsh) && record(manifest.dsh.bundle), 'GOLD manifest must declare dsh.bundle');
    ownKeys(manifest.dsh.bundle, ['patch'], 'GOLD bundle');
    requireThat(manifest.dsh.bundle.patch === './cordis.patch.yml', 'GOLD bundle must declare ./cordis.patch.yml');
  }
  return manifest;
}

/** Do not mistake absent, wrapped, asynchronous or empty results for parsed patches. */
export function loadRequiredPatches(boot, path) {
  requireThat(typeof boot.loadOptionalPatches === 'function', 'Parser contract: dsh-app-boot must export loadOptionalPatches');
  const patches = boot.loadOptionalPatches('gold-runtime-check', path);
  requireThat(Array.isArray(patches) && patches.length > 0, 'Parser contract: expected a nonempty synchronous PatchOptions[]');
  return patches;
}

/** A deliberately narrow GOLD contract, not a replacement general-purpose YAML parser. */
export function validatePatches(patches) {
  requireThat(Array.isArray(patches) && patches.length === 1 && record(patches[0]), 'GOLD must contain one insert patch');
  ownKeys(patches[0], ['insert'], 'GOLD patch');
  const declarations = patches[0].insert;
  requireThat(Array.isArray(declarations) && declarations.length === 5, 'GOLD must insert exactly five declarations');
  const presetIds = new Set();
  const modules = new Set();
  const expressions = [];
  const expression = (value, expected, label) => {
    requireThat(record(value) && Object.keys(value).length === 1 && value.__jsExpr === expected, `${label}: expected Loader !!js expression`);
    expressions.push({label, source: expected});
  };
  for (const declaration of declarations) {
    requireThat(record(declaration), 'Invalid declaration');
    ownKeys(declaration, ['id', 'name', 'config'], 'Declaration');
    const config = declaration.config;
    requireThat(record(config) && PRESET_IDS.includes(config.id) && !presetIds.has(config.id), 'Expected five unique GOLD preset IDs');
    presetIds.add(config.id);
    requireThat(declaration.id === `preset-${config.id}` && declaration.name === '@deepseek-ai/dsh-agent-preset', `Invalid declaration for ${config.id}`);
    ownKeys(config, ['id', 'name', 'description', 'order', 'plugins'], config.id);
    requireThat(typeof config.name === 'string' && config.name.length > 0 && typeof config.description === 'string' && Number.isFinite(config.order), `${config.id}: invalid roster metadata`);
    modules.add(declaration.name);
    const ids = new Map();
    const walk = (rows, parents = []) => {
      requireThat(Array.isArray(rows) && rows.length > 0, `${config.id}: expected nonempty plugin list`);
      for (const row of rows) {
        requireThat(record(row) && typeof row.id === 'string' && row.id.length > 0 && !ids.has(row.id), `${config.id}: missing or duplicate child ID`);
        ownKeys(row, ['id', 'name', 'config', 'group', 'isolate', 'disabled'], row.id);
        requireThat(typeof row.name === 'string' && (row.name === 'cordis:group' || /^@deepseek-ai\/dsh-[a-z0-9-]+(?:\/[a-z0-9-]+)?$/.test(row.name)), `${row.id}: unexpected module name`);
        requireThat(row.disabled === undefined || typeof row.disabled === 'boolean' || record(row.disabled), `${row.id}: invalid disabled value`);
        ids.set(row.id, {row, parents});
        if (row.name === 'cordis:group') {
          requireThat(row.group === true && record(row.isolate) && row.disabled === undefined, `${row.id}: invalid group`);
          walk(row.config, [...parents, row.id]);
        } else {
          requireThat(row.group === undefined && row.isolate === undefined, `${row.id}: unexpected group/isolate`);
          modules.add(row.name);
        }
      }
    };
    walk(config.plugins);
    const at = id => { requireThat(ids.has(id), `${config.id}: missing ${id}`); return ids.get(id); };
    const groups = [
      ['planning', ['planMode'], {'plan-mode': '@deepseek-ai/dsh-plan-mode'}],
      ['compaction', ['compaction', 'toolResultPruner'], {'compaction-basic': '@deepseek-ai/dsh-compaction-basic', 'command-compact': '@deepseek-ai/dsh-command-compact', 'tool-result-pruner': '@deepseek-ai/dsh-compaction-tool-result-pruner'}],
      ['delegation', ['workflowEngine'], {'workflow-ptc': '@deepseek-ai/dsh-workflow-ptc', 'tool-workflow': '@deepseek-ai/dsh-tool-workflow'}],
    ];
    for (const [id, services, consumers] of groups) {
      const {row, parents} = at(id);
      requireThat(row.name === 'cordis:group' && parents.length === 0 && record(row.isolate), `${id}: expected top-level isolated group`);
      requireThat(Object.keys(row.isolate).length === services.length && services.every(service => row.isolate[service] === true), `${id}: incorrect service isolation`);
      for (const [child, name] of Object.entries(consumers)) {
        const found = at(child);
        requireThat(found.row.name === name && found.parents.length === 1 && found.parents[0] === id && found.row.disabled === undefined, `${child}: must be enabled inside ${id}`);
        requireThat([...ids.values()].filter(item => item.row.name === name).length === 1, `${child}: duplicate provider/consumer`);
      }
    }
    requireThat([...ids.values()].filter(item => item.row.name === 'cordis:group').length === 3, 'Expected exactly three isolation groups');
    for (const id of ['tool-bash', 'tool-pwsh', 'skill-filesystem']) {
      const found = at(id);
      requireThat(found.row.name === `@deepseek-ai/dsh-${id}` && found.parents.length === 0, `${id}: expected top-level plugin`);
    }
    expression(at('tool-bash').row.disabled, EXPRESSIONS.bash, `${config.id}/tool-bash`);
    expression(at('tool-pwsh').row.disabled, EXPRESSIONS.pwsh, `${config.id}/tool-pwsh`);
    const skill = at('skill-filesystem').row;
    requireThat(skill.disabled === undefined && Array.isArray(skill.config?.customSkillDirs) && skill.config.customSkillDirs.length === 1, `${config.id}: invalid skill filesystem`);
    expression(skill.config.customSkillDirs[0], EXPRESSIONS.skills, `${config.id}/skills`);
    let markers = 0;
    const scan = value => {
      if (record(value) && Object.hasOwn(value, '__jsExpr')) { markers++; requireThat(Object.keys(value).length === 1 && Object.values(EXPRESSIONS).includes(value.__jsExpr), 'Unexpected !!js expression'); }
      else if (value && typeof value === 'object') Object.values(value).forEach(scan);
    };
    scan(declaration);
    requireThat(markers === 3, `${config.id}: expected exactly three !!js expressions`);
  }
  return {presetIds: [...presetIds], modules: [...modules].sort(), expressions};
}

/** Check the actual installed parser and evaluator, including rejection behavior. */
export function probeParser(boot, loader, scratch) {
  requireThat(typeof loader.evaluate === 'function' && typeof loader.isJsExpr === 'function', 'Loader contract: missing evaluate/isJsExpr');
  const valid = join(scratch, 'parser-probe.yml');
  writeFileSync(valid, '- insert:\n    - id: probe\n      name: cordis:group\n      disabled: !!js 1 + 2\n');
  const node = loadRequiredPatches(boot, valid)[0]?.insert?.[0]?.disabled;
  requireThat(record(node) && node.__jsExpr === '1 + 2' && loader.isJsExpr(node) && loader.evaluate({}, node.__jsExpr) === 3, 'Parser contract: !!js was not preserved/evaluated');
  for (const [index, text] of ['insert: []\n', '- null\n', '- insert: [\n', '- insert: []\n  insert: []\n'].entries()) {
    const path = join(scratch, `invalid-${index}.yml`);
    writeFileSync(path, text);
    let rejected = false;
    try { boot.loadOptionalPatches('gold-runtime-check', path); } catch { rejected = true; }
    requireThat(rejected, `Parser contract: malformed probe ${index} was accepted`);
  }
  requireThat(boot.loadOptionalPatches('gold-runtime-check', join(scratch, 'missing.yml')) === undefined, 'Parser contract: missing optional file must return undefined');
}

export async function checkRuntime(options) {
  requireThat(typeof options.runtime === 'string' && isAbsolute(options.runtime) && typeof options.package === 'string' && isAbsolute(options.package), 'Explicit absolute runtime and package roots are required');
  const runtimeRoot = realpathSync(options.runtime);
  const packageRoot = realpathSync(options.package);
  const runtimeManifest = validateManifest(json(join(runtimeRoot, 'package.json')), 'runtime');
  const manifestPath = join(packageRoot, 'package.json');
  const manifest = validateManifest(json(manifestPath), 'package');
  const patchPath = realpathSync(join(packageRoot, manifest.dsh.bundle.patch));
  requireThat(inside(packageRoot, patchPath) && statSync(patchPath).isFile(), 'Packaged patch must be a file inside package root');
  const runtimeRequire = createRequire(join(runtimeRoot, 'package.json'));
  const resolveRuntime = name => {
    const path = realpathSync(runtimeRequire.resolve(name));
    requireThat(inside(runtimeRoot, path) && statSync(path).isFile(), `${name}: resolved outside explicit installed runtime`);
    return path;
  };
  const bootPath = resolveRuntime('@deepseek-ai/dsh-app-boot');
  const loaderPath = resolveRuntime('@deepseek-ai/cordis-plugin-loader');
  const [boot, loader] = await Promise.all([import(pathToFileURL(bootPath).href), import(pathToFileURL(loaderPath).href)]);
  const scratch = mkdtempSync(join(tmpdir(), 'gold-runtime-check-'));
  try {
    probeParser(boot, loader, scratch);
    const contract = validatePatches(loadRequiredPatches(boot, patchPath));
    const resolvedModules = contract.modules.map(name => ({name, path: resolveRuntime(name)}));
    // Model installed package lookup without writing a profile or the extracted package.
    const scope = join(scratch, 'node_modules', '@local');
    mkdirSync(scope, {recursive: true});
    symlinkSync(packageRoot, join(scope, 'dsh-gold-preset'), process.platform === 'win32' ? 'junction' : 'dir');
    const baseUrl = pathToFileURL(join(scratch, 'check.cjs')).href;
    requireThat(realpathSync(createRequire(baseUrl).resolve('@local/dsh-gold-preset/package.json')) === realpathSync(manifestPath), 'Installed self-resolution selected another package');
    const skillRoot = realpathSync(join(packageRoot, 'skills'));
    const skillFile = realpathSync(join(skillRoot, 'gold-standard-development', 'SKILL.md'));
    requireThat(inside(packageRoot, skillRoot) && inside(skillRoot, skillFile) && statSync(skillFile).isFile() && readFileSync(skillFile, 'utf8').trim().length > 0, 'Missing or escaping packaged self skill');
    for (const expression of contract.expressions) {
      requireThat(loader.isJsExpr({__jsExpr: expression.source}), 'Loader expression marker contract changed');
      for (const platform of ['linux', 'darwin', 'win32']) {
        const result = loader.evaluate({baseUrl, process: {platform, getBuiltinModule: process.getBuiltinModule?.bind(process)}}, expression.source);
        const expected = expression.source === EXPRESSIONS.skills ? skillRoot : expression.source === EXPRESSIONS.bash ? platform === 'win32' : platform !== 'win32';
        requireThat((expression.source === EXPRESSIONS.skills ? realpathSync(result) : result) === expected, `${expression.label}: incorrect evaluation for ${platform}`);
      }
    }
    return {
      status: 'passed', level: 'parse-expression-resolution', mounted: false,
      node: process.version, runtime: {root: runtimeRoot, version: runtimeManifest.version, bootPath, loaderPath},
      package: {root: packageRoot, version: manifest.version, manifestSha256: digest(manifestPath), patchSha256: digest(patchPath)},
      presetIds: contract.presetIds, expressionCount: contract.expressions.length,
      platformsChecked: ['linux', 'darwin', 'win32'], resolvedModules, skillRoot,
      limitations: ['No Cordis mount or plugin activation; no tool execution, service-leak audit, peer admission or live-profile compatibility claim.'],
    };
  } finally {
    // Only remove the exact unique scratch directory allocated above, never caller paths.
    requireThat(dirname(scratch) === resolve(tmpdir()) && scratch.startsWith(join(resolve(tmpdir()), 'gold-runtime-check-')), 'Refusing unsafe scratch cleanup');
    rmSync(scratch, {recursive: true, force: true});
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { console.log(JSON.stringify(await checkRuntime(parseArgs(process.argv.slice(2))), null, 2)); }
  catch (error) { console.error(`GOLD runtime check failed: ${error.message}`); process.exitCode = 1; }
}
