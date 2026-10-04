import test from 'node:test';import assert from 'node:assert/strict';
import {existsSync,mkdirSync,mkdtempSync,writeFileSync,readFileSync,readdirSync} from 'node:fs';import {fileURLToPath} from 'node:url';import {join} from 'node:path';import {spawnSync} from 'node:child_process';
import {createGitFixture} from './helpers/git-fixture.mjs';
const url=new URL('../scripts/check-git.mjs',import.meta.url);async function api(){assert.ok(existsSync(url),'missing range adapter');return import(url);}
test('GitHub events select real candidate heads and reject missing inputs',async()=>{
 const {selectRange}=await api();const a='a'.repeat(40),b='b'.repeat(40);
 assert.equal(selectRange('pull_request',{pull_request:{base:{sha:a},head:{sha:b,ref:'feat/x'},title:'feat: x',body:'$(touch marker)'}}).head,b);
 assert.equal(selectRange('push',{before:'0'.repeat(40),after:b,ref:'refs/heads/main'}).base,null);
 assert.throws(()=>selectRange('push',{before:a}));assert.throws(()=>selectRange('pull_request',{}));
});
test('fixture mutations ignore inherited Git routing, config, hooks and templates',async()=>{
 const base=fileURLToPath(new URL('../.gold/git-fixtures/',import.meta.url));mkdirSync(base,{recursive:true});const root=mkdtempSync(join(base,'hostile-'));
 const sentinel=createGitFixture({base:root,prefix:'sentinel-'});writeFileSync(join(sentinel.cwd,'keep.txt'),'sentinel worktree\n');sentinel.git('add','keep.txt');sentinel.git('commit','-m','test: sentinel');
 const hooks=join(root,'hooks'),templates=join(root,'templates'),home=join(root,'home'),xdg=join(root,'xdg');
 for(const path of [hooks,join(templates,'hooks'),home,join(xdg,'git')])mkdirSync(path,{recursive:true});
 const marker=join(root,'hook-ran');const hook=`#!/bin/sh\nprintf 'unsafe hook\\n' >> '${marker.replaceAll("'","'\\''")}'\nexit 1\n`;
 for(const name of ['pre-commit','post-checkout','post-merge']){writeFileSync(join(hooks,name),hook,{mode:0o755});writeFileSync(join(templates,'hooks',name),hook,{mode:0o755});}
 writeFileSync(join(templates,'inherited-template'),'must not copy\n');
 const config=`[core]\n hooksPath = ${JSON.stringify(hooks)}\n[init]\n templateDir = ${JSON.stringify(templates)}\n[commit]\n gpgSign = true\n[gpg]\n program = ${JSON.stringify(join(hooks,'pre-commit'))}\n`;
 const global=join(root,'global.config'),system=join(root,'system.config');
 for(const path of [global,system,join(home,'.gitconfig'),join(xdg,'git/config')])writeFileSync(path,config);
 const snapshot=dir=>Object.fromEntries(readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?Object.entries(snapshot(join(dir,entry.name))).map(([path,value])=>[`${entry.name}/${path}`,value]):[[entry.name,readFileSync(join(dir,entry.name)).toString('hex')]]));
 const before=snapshot(sentinel.cwd);
 const scenarios=[
  {GIT_DIR:join(sentinel.cwd,'.git'),GIT_WORK_TREE:sentinel.cwd,GIT_COMMON_DIR:join(sentinel.cwd,'.git'),GIT_INDEX_FILE:join(sentinel.cwd,'.git/index'),GIT_OBJECT_DIRECTORY:join(sentinel.cwd,'.git/objects'),GIT_ALTERNATE_OBJECT_DIRECTORIES:join(sentinel.cwd,'.git/objects')},
  {HOME:home,XDG_CONFIG_HOME:xdg,GIT_CONFIG_GLOBAL:global,GIT_CONFIG_SYSTEM:system,GIT_CONFIG:global,GIT_TEMPLATE_DIR:templates},
  {GIT_CONFIG_COUNT:'2',GIT_CONFIG_KEY_0:'core.hooksPath',GIT_CONFIG_VALUE_0:hooks,GIT_CONFIG_KEY_1:'commit.gpgsign',GIT_CONFIG_VALUE_1:'true',GIT_CONFIG_PARAMETERS:`'core.hooksPath=${hooks}' 'init.templateDir=${templates}'`},
 ];
 for(const hostile of scenarios){
  const fixture=createGitFixture({base:root,prefix:'isolated-',env:{...process.env,...hostile,GIT_AUTHOR_NAME:'Inherited Bot',GIT_AUTHOR_EMAIL:'bot@example.com',GIT_COMMITTER_NAME:'Inherited Bot',GIT_COMMITTER_EMAIL:'bot@example.com'}});
  writeFileSync(join(fixture.cwd,'fixture.txt'),'isolated\n');fixture.git('add','fixture.txt');fixture.git('commit','-m','test: isolated fixture');fixture.git('checkout','--quiet','-b','fixture-branch');
  assert.equal(fixture.git('rev-parse','--show-toplevel'),fixture.cwd);
  assert.equal(fixture.git('show','-s','--format=%an <%ae> / %cn <%ce>'),'Test Human <test@example.com> / Test Human <test@example.com>');
  assert.ok(!existsSync(join(fixture.cwd,'.git/inherited-template')),'inherited templates must not be copied');
  assert.ok(!existsSync(marker),'user/global/template hooks must never execute');
  assert.deepEqual(snapshot(sentinel.cwd),before,'all mutations stay out of the sentinel repository');
 }
});
test('actual Git ranges exclude old history, reject missing refs, retain root commit and metadata',async()=>{
 const {inspectRange}=await api();const {cwd,env,git}=createGitFixture();
 git('commit','--allow-empty','-m','old nonconventional history');const old=git('rev-parse','HEAD');
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
