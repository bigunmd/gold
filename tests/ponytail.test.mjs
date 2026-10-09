import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const text = p => readFileSync(new URL('../' + p, import.meta.url), 'utf8');
const names = ['ponytail', 'ponytail-review', 'ponytail-audit', 'ponytail-debt', 'ponytail-gain', 'ponytail-help'];
test('six Ponytail skills are discoverable and retain GOLD boundaries', () => {
  for (const name of names) {
    const skill = text(`skills/${name}/SKILL.md`);
    assert.match(skill, new RegExp(`^---\\nname: ${name}\\ndescription:`, 'm'));
    assert.match(skill, /GOLD/);
  }
  assert.match(text('skills/ponytail-debt/SKILL.md'), /gitignored local/);
  assert.match(text('skills/ponytail-gain/SKILL.md'), /not been independently reproduced/);
  assert.match(text('skills/ponytail-help/SKILL.md'), /No cross-session persistence/);
  assert.match(text('THIRD_PARTY_NOTICES.md'), /9cc65d03aa2da1db7121b912d03596409ee340b8/);
  assert.match(text('skills/ponytail/UPSTREAM_LICENSE'), /Permission is hereby granted/);
});
test('all five generated personas load Ponytail without changing authorization', () => {
  const patch = text('cordis.patch.yml');
  assert.equal(patch.split('also load ponytail unless').length - 1, 5);
  assert.equal(patch.split('Ponytail controls solution simplicity, not scope').length - 1, 5);
  assert.equal(patch.split('a review verdict is not delivery acceptance').length - 1, 5);
});
