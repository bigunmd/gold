import test from 'node:test';import assert from 'node:assert/strict';
import {existsSync,mkdirSync,mkdtempSync,writeFileSync} from 'node:fs';import {fileURLToPath} from 'node:url';import {join} from 'node:path';import {execFileSync,spawnSync} from 'node:child_process';
const url=new URL('../scripts/check-git.mjs',import.meta.url);async function api(){assert.ok(existsSync(url),'missing range adapter');return import(url);}
test('GitHub events select real candidate heads and reject missing inputs',async()=>{
 const {selectRange}=await api();const a='a'.repeat(40),b='b'.repeat(40);
 assert.equal(selectRange('pull_request',{pull_request:{base:{sha:a},head:{sha:b,ref:'feat/x'},title:'feat: x',body:'$(touch marker)'}}).head,b);
 assert.equal(selectRange('push',{before:'0'.repeat(40),after:b,ref:'refs/heads/main'}).base,null);
 assert.throws(()=>selectRange('push',{before:a}));assert.throws(()=>selectRange('pull_request',{}));
});
test('actual Git ranges exclude old history, reject missing refs, retain root commit and metadata',async()=>{
 const {inspectRange}=await api();const base=fileURLToPath(new URL('../.gold/git-fixtures/',import.meta.url));mkdirSync(base,{recursive:true});const cwd=mkdtempSync(join(base,'range-'));
 const env={...process.env,GIT_AUTHOR_NAME:'Test Human',GIT_AUTHOR_EMAIL:'test@example.com',GIT_COMMITTER_NAME:'Test Human',GIT_COMMITTER_EMAIL:'test@example.com'};
 const git=(...args)=>execFileSync('git',args,{cwd,env,encoding:'utf8'}).trim();git('init','--quiet');git('-c','commit.gpgsign=false','commit','--allow-empty','-m','old nonconventional history');const old=git('rev-parse','HEAD');
 git('-c','commit.gpgsign=false','commit','--allow-empty','-m','feat: candidate');const head=git('rev-parse','HEAD');
 assert.equal(inspectRange({cwd,base:old,head}).length,1);assert.equal(inspectRange({cwd,base:old,head})[0].message.trim(),'feat: candidate');
 assert.equal(inspectRange({cwd,base:null,head:old}).length,1);
 assert.throws(()=>inspectRange({cwd,base:'f'.repeat(40),head}),/resolve|unknown|invalid|bad|object/i);
 assert.throws(()=>inspectRange({cwd,base:old,head:'$(touch marker)'}));assert.ok(!existsSync(join(cwd,'marker')));
 assert.throws(()=>inspectRange({cwd,base:head,head}),/empty/i);
 const cli=(...args)=>spawnSync(process.execPath,[fileURLToPath(url),...args],{cwd,env,encoding:'utf8'});
 assert.equal(cli('--base',old,'--head',head).status,0);
 const eventPath=join(cwd,'event.json');const event={pull_request:{base:{sha:old},head:{sha:head,ref:'feat/example'},title:'feat: $(touch marker)',body:'Untrusted `$(touch marker)` text'}};
 writeFileSync(eventPath,JSON.stringify(event));assert.equal(cli('--event',eventPath,'--event-name','pull_request').status,0);assert.ok(!existsSync(join(cwd,'marker')));
 event.pull_request.title='bad title';writeFileSync(eventPath,JSON.stringify(event));assert.equal(cli('--event',eventPath,'--event-name','pull_request').status,1);
 git('-c','commit.gpgsign=false','commit','--allow-empty','-m','fix: issue\n\nCo-authored-by: Claude <bot@anthropic.com>');const bad=git('rev-parse','HEAD');assert.equal(cli('--base',head,'--head',bad).status,1);
 assert.equal(cli('--event',eventPath,'--event-name','workflow_dispatch').status,1);
 // Real merge fixture: no rewriting of earlier fixture history.
 git('checkout','--quiet','-b','side',head);writeFileSync(join(cwd,'side.txt'),'side content\n');git('add','side.txt');git('-c','commit.gpgsign=false','commit','-m','docs: side');const side=git('rev-parse','HEAD');
 git('checkout','--quiet','-b','integration',head);git('-c','commit.gpgsign=false','commit','--allow-empty','-m','fix: integration');
 git('-c','commit.gpgsign=false','merge','--no-ff',side,'-m',"Merge branch 'side'");const merged=git('rev-parse','HEAD');
 assert.equal(inspectRange({cwd,base:head,head:merged}).at(-1).parents.length,2);assert.equal(cli('--base',head,'--head',merged).status,0);
 writeFileSync(eventPath,JSON.stringify({before:'0'.repeat(40),after:merged,ref:'refs/heads/integration'}));assert.equal(cli('--event',eventPath,'--event-name','push').status,1,'new branch checks historical invalid root subject');
 assert.equal(cli('--event',eventPath,'--event-name','workflow_dispatch').status,0);
 git('-c','commit.gpgsign=false','revert','--no-edit','-m','1',merged);const reverted=git('rev-parse','HEAD');
 const result=cli('--base',merged,'--head',reverted);assert.equal(result.status,0,result.stderr);
});
