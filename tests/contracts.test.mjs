import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
const root=new URL('../skills/gold-standard-development/',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
for (const name of ['develop','debug','resolve-issue','artifacts','architecture','quality']) test(`playbook ${name} exists and is bounded`,()=>{
 assert.ok(existsSync(new URL(`references/${name}.md`,root)),`missing ${name} playbook`);
 assert.ok(read(`references/${name}.md`).length<8192);
});
test('discoverable compact orchestrator and artifact templates',()=>{
 assert.ok(existsSync(new URL('SKILL.md',root)),'missing orchestrator');
 const s=read('SKILL.md'); assert.match(s,/name: gold-standard-development/); assert.ok(s.length<8192);
 for(const n of ['brief','state','investigation','evidence','iteration','memory-index','c4-architecture','adr']) assert.ok(existsSync(new URL(`templates/${n}.md`,root)),n);
 assert.match(read('templates/iteration.md'),/C4 assessment/);
 assert.match(read('references/artifacts.md'),/git ls-files/);
 assert.match(read('references/artifacts.md'),/git check-ignore/);
 assert.match(read('references/artifacts.md'),/non-Git/i);
 assert.match(read('references/architecture.md'),/without an ADR/);
 assert.match(read('references/debug.md'),/inconclusive/);
 assert.match(read('templates/iteration.md'),/delivery scenarios only/);
 assert.match(read('references/artifacts.md'),/Memory is a cache, not authority/);
 assert.match(read('references/resolve-issue.md'),/Never close a remote issue without explicit authorization/);
 for (const match of s.matchAll(/`((?:references|templates)\/[^`]+\.md)`/g)) assert.ok(existsSync(new URL(match[1],root)),`broken resource ${match[1]}`);
});
