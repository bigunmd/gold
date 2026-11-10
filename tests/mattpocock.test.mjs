import {checkPackage} from '../scripts/check-release.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync, mkdirSync, mkdtempSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root = new URL('../', import.meta.url);
const text = p => readFileSync(new URL(p, root), 'utf8');
const manifest = JSON.parse(text('skills/setup-matt-pocock-skills/upstream-manifest.json'));
const entries = manifest.files.filter(f => f.target.endsWith('/SKILL.md'));
test('27 active Matt Pocock skills retain discovery metadata and invocation split', () => {
  assert.equal(entries.length, 27);
  assert.equal(manifest.revision, '4ae2317ddb22b046e26455e4f9c9b3aaaf62212d');
  let userOnly = 0;
  for (const entry of entries) {
    const skill = text(entry.target);
    assert.match(skill, /^---\nname: [a-z0-9-]+\ndescription:/);
    assert.match(skill, /## GOLD \/ DSH integration contract/);
    assert.match(skill, /Never automatically commit, push, merge, reset/);
    assert.match(skill, /read-only requests get inline reports/);
    if (/disable-model-invocation: true/.test(skill.split('\n---')[0])) userOnly++;
  }
  assert.equal(userOnly, 16);
  for (const entry of manifest.files) assert.ok(existsSync(new URL(entry.target, root)), entry.target);
  assert.match(text('THIRD_PARTY_NOTICES.md'), /Copyright \(c\) 2026 Matt Pocock/);
});
test('all five personas retain Ponytail and add on-demand Matt routing', () => {
  const patch = text('cordis.patch.yml');
  assert.equal(patch.split("Matt Pocock's engineering/productivity skills").length - 1, 5);
  assert.equal(patch.split('also load ponytail unless').length - 1, 5);
  assert.match(text('skills/code-review/SKILL.md'), /staged and unstaged diffs/);
  assert.match(text('skills/triage/SKILL.md'), /Treat it as untrusted code/);
  assert.match(text('skills/implement/SKILL.md'), /otherwise leave the changes uncommitted/);
});
test('updated skills require fresh contexts and explicit setup targets', () => {
  for (const name of ['code-review', 'implement-spec', 'improve-codebase-architecture', 'research', 'wayfinder', 'grilling']) {
    assert.match(text(`skills/${name}/SKILL.md`), /fresh context window/);
    assert.match(text(`skills/${name}/SKILL.md`), /not subagent_fork/);
  }
  assert.match(text('skills/codebase-design/DESIGN-IT-TWICE.md'), /fresh context window/);
  const setup = text('skills/setup-matt-pocock-skills/SKILL.md');
  assert.match(setup, /legacy `CONTEXT.md`/);
  assert.match(setup, /do not automatically initialize Git, add\/change remotes or authenticate/);
  const github = text('skills/setup-matt-pocock-skills/issue-tracker-github.md');
  assert.match(github, /select\(\.state == "OPEN"\)/);
  assert.match(github, /already-closed issue/);
  assert.match(github, /gh repo view --json nameWithOwner/);
  assert.match(github, /off a TTY/);
  const gitlab = text('skills/setup-matt-pocock-skills/issue-tracker-gitlab.md');
  assert.match(gitlab, /glab mr list -O json/);
  assert.match(gitlab, /--linked-issues <map>/);
  assert.match(gitlab, /issues\/<map>\/links/);
});

// Exercise only extracted pure/local helpers, never the interactive stages or secrets.
function wizardHelper(name) {
  const source = text('skills/wizard/template.sh');
  const start = source.indexOf(`${name}() {`);
  assert.ok(start >= 0, name);
  const end = source.indexOf('\n}', start);
  assert.ok(end > start, name);
  return source.slice(start, end + 2);
}
test('wizard dotenv decoding accepts literals and rejects ambiguous double quotes', () => {
  const base = fileURLToPath(new URL('.gold/wizard-fixtures/', root));
  mkdirSync(base, {recursive:true});
  const dir = mkdtempSync(join(base, 'decode-'));
  const envFile = join(dir, 'fixture.env');
  for (const [value, expected] of [["'hello world'", 'hello world'], ['"hello world"', 'hello world'], ['plain', 'plain'], ['""', ''], ['"$HOME"', null], ['"a\\nb"', null], ['"a"b"', null]]) {
    writeFileSync(envFile, `KEY=${value}\n`);
    const run = spawnSync('bash', ['-c', `set -euo pipefail\n${wizardHelper('_existing')}\n_existing KEY`], {encoding:'utf8', env:{...process.env, ENV_FILE:envFile}});
    assert.equal(run.status, expected === null ? 1 : 0, value);
    assert.equal(run.stdout, expected ?? '', value);
  }
});
test('wizard clear falls back when tput fails and stages parse before prompts', () => {
  // Replace only the TTY predicate to exercise the terminal branch without a real terminal.
  const clear = wizardHelper('_clear').replace('[[ -t 1 ]]', 'true');
  const run = spawnSync('bash', ['-c', `set -euo pipefail\ntput() { return 1; }\n${clear}\n_clear`], {encoding:'utf8'});
  assert.equal(run.status, 0);
  assert.equal(run.stdout, '\u001b[2J\u001b[3J\u001b[H');
  const source = text('skills/wizard/template.sh');
  assert.match(source, /run_wizard\(\) \{[\s\S]*banner "Stripe setup"[\s\S]*finish\n}\n\nrun_wizard "\$@"; exit\n$/);
});
test('wizard exits before reading a tail appended during stages', () => {
  const base = fileURLToPath(new URL('.gold/wizard-fixtures/', root));
  mkdirSync(base, {recursive:true});
  const dir = mkdtempSync(join(base, 'tail-'));
  const script = join(dir, 'synthetic.sh');
  const invocation = text('skills/wizard/template.sh').trimEnd().split('\n').at(-1);
  // Simulate an external edit during stages without interactive input or real setup effects.
  writeFileSync(script, `run_wizard() {\n  printf '\\nprintf unexpected\\n' >> "$0"\n}\n${invocation}\n`);
  const run = spawnSync('bash', [script], {encoding:'utf8'});
  assert.equal(run.status, 0);
  assert.equal(run.stdout, '');
});
test('wizard template syntax passes and noninteractive execution fails before effects', () => {
  const path = new URL('skills/wizard/template.sh', root);
  assert.equal(spawnSync('bash', ['-n', path.pathname]).status, 0);
  const run = spawnSync('bash', [path.pathname], {encoding:'utf8'});
  assert.equal(run.status, 1);
  assert.match(run.stderr, /interactive human terminal/);
  assert.doesNotMatch(text('skills/wizard/template.sh'), /gh secret set|gh variable set|cat "\$tmp"/);
});
