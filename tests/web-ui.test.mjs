import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync, readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const root = new URL('../', import.meta.url);
const text = path => readFileSync(new URL(path, root), 'utf8');
const families = ['frontend-design', 'ui-ux-pro-max', 'design-taste-frontend', 'web-design-guidelines', 'impeccable'];

test('Web UI router and five families are discoverable and bounded', () => {
  for (const name of ['gold-web-ui', ...families]) {
    const source = text(`skills/${name}/SKILL.md`);
    assert.match(source, new RegExp(`^---\\nname: ${name}\\ndescription:`));
    assert.ok(source.length < 8192, name);
    assert.match(source, /GOLD \/ DSH integration contract/);
    assert.doesNotMatch(source.split('\n---')[0], /hooks:|disable-model-invocation: true/);
  }
  const router = text('skills/gold-web-ui/SKILL.md');
  for (const name of families) assert.ok(router.includes(`\`${name}\``));
  assert.match(router, /one design lead/i);
  assert.match(router, /existing brand\/design system/);
  assert.match(router, /Review-only requests do not authorize edits/);
});
test('all five generated personas selectively route Web UI work', () => {
  const marker = 'For web UI design, frontend implementation, visual polish or interface review, load gold-web-ui';
  assert.ok(text('preset-src/core-persona.txt').includes(marker));
  assert.equal(text('cordis.patch.yml').split(marker).length - 1, 5);
});
test('capability-aware fundamentals distinguish evidence and scope', () => {
  const foundations = text('skills/gold-web-ui/references/foundations.md');
  const verification = text('skills/gold-web-ui/references/verification.md');
  for (const value of ['WCAG 2.2 AA', '4.5:1', '3:1', '24', '320', '200%', 'prefers-reduced-motion', 'GSAP']) assert.ok(foundations.includes(value), value);
  for (const value of ['source-only', 'screenshots', 'keyboard', 'screen-reader', 'No browser', 'not proof of WCAG conformance', 'permission']) assert.ok(verification.includes(value), value);
  for (const file of readdirSync(new URL('skills/gold-web-ui/references/', root))) assert.ok(text(`skills/gold-web-ui/references/${file}`).length < 8192);
});
test('family contracts keep optional integrations and style rules subordinate', () => {
  assert.match(text('skills/design-taste-frontend/SKILL.md'), /No Stop hooks/);
  assert.match(text('skills/design-taste-frontend/SKILL.md'), /not universal requirements/);
  assert.match(text('skills/impeccable/SKILL.md'), /No engine downloads/);
  assert.match(text('skills/impeccable/SKILL.md'), /not the upstream CLI/);
  assert.match(text('skills/web-design-guidelines/SKILL.md'), /pinned local/);
  assert.match(text('skills/web-design-guidelines/references/review.md'), /Native buttons/);
  assert.match(text('skills/ui-ux-pro-max/SKILL.md'), /stdout-only/);
  assert.match(text('skills/ui-ux-pro-max/SKILL.md'), /--stack/);
});
test('adapted guidance has immutable source and packaged license provenance', () => {
  const manifest = JSON.parse(text('skills/gold-web-ui/upstream-manifest.json'));
  assert.equal(manifest.sources.length, 4);
  for (const source of manifest.sources) {
    assert.match(source.revision, /^[a-f0-9]{40}$/);
    assert.match(source.repository, /^https:\/\/github.com\//);
    for (const input of source.inputs) {
      assert.match(input.sha256, /^[a-f0-9]{64}$/);
      assert.ok(input.path);
    }
    assert.ok(text(source.license).includes(source.licenseType === 'MIT' ? 'Permission is hereby granted' : 'Apache License'));
    for (const target of source.targets) {
      const actual = createHash('sha256').update(readFileSync(new URL(target.path, root))).digest('hex');
      assert.equal(actual, target.sha256, target.path);
    }
  }
});
