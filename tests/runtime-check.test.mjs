import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {dirname, join, resolve} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {EXPRESSIONS, PRESET_IDS, checkRuntime, loadRequiredPatches, parseArgs, probeParser, validateManifest, validatePatches} from '../scripts/check-runtime.mjs';

const expression = source => ({__jsExpr: source});
const row = (id, name = id, extra = {}) => ({id, name: `@deepseek-ai/dsh-${name}`, ...extra});
function fixture() {
  const group = (id, isolate, config) => ({id, name: 'cordis:group', group: true, isolate, config});
  return [{insert: PRESET_IDS.map(id => ({id: `preset-${id}`, name: '@deepseek-ai/dsh-agent-preset', config: {
    id, name: id, description: 'fixture', order: 1, plugins: [
      row('tool-bash', 'tool-bash', {disabled: expression(EXPRESSIONS.bash)}),
      row('tool-pwsh', 'tool-pwsh', {disabled: expression(EXPRESSIONS.pwsh)}),
      row('skill-filesystem', 'skill-filesystem', {config: {customSkillDirs: [expression(EXPRESSIONS.skills)]}}),
      group('planning', {planMode: true}, [row('plan-mode')]),
      group('compaction', {compaction: true, toolResultPruner: true}, [row('compaction-basic'), row('command-compact'), row('tool-result-pruner', 'compaction-tool-result-pruner')]),
      group('delegation', {workflowEngine: true}, [row('workflow-ptc'), row('tool-workflow')]),
    ],
  }}))}];
}
const plugins = patches => patches[0].insert[0].config.plugins;
const manifest = () => ({name: '@local/dsh-gold-preset', version: '1.3.0', private: true, type: 'module', dsh: {bundle: {patch: './cordis.patch.yml'}}});
function scratch(t) {
  const directory = mkdtempSync(join(tmpdir(), 'gold-runtime-test-'));
  t.after(() => {
    assert.equal(dirname(directory), resolve(tmpdir()));
    assert.ok(directory.startsWith(join(resolve(tmpdir()), 'gold-runtime-test-')));
    rmSync(directory, {recursive: true, force: true});
  });
  return directory;
}

test('runtime gate requires explicit absolute roots and rejects unknown/duplicate options', () => {
  assert.deepEqual(parseArgs(['--runtime', '/runtime', '--package', '/package']), {runtime: '/runtime', package: '/package'});
  for (const args of [[], ['--runtime', '/runtime'], ['--runtime', '.','--package','/p'], ['--package'], ['--runtime','/r','--runtime','/r','--package','/p'], ['--runtime','/r','--package','/p','--mount','/x']]) assert.throws(() => parseArgs(args));
});

test('malformed, ambiguous, escaping or wrong-package manifests fail closed', () => {
  assert.equal(validateManifest(manifest(), 'package').version, '1.3.0');
  assert.equal(validateManifest({name: '@deepseek-ai/dsh', version: '0.2.0-rc.2'}, 'runtime').version, '0.2.0-rc.2');
  for (const value of [null, [], {}, {...manifest(), name: '@other/package'}, {...manifest(), version: 130}, {...manifest(), version: 'latest'}, {...manifest(), private: false}, {...manifest(), type: 'commonjs'}, {...manifest(), dsh: null}]) assert.throws(() => validateManifest(value, 'package'));
  for (const patch of [null, [], '../cordis.patch.yml', '/tmp/cordis.patch.yml', ['./cordis.patch.yml'], '']) {
    const value = manifest(); value.dsh.bundle.patch = patch;
    assert.throws(() => validateManifest(value, 'package'));
  }
  const ambiguous = manifest(); ambiguous.dsh.bundle.patches = ['./other.yml'];
  assert.throws(() => validateManifest(ambiguous, 'package'), /unexpected field/);
});

test('parser return contract accepts only direct nonempty synchronous arrays', () => {
  const expected = fixture(); let invocation;
  assert.equal(loadRequiredPatches({loadOptionalPatches: (...args) => {invocation = args; return expected;}}, '/p/cordis.patch.yml'), expected);
  assert.deepEqual(invocation, ['gold-runtime-check', '/p/cordis.patch.yml']);
  for (const result of [undefined, null, [], {}, {patches: expected}, Promise.resolve(expected), '[]']) {
    assert.throws(() => loadRequiredPatches({loadOptionalPatches: () => result}, '/missing'), /Parser contract/);
  }
  assert.throws(() => loadRequiredPatches({}, '/p'), /loadOptionalPatches/);
  assert.throws(() => loadRequiredPatches({loadOptionalPatches: () => {throw Error('invalid YAML');}}, '/p'), /invalid YAML/);
});

