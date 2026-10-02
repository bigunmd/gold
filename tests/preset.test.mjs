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
  assert.deepEqual(p.files, ['cordis.patch.yml', 'skills', 'README.md']);
  assert.ok(text('.gitignore').split('\n').includes('/.gold/'));
});
test('GOLD uses current composition and installed package resource root', () => {
  assert.ok(existsSync(new URL('cordis.patch.yml', root)), 'preset declaration must exist');
  const s = text('cordis.patch.yml');
  assert.match(s, /id: preset-gold/);
  assert.match(s, /name: GOLD Development/);
  assert.match(s, /id: gold\n/);
  assert.match(s, /prefix: \|/);
  assert.match(s, /workflow-ptc/);
  assert.doesNotMatch(s, /workflow-worker-thread|\.agent-presets/);
  assert.match(s, /resolve\('@local\/dsh-gold-preset\/package.json'\)/);
});
