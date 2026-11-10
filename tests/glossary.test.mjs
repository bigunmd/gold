import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const root = new URL('../', import.meta.url);
const text = path => readFileSync(new URL(path, root), 'utf8');
const domain = () => text('skills/domain-modeling/SKILL.md');
const format = () => text('skills/domain-modeling/GLOSSARY-FORMAT.md');
const gold = path => text(`skills/gold-standard-development/${path}.md`);

// These check published instruction contracts, not whether an agent obeys them.
test('glossary discovery preserves configured and existing canonical locations', () => {
  const source = domain();
  for (const marker of [/configur/i, /existing/i, /canonical/i, /preserv|reuse|honou?r|respect/i]) {
    assert.match(source, marker, 'discover and reuse the project authority before choosing a default');
  }
  assert.match(source, /docs\/glossary\.md/);
  assert.match(source, /GLOSSARY\.md/);
  assert.match(source, /GLOSSARY-MAP\.md/);
  assert.match(source, /default/i);
  assert.match(source, /duplicat/i, 'avoid competing glossary authorities');
});

test('glossary format defines compact terms and optional naming and context guidance', () => {
  const source = format();
  assert.match(source, /\|\s*Term\s*\|\s*Definition\s*\|\s*Distinction\s*\|/i);
  assert.match(source, /Naming notes/i);
  assert.match(source, /optional/i);
  assert.match(source, /context/i);
  assert.match(source, /heading/i);
  assert.match(source, /docs\/glossary\.md/);
  assert.match(source, /GLOSSARY-MAP\.md/);
});

test('glossary entries record established domain meanings rather than guesses or implementation notes', () => {
  const source = `${domain()}\n${format()}`;
  assert.match(source, /established|confirmed|resolved/i);
  assert.match(source, /ambigu|uncertain|unclear/i);
  assert.match(source, /ask|clarif/i);
  assert.match(source, /infer|invent|guess/i);
  assert.match(source, /implementation details/i);
  assert.match(source, /spec|scratch/i);
});

test('glossary maintenance stays within approval and read-only boundaries', () => {
  const source = domain();
  assert.match(source, /approved scope/i);
  assert.match(source, /read-only/i);
  assert.match(source, /creat/i);
  assert.match(source, /no(?:t|ne)?\b[^\n.]*permission|without[^\n.]*approv|only[^\n.]*approv|approv[^\n.]*before/i);
  assert.match(source, /conflict|contradiction/i);
  assert.match(source, /propos|report|surface/i);
});

test('semantic glossary changes are distinguished from editorial corrections', () => {
  const source = domain();
  assert.match(source, /semantic/i);
  assert.match(source, /editorial/i);
  assert.match(source, /meaning/i);
  assert.match(source, /approv|confirm/i);
  assert.match(source, /unrelated|drift/i);
});

test('multi-context glossary guidance retains maps and resolves ambiguous context', () => {
  const source = `${domain()}\n${format()}`;
  assert.match(source, /GLOSSARY-MAP\.md/);
  assert.match(source, /context/i);
  assert.match(source, /ambigu|unclear/i);
  assert.match(source, /ask|clarif/i);
  assert.match(source, /collis|same term|same word|overload/i);
});

test('shared persona routes glossary consumption and maintenance without requiring setup', () => {
  const source = text('preset-src/core-persona.txt');
  assert.match(source, /glossary/i);
  assert.match(source, /domain-modeling/);
  assert.match(source, /discover|canonical|existing/i);
  assert.match(source, /read|consum/i);
  assert.match(source, /approved scope|authorization/i);
  assert.match(source, /Do not run setup/i);
});

test('discovery handles missing configured paths and competing authorities without setup', () => {
  const source = text('skills/domain-modeling/GLOSSARY-DISCOVERY.md');
  assert.match(source, /configured path is absent/);
  assert.match(source, /multiple apparent authorities conflict/);
  assert.match(source, /ask rather than choosing a winner/);
  assert.match(source, /vendor/);
});

test('setup records canonical locations regardless of repository layout', () => {
  const source = text('skills/setup-matt-pocock-skills/SKILL.md');
  assert.match(source, /Always include Section C/);
  assert.doesNotMatch(source, /Section C when there's no monorepo/);
  assert.match(source, /Repository layout alone neither establishes nor rules out/);
  assert.match(text('skills/setup-matt-pocock-skills/domain.md'), /project-relative paths/);
});

test('teaching routes directly to project authority before standalone glossary guidance', () => {
  const source = text('skills/teach/SKILL.md');
  assert.match(source, /domain-modeling\/GLOSSARY-DISCOVERY\.md/);
  assert.match(source, /Teaching glossary guidance\]\(GLOSSARY-FORMAT\.md\)/);
  assert.match(source, /do not create a competing teaching glossary/);
});

test('GOLD lifecycle covers glossary discovery, authorized maintenance and closure impact', () => {
  const orientation = `${gold('references/develop')}\n${gold('references/architecture')}`;
  const implementation = `${gold('references/develop')}\n${gold('references/software-development')}`;
  const closure = `${gold('references/quality')}\n${gold('templates/iteration')}`;
  assert.match(orientation, /glossary/i, 'orientation/adoption discovers the canonical domain vocabulary');
  assert.match(implementation, /glossary/i, 'implementation maintains glossary terms within scope');
  assert.match(closure, /glossary[^\n]*impact|impact[^\n]*glossary/i, 'closure assesses glossary impact');
  assert.match(gold('templates/iteration'), /glossary/i, 'iteration record makes the assessment visible');
  assert.match(gold('references/artifacts'), /glossary/i, 'durable glossary knowledge belongs with shared docs');
});
