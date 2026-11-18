import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync} from 'node:fs';
const root = new URL('../', import.meta.url);
const text = p => readFileSync(new URL(p, root), 'utf8');
test('installable private bundle excludes local state', () => {
  assert.ok(existsSync(new URL('package.json', root)), 'bundle manifest must exist');
  const p = JSON.parse(text('package.json'));
  assert.equal(p.name, '@local/dsh-gold-preset');
  assert.equal(p.private, true);
  assert.equal(p.dsh.bundle.patch, './cordis.patch.yml');
  assert.deepEqual(p.files, ['cordis.patch.yml', 'skills', 'README.md', 'THIRD_PARTY_NOTICES.md']);
  assert.ok(text('.gitignore').split('\n').includes('/.gold/'));
});
test('DSH 0.2.2 presets use the main subagent-control plugin without the retired list-agents export', () => {
  const shared = text('preset-src/shared-tools.yml');
  const patch = text('cordis.patch.yml');
  for (const source of [shared, patch]) {
    assert.doesNotMatch(source, /tool-subagent-list-agents|@deepseek-ai\/dsh-tool-subagent-control\/list-agents/);
  }
  const control = /- id: tool-subagent-control\n\s+name: '@deepseek-ai\/dsh-tool-subagent-control'\n/g;
  assert.equal([...shared.matchAll(control)].length, 1);
  const presets = patch.split(/^    - id: preset-/m).slice(1);
  assert.equal(presets.length, 5);
  for (const preset of presets) assert.equal([...preset.matchAll(control)].length, 1);
});
test('GOLD uses current composition and installed package resource root', () => {
  assert.ok(existsSync(new URL('cordis.patch.yml', root)), 'preset declaration must exist');
  const s = text('cordis.patch.yml');
  assert.match(s, /id: preset-gold/);
  assert.match(s, /name: "GOLD Development"/);
  assert.match(s, /id: "gold"\n/);
  assert.match(s, /prefix: "/);
  assert.match(s, /workflow-ptc/);
  assert.doesNotMatch(s, /workflow-worker-thread|\.agent-presets/);
  assert.match(s, /resolve\('@local\/dsh-gold-preset\/package.json'\)/);
});
