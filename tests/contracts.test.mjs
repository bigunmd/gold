import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve,relative} from 'node:path';
const root=new URL('../skills/gold-standard-development/',import.meta.url);
const read=p=>readFileSync(new URL(p,root),'utf8');
for (const name of ['develop','debug','resolve-issue','artifacts','architecture','quality','collaboration','plan-design','review-audit','test-validate','release-operate','architecture-planning','software-development','testing-qa','devops-reliability','security-privacy','git-policy','specialties','specialties/git-release','specialties/security-review','specialties/api-contracts','specialties/database-migrations','specialties/performance','specialties/documentation','specialties/accessibility','specialties/incident-investigation']) test(`playbook ${name} exists and is bounded`,()=>{
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

function resources(dir=fileURLToPath(root)) {
 return readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?resources(resolve(dir,e.name)):[resolve(dir,e.name)]);
}
test('all skill resources are bounded and local markdown references resolve',()=>{
 for (const file of resources()) {
  const content=readFileSync(file,'utf8');
  assert.ok(content.length<8192,`${relative(fileURLToPath(root),file)} exceeds resource budget`);
  for (const match of content.matchAll(/`((?:\.\.\/)*[a-z][a-z0-9/-]*\.md)`/g)) {
   const p=match[1];
   // docs/ names describe target-project artifacts, not bundled resources.
   if (p.startsWith('docs/')) continue;
   assert.ok(existsSync(resolve(dirname(file),p)),`broken reference ${p} in ${file}`);
  }
 }
});
test('execution resources and templates are discoverable on demand',()=>{
 const s=read('SKILL.md');
 for (const n of ['execution','delegation','evidence']) {
  assert.match(s,new RegExp(`references/${n}\\.md`));
  assert.ok(existsSync(new URL(`references/${n}.md`,root)));
 }
 for (const n of ['delegation-assignment','delegation-result','parent-integration','execution-envelope']) {
  assert.ok(existsSync(new URL(`templates/${n}.md`,root)),n);
  assert.ok(['execution','delegation'].some(r=>read(`references/${r}.md`).includes(`../templates/${n}.md`)),`undiscoverable ${n}`);
 }
});
test('delegation requires operational ownership and parent verification',()=>{
 const d=read('references/delegation.md');
 for (const re of [/approval provenance/i,/exclusive write ownership/i,/baseline/i,/stop conditions/i,/unknown effects/i,/parent.*integration/i,/rerun affected/i,/cannot.*approve/i]) assert.match(d,re);
 for (const re of [/Owned paths/i,/Allowed actions/i,/Dependencies/i,/Budget/i,/Criteria/i]) assert.match(read('templates/delegation-assignment.md'),re);
 for (const re of [/Actual commands/i,/Content identity/i,/Outstanding/i,/Limitations/i]) assert.match(read('templates/delegation-result.md'),re);
 assert.match(read('templates/parent-integration.md'),/Criterion.*Evidence/);
});
test('execution resume reconciles outstanding work without gate waivers',()=>{
 const e=read('references/execution.md');
 for (const re of [/internal steps/i,/informational milestones/i,/human acceptance/i,/Gate 2/,/unknown effects/i,/collect/i,/cancel/i,/cancellation.*not.*rollback/i,/retry/i,/concurrency/i,/no-progress/i,/elapsed/i,/explicit.*process change/i]) assert.match(e,re);
 const state=read('templates/state.md');
 for (const re of [/Outstanding child\/job ledger/i,/Runtime id/i,/Effects/i,/Reconciliation/i,/Budget/i,/Content identity/i]) assert.match(state,re);
 assert.match(read('references/artifacts.md'),/execution\.md/);
 assert.match(read('references/debug.md'),/execution\.md/);
});
test('criterion evidence binds tested content and does not promise installed CLI',()=>{
 const e=read('references/evidence.md');
 for (const re of [/content identity/i,/untracked/i,/before.*after/i,/criterion/i,/scripts\/fingerprint\.mjs/,/maintainer/i,/not.*installed/i,/explicit content identity/i,/affected.*checks/i]) assert.match(e,re);
 for (const re of [/Evidence ID/,/Criterion ID/,/Content identity/,/Before.*after/,/Uncovered/]) assert.match(read('templates/evidence.md'),re);
 assert.match(read('templates/brief.md'),/AC-1/);
 assert.match(read('templates/iteration.md'),/criterion.*evidence/i);
});
