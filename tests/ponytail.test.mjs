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
  assert.match(text('THIRD_PARTY_NOTICES.md'), /7801d061243d7b753bad0e0b3c057cd250b11755/);
  assert.match(text('skills/ponytail/UPSTREAM_LICENSE'), /Permission is hereby granted/);
});
test('v5.3.3 preserves conversation-local off and ignore-aware one-shot debt', () => {
  assert.match(text('skills/ponytail/SKILL.md'), /argument-hint: "\[lite\|full\|ultra\|off\]"/);
  assert.match(text('skills/ponytail/SKILL.md'), /off disables Ponytail guidance, not GOLD/);
  const debt = text('skills/ponytail-debt/SKILL.md');
  assert.match(debt, /nested rules and negations/);
  assert.match(debt, /git check-ignore --no-index --stdin/);
  assert.match(debt, /Inspect content only on eligible paths/);
  for (const name of ['debt', 'gain']) assert.doesNotMatch(text(`skills/ponytail-${name}/SKILL.md`), /normal mode.*revert|stop ponytail/);
  assert.match(text('skills/ponytail-help/SKILL.md'), /band commands.*not supported/);
  assert.match(text('skills/ponytail-gain/SKILL.md'), /9cc65d03aa2da1db7121b912d03596409ee340b8\/benchmarks/);
});
test('all five generated personas load Ponytail without changing authorization', () => {
  const patch = text('cordis.patch.yml');
  assert.equal(patch.split('also load ponytail unless').length - 1, 5);
  assert.equal(patch.split('Ponytail controls solution simplicity, not scope').length - 1, 5);
  assert.equal(patch.split('a review verdict is not delivery acceptance').length - 1, 5);
});
