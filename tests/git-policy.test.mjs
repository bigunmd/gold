import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
const moduleUrl=new URL('../scripts/git-policy.mjs',import.meta.url);
async function api(){assert.ok(existsSync(moduleUrl),'missing git policy');return import(moduleUrl);}
test('Conventional subjects and genuine Git exceptions',async()=>{
 const {checkSubject}=await api();
 for(const type of ['feat','fix','docs','refactor','test','perf','build','ci','chore','revert'])assert.deepEqual(checkSubject(`${type}(api)!: improve contract`),[]);
 for(const s of ['','update stuff','feat: ','Feat: change','fix(scope with spaces): thing'])assert.ok(checkSubject(s).length,s);
 assert.deepEqual(checkSubject("Merge branch 'feature'",{merge:true}),[]);
 assert.ok(checkSubject("Merge branch 'feature'").length);
 assert.deepEqual(checkSubject('Revert "fix: regression"',{revert:true}),[]);
});
test('Model metadata rejected while human attribution and disclosures survive',async()=>{
 const {checkAttribution}=await api();
 for(const message of ['fix: parser\n\nCo-authored-by: Claude <noreply@anthropic.com>','fix: parser\n\nSIGNED-OFF-BY: ChatGPT <bot@openai.com>','fix: parser\n\nGenerated with Claude'])assert.ok(checkAttribution({message}).length,message);
 assert.ok(checkAttribution({message:'fix: parser',author:'Claude <bot@anthropic.com>'}).length);
 assert.ok(checkAttribution({message:'fix: parser',committer:'GitHub Copilot <bot@github.com>'}).length);
 for(const message of ['fix: parser\n\nCo-authored-by: Jane Doe <jane@example.com>','fix: parser\n\nSigned-off-by: Jane Doe <jane@example.com>','docs: describe Claude integration\n\nAI assistance was used as required by project disclosure policy.','docs: preserve Copyright (c) 2025 VoltAgent'])assert.deepEqual(checkAttribution({message}),[]);
 assert.deepEqual(checkAttribution({message:'fix: parser',author:'Claude Shannon <claude.shannon@example.org>'}),[]);
 assert.deepEqual(checkAttribution({message:'fix: parser\n\nCo-authored-by: Claude Martin <cmartin@example.org>'}),[]);
 assert.deepEqual(checkAttribution({message:'docs: illustrate rejected trailer\n\nExample:\n```text\nCo-authored-by: Claude <bot@anthropic.com>\n```'}),[]);
 assert.deepEqual(checkAttribution({message:'Example:\n```text\nCo-authored-by: Claude <bot@anthropic.com>\n```',prBody:true}),[]);
});
test('Branches use conventional names without renaming mainlines',async()=>{
 const {checkBranch}=await api();for(const b of ['main','master','develop','feat/api-contracts','fix/123-parser','release/1.2.0'])assert.deepEqual(checkBranch(b),[]);
 for(const b of ['bad branch','feature/x','feat/UpperCase','feat/','release/nope'])assert.ok(checkBranch(b).length,b);
});
