import {checkPackage} from '../scripts/check-release.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
const root = new URL('../', import.meta.url);
const text = p => readFileSync(new URL(p, root), 'utf8');
const manifest = JSON.parse(text('skills/setup-matt-pocock-skills/upstream-manifest.json'));
const entries = manifest.files.filter(f => f.target.endsWith('/SKILL.md'));
test('27 active Matt Pocock skills retain discovery metadata and invocation split', () => {
  assert.equal(entries.length, 27);
  assert.equal(manifest.revision, 'b0618bc436ad893b3c5e84e55fba86586d34a404');
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
test('wizard template syntax passes and noninteractive execution fails before effects', () => {
  const path = new URL('skills/wizard/template.sh', root);
  assert.equal(spawnSync('bash', ['-n', path.pathname]).status, 0);
  const run = spawnSync('bash', [path.pathname], {encoding:'utf8'});
  assert.equal(run.status, 1);
  assert.match(run.stderr, /interactive human terminal/);
  assert.doesNotMatch(text('skills/wizard/template.sh'), /gh secret set|gh variable set|cat "\$tmp"/);
});
