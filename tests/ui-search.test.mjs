import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, mkdirSync, mkdtempSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';

const root = fileURLToPath(new URL('../', import.meta.url));
const skill = join(root, 'skills/ui-ux-pro-max');
const script = join(skill, 'scripts/search.py');
const base = join(root, '.gold/iterations/web-ui-dd05b99a/pro-max/fixtures');
mkdirSync(base, {recursive: true});
const fixture = () => mkdtempSync(join(base, 'search-'));
function run(args, cwd = fixture()) {
  const result = spawnSync('python3', ['-B', script, ...args], {
    cwd, encoding: 'utf8', timeout: 15000, maxBuffer: 1024 * 1024,
  });
  assert.ifError(result.error);
  return result;
}
function json(args) {
  const result = run([...args, '--json']);
  assert.equal(result.status, 0, result.stderr);
  return JSON.parse(result.stdout);
}

test('domain searches return actual palette, style and accessibility records', () => {
  const palette = json(['healthcare', '--domain', 'color', '-n', '2']);
  assert.equal(palette.domain, 'color');
  assert.ok(palette.count >= 1 && palette.count <= 2);
  assert.match(palette.results[0]['Product Type'], /health|medical/i);
  assert.match(palette.results[0].Primary, /^#[0-9A-F]{6}$/i);
  const style = json(['glassmorphism', '--domain', 'style']);
  assert.equal(style.results[0]['Style ID'], 'glassmorphism');
  const ux = json(['keyboard focus', '--domain', 'ux']);
  assert.ok(ux.count > 0);
  assert.match(JSON.stringify(ux.results), /keyboard|focus/i);
});

test('all advertised domains and stacks have usable local CSV data', () => {
  const code = `import sys\nsys.path.insert(0, sys.argv[1])\nimport core\nfor domain in core.CSV_CONFIG:\n    result = core.search('accessibility', domain)\n    assert 'error' not in result, result\nfor stack in core.AVAILABLE_STACKS:\n    result = core.search_stack('accessibility', stack)\n    assert 'error' not in result, result\nprint(len(core.CSV_CONFIG), len(core.AVAILABLE_STACKS))\n`;
  const result = spawnSync('python3', ['-B', '-c', code, join(skill, 'scripts')], {
    cwd: fixture(), encoding: 'utf8', timeout: 15000,
  });
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.equal(result.stdout.trim(), '12 22');
});

test('stack lookup stays separate from deterministic design-system generation', () => {
  const stack = json(['keyboard focus', '--stack', 'react']);
  assert.equal(stack.domain, 'stack');
  assert.equal(stack.stack, 'react');
  assert.ok(stack.count > 0);
  const args = ['SaaS dashboard', '--design-system', '-p', 'Demo', '--json'];
  const plain = run(args);
  assert.equal(plain.status, 0, plain.stderr);
  const data = JSON.parse(plain.stdout);
  assert.equal(data.design_system.project_name, 'Demo');
  assert.ok(data.design_system.source_identities.product);
  assert.ok(data.design_system.source_identities.style);
  assert.match(data.design_system.colors.primary, /^#[0-9a-f]{6}$/i);
  assert.equal(data.persistence, null);
  const combined = run([...args, '--stack', 'react']);
  assert.equal(combined.status, 0, combined.stderr);
  assert.match(combined.stderr, /ignored.*design-system mode/);
  assert.deepEqual(JSON.parse(combined.stdout), data);
  const markdown = run(['SaaS dashboard', '--design-system', '--format', 'markdown']);
  assert.equal(markdown.status, 0, markdown.stderr);
  assert.match(markdown.stdout, /### Colors/);
  assert.match(markdown.stdout, /### Typography/);
});

test('no-match and invalid CLI inputs are explicit', () => {
  const result = json(['zzzzqqqqxyxy', '--domain', 'style']);
  assert.equal(result.count, 0);
  assert.deepEqual(result.results, []);
  for (const args of [
    ['x', '--stack', '../../escape'], ['x', '--domain', 'unknown'],
    ['x', '--max-results', '0'], ['x', '--max-results', '21'],
    ['x', '--rtl', 'full', '--stack', 'react'],
  ]) {
    const invalid = run(args);
    assert.equal(invalid.status, 2);
    assert.match(invalid.stderr, /error:/);
  }
});

test('read-only CLI refuses every persistence option without creating files', () => {
  const cwd = fixture();
  for (const args of [['healthcare', '--domain', 'color'], ['SaaS dashboard', '--design-system']]) {
    const result = run(args, cwd);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(readdirSync(cwd), []);
  }
  for (const flags of [
    ['--persist'], ['--output-dir', cwd], ['--page', '../../escape'], ['--force'],
    ['--persist', '--output-dir', cwd, '--force'],
  ]) {
    const result = run(['SaaS dashboard', '--design-system', ...flags], cwd);
    assert.equal(result.status, 2, `${flags}: ${result.stderr}`);
    assert.match(result.stderr, /persistence is disabled/i);
  }
  assert.deepEqual(readdirSync(cwd), []);
});

test('Python API rejects persistence before writes, not only the CLI', () => {
  const cwd = fixture();
  const code = `import sys\nsys.path.insert(0, sys.argv[1])\nfrom design_system import generate_design_system\nfor options in ({'persist': True}, {'output_dir': '.'}, {'page': 'dashboard'}, {'force': True}):\n    try:\n        generate_design_system('SaaS dashboard', **options)\n    except ValueError as error:\n        assert 'persistence is disabled' in str(error).lower()\n    else:\n        raise AssertionError('persistence accepted')\n`;
  const result = spawnSync('python3', ['-B', '-c', code, join(skill, 'scripts')], {cwd, encoding: 'utf8', timeout: 15000});
  assert.ifError(result.error);
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(readdirSync(cwd), []);
});

test('pin and per-file hashes cover every vendored runtime resource', () => {
  const manifest = JSON.parse(readFileSync(join(skill, 'upstream-manifest.json'), 'utf8'));
  assert.equal(manifest.revision, '6ae86f61f520d6ca229d2f40e070410638c908c5');
  assert.equal(manifest.repository, 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill');
  const digest = content => createHash('sha256').update(content).digest('hex');
  for (const entry of manifest.files) {
    assert.match(entry.upstreamSha256, /^[0-9a-f]{64}$/);
    assert.equal(digest(readFileSync(join(root, entry.target))), entry.vendoredSha256, entry.target);
    if (!entry.adaptation) assert.equal(entry.vendoredSha256, entry.upstreamSha256, entry.target);
  }
  const resources = ['LICENSE', ...readdirSync(join(skill, 'scripts'), {recursive: true}).map(p => `scripts/${p}`),
    ...readdirSync(join(skill, 'data'), {recursive: true}).filter(p => p.endsWith('.csv')).map(p => `data/${p}`)];
  assert.deepEqual(manifest.files.map(f => f.target.replace('skills/ui-ux-pro-max/', '')).sort(), resources.sort());
  assert.match(readFileSync(join(skill, 'LICENSE'), 'utf8'), /Copyright \(c\) 2024 Next Level Builder/);
  assert.ok(!readdirSync(join(skill, 'scripts')).includes('__pycache__'));
});