test('parser probes reject implementations that discard tags or accept malformed YAML', t => {
  const directory = scratch(t);
  const loader = {isJsExpr: value => typeof value?.__jsExpr === 'string', evaluate: () => 3};
  const fakeBoot = {loadOptionalPatches: (_label, path) => {
    if (path.endsWith('missing.yml')) return undefined;
    if (path.includes('invalid-')) throw Error('malformed');
    return [{insert: [{disabled: expression('1 + 2')}]}];
  }};
  assert.doesNotThrow(() => probeParser(fakeBoot, loader, directory));
  assert.throws(() => probeParser(fakeBoot, {}, directory), /Loader contract/);
  assert.throws(() => probeParser({loadOptionalPatches: () => [{insert: [{disabled: '1 + 2'}]}]}, loader, directory), /!!js/);
  assert.throws(() => probeParser({loadOptionalPatches: () => [{insert: [{disabled: expression('1 + 2')}]}]}, loader, directory), /malformed probe/);
});

test('five parsed declarations preserve expressions and service-isolation structure', () => {
  const result = validatePatches(fixture());
  assert.deepEqual(result.presetIds, PRESET_IDS);
  assert.equal(result.expressions.length, 15);
  assert.ok(result.modules.includes('@deepseek-ai/dsh-plan-mode'));
  assert.ok(!result.modules.includes('cordis:group'));
});

test('patches reject missing/duplicate identities, malformed rows and unrecognized fields', () => {
  const mutations = [
    patches => patches.push({insert: []}),
    patches => {patches[0].id = 'override';},
    patches => patches[0].insert.pop(),
    patches => {patches[0].insert[1].config.id = 'gold';},
    patches => {patches[0].insert[0].id = 'preset-wrong';},
    patches => {patches[0].insert[0].disabled = true;},
    patches => {patches[0].insert[0].config.order = 'first';},
    patches => plugins(patches).push(plugins(patches)[0]),
    patches => {plugins(patches)[0].name = '../plugin.js';},
    patches => {plugins(patches)[0].name = '@deepseek-ai/dsh-tool-fs';},
    patches => {plugins(patches)[2].disabled = true;},
    patches => {plugins(patches)[0].disabled = 'false';},
    patches => {plugins(patches)[0].unexpected = true;},
    patches => {plugins(patches)[3].config = {};},
  ];
  for (const mutation of mutations) {const patches = fixture(); mutation(patches); assert.throws(() => validatePatches(patches), String(mutation));}
  for (const value of [undefined, {}, [], [null], [{insert: [null, null, null, null, null]}]]) assert.throws(() => validatePatches(value));
});

test('planMode, compaction/pruner and workflow providers/consumers cannot escape isolation', () => {
  const mutations = [
    patches => {plugins(patches)[3].isolate.planMode = false;},
    patches => {delete plugins(patches)[4].isolate.toolResultPruner;},
    patches => {plugins(patches)[5].isolate = {workflow: true};},
    patches => {plugins(patches)[3].disabled = true;},
    patches => {plugins(patches)[3].config[0].disabled = true;},
    patches => plugins(patches).push(plugins(patches)[5].config.pop()),
    patches => plugins(patches).push(row('another-plan-mode', 'plan-mode')),
  ];
  for (const mutation of mutations) {const patches = fixture(); mutation(patches); assert.throws(() => validatePatches(patches), String(mutation));}
});

test('only the three audited expressions per preset are allowed, without executing arbitrary code', () => {
  const mutations = [
    patches => {plugins(patches)[0].disabled = true;},
    patches => {plugins(patches)[0].disabled = expression('process.exit(99)');},
    patches => {plugins(patches)[0].disabled.extra = 1;},
    patches => {plugins(patches)[2].config.customSkillDirs = ['/checkout/skills'];},
    patches => {plugins(patches)[2].config.customSkillDirs.push(expression(EXPRESSIONS.skills));},
    patches => {plugins(patches)[3].config[0].config = {unexpected: expression('process.exit(99)')};},
    patches => {plugins(patches)[3].config[0].config = {unexpected: expression(EXPRESSIONS.bash)};},
  ];
  for (const mutation of mutations) {const patches = fixture(); mutation(patches); assert.throws(() => validatePatches(patches), String(mutation));}
});

test('filesystem manifest failures are failures, not skipped runtime successes', async t => {
  const root = scratch(t);
  await assert.rejects(checkRuntime({runtime: root, package: root}), /ENOENT/);
  writeFileSync(join(root, 'package.json'), '{broken');
  await assert.rejects(checkRuntime({runtime: root, package: root}), /JSON|Unexpected|Expected/);
  writeFileSync(join(root, 'package.json'), JSON.stringify({name: '@other/runtime', version: '1.0.0'}));
  await assert.rejects(checkRuntime({runtime: root, package: root}), /manifest name/);
  await assert.rejects(checkRuntime({runtime: '.', package: root}), /absolute/);
});

test('CLI exits nonzero with actionable opt-in diagnostics and does not default to this machine', () => {
  const script = fileURLToPath(new URL('../scripts/check-runtime.mjs', import.meta.url));
  const result = spawnSync(process.execPath, [script], {encoding: 'utf8'});
  assert.equal(result.status, 1);
  assert.match(result.stderr, /--runtime.*--package/);
  assert.equal(result.stdout, '');
  assert.doesNotMatch(readFileSync(script, 'utf8'), /\/home\/linuxbrew|DSH_PROFILE/);
});
