import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {checkMarkdown} from '../scripts/check-release.mjs';
const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const skill = 'skills/gold-standard-development/';

test('C4 routes focused views and legacy migration without mandatory restructuring', () => {
  const policy = read(`${skill}references/architecture.md`);
  for (const marker of ['current/', 'use-cases/', 'evolution/', 'architecture-migration.md', 'reviewed-no-change', 'without an ADR', 'Git', 'implemented', 'deployed']) assert.ok(policy.includes(marker), marker);
  assert.match(policy, /no append-only/i);
  assert.match(read(`${skill}SKILL.md`), /legacy.*references\/architecture-migration\.md/i);
  const migration = read(`${skill}references/architecture-migration.md`);
  for (const re of [/approval/i, /read-only/i, /section.*destination/i, /inbound links/i, /anchors/i, /partial/i, /second pass/i, /accepted ADR/i, /unresolved/i, /small.*coherent/i, /factual corrections/i]) assert.match(migration, re);
});

test('C4 templates separate index, view and evolution without growing change tables', () => {
  for (const name of ['c4-architecture', 'c4-view', 'c4-evolution']) {
    const text = read(`${skill}templates/${name}.md`);
    assert.doesNotMatch(text, /^## Changes$/m);
    assert.match(read(`${skill}references/architecture.md`), new RegExp(`${name}\\.md`));
  }
  assert.match(read(`${skill}templates/c4-view.md`), /Sources and validation/);
  assert.match(read(`${skill}templates/c4-evolution.md`), /proposed.*accepted.*in-progress.*implemented.*superseded.*abandoned/);
  assert.match(read(`${skill}templates/iteration.md`), /Assessed views/);
});

test('GOLD architecture has a linked index and preserves legacy anchors', () => {
  const index = read('docs/architecture/README.md');
  assert.match(index, /current\/system-context\.md/);
  assert.match(index, /current\/resource-structure\.md/);
  const compat = read('docs/architecture/c4.md');
  const headings = ['GOLD preset architecture', 'System context', 'Runtime units and resources', 'Contracts and boundaries', 'Maintainer validation boundary (since 1.3.0)', 'Validation', 'Changes'];
  for (const heading of headings) assert.ok(compat.includes(`# ${heading}`), heading);
  assert.ok(compat.length < 2200, 'compatibility entry point must not retain the monolith');
  assert.doesNotMatch(compat, /```mermaid/);
  assert.deepEqual(checkMarkdown(fileURLToPath(root), ['docs/architecture/README.md', 'docs/architecture/c4.md']), []);
});

test('C4 behavioral fixtures cover migration, ambiguity, recovery and repeatability', () => {
  const cases = JSON.parse(read('tests/fixtures/c4-migration.json'));
  assert.deepEqual(cases.map(c => c.id), ['legacy', 'mixed', 'partial', 'current']);
  for (const c of cases) {
    assert.ok(c.prompt && Object.keys(c.files).length && c.expected.length && c.prohibited.length, c.id);
    for (const path of Object.keys(c.files)) assert.ok(!path.startsWith('/') && !path.split('/').includes('..'), path);
  }
  // These are probe inputs and review criteria, not an executable migration engine.
  assert.ok(existsSync(new URL('tests/fixtures/c4-migration.json', root)));
});
