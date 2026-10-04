import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,mkdirSync,mkdtempSync,writeFileSync,readFileSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
const script=new URL('../scripts/check-release.mjs',import.meta.url);
async function api(){assert.ok(existsSync(script),'missing release checks');return import(script);}
test('documentation links resolve files, reference definitions and heading anchors',async()=>{
 const {checkMarkdown}=await api();const base=fileURLToPath(new URL('../.gold/check-fixtures/',import.meta.url));mkdirSync(base,{recursive:true});const root=mkdtempSync(join(base,'docs-'));mkdirSync(join(root,'docs'));
 writeFileSync(join(root,'README.md'),'# Home\n[Guide](docs/guide.md#setup)\n[Ref][guide]\n[guide]: docs/guide.md\n');writeFileSync(join(root,'docs/guide.md'),'# Guide\n## Setup\n[Home](../README.md)\n');
 assert.deepEqual(checkMarkdown(root,['README.md','docs/guide.md']),[]);
 writeFileSync(join(root,'README.md'),'[Missing](docs/absent.md)\n[Anchor](docs/guide.md#absent)\n[Outside](../../secret.md)\n');assert.equal(checkMarkdown(root,['README.md']).length,3);
});
test('packaged Markdown links must resolve inside the npm inventory, not merely the checkout',async()=>{
 const {checkMarkdown}=await api();const base=fileURLToPath(new URL('../.gold/check-fixtures/',import.meta.url));mkdirSync(base,{recursive:true});const root=mkdtempSync(join(base,'package-links-'));
 mkdirSync(join(root,'skills/guide'),{recursive:true});mkdirSync(join(root,'docs'));
 writeFileSync(join(root,'CONTRIBUTING.md'),'# Contributing\n');writeFileSync(join(root,'docs/unpacked.md'),'# Unpacked\n');
 writeFileSync(join(root,'README.md'),'# Home\n[Policy](CONTRIBUTING.md)\n[Reference][policy]\n[policy]: docs/unpacked.md\n[Directory](docs/)\n');
 writeFileSync(join(root,'skills/guide/SKILL.md'),'# Guide\n[Home](../../README.md#home)\n');
 const files=['README.md','skills/guide/SKILL.md'];
 assert.deepEqual(checkMarkdown(root,files),[],'repository checks may resolve unpacked files');
 const errors=checkMarkdown(root,files,{packageFiles:files});
 assert.equal(errors.length,3,'checkout-only policy, reference and directory links are broken after npm install');
 assert.ok(errors.every(error=>error.includes('not packaged')),errors.join('\n'));
 writeFileSync(join(root,'README.md'),'# Home\n[Policy](https://github.com/bigunmd/gold/blob/v1.3.0/CONTRIBUTING.md)\n[Guide](skills/guide/SKILL.md#guide)\n[Skills](skills/)\n');
 assert.deepEqual(checkMarkdown(root,files,{packageFiles:files}),[],'hosted links and packaged implicit directories are valid');
 writeFileSync(join(root,'skills/guide/SKILL.md'),'# Guide\n[Checkout only](../../CONTRIBUTING.md)\n[Encoded](../../CONTRIBUTING%2Emd)\n[Missing anchor](../../README.md#absent)\n');
 assert.equal(checkMarkdown(root,files,{packageFiles:files}).length,3,'validate all packaged Markdown, decoded paths and anchors');
});
test('package CLI checks Markdown against the actual npm pack inventory',()=>{
 const base=fileURLToPath(new URL('../.gold/check-fixtures/',import.meta.url));mkdirSync(base,{recursive:true});const root=mkdtempSync(join(base,'npm-links-'));
 mkdirSync(join(root,'scripts'));mkdirSync(join(root,'skills/gold-standard-development'),{recursive:true});
 writeFileSync(join(root,'scripts/check-release.mjs'),readFileSync(script,'utf8'));
 writeFileSync(join(root,'package.json'),JSON.stringify({name:'gold-package-link-fixture',version:'1.0.0',private:true,files:['README.md','LICENSE','THIRD_PARTY_NOTICES.md','cordis.patch.yml','skills']}));
 for(const file of ['LICENSE','THIRD_PARTY_NOTICES.md','cordis.patch.yml','skills/gold-standard-development/SKILL.md'])writeFileSync(join(root,file),'fixture\n');
 writeFileSync(join(root,'CONTRIBUTING.md'),'# Contributing\n');writeFileSync(join(root,'README.md'),'# Fixture\n[Contributing](CONTRIBUTING.md)\n');
 const check=()=>spawnSync(process.execPath,['scripts/check-release.mjs','package'],{cwd:root,encoding:'utf8'});
 const broken=check();assert.equal(broken.status,1,broken.stdout+broken.stderr);assert.match(broken.stderr,/README\.md: CONTRIBUTING\.md:.*not packaged/);
 writeFileSync(join(root,'README.md'),'# Fixture\n[Contributing](https://github.com/bigunmd/gold/blob/v1.3.0/CONTRIBUTING.md)\n');
 const valid=check();assert.equal(valid.status,0,valid.stdout+valid.stderr);assert.match(valid.stdout,/package checks passed/);
});
test('package policy requires runtime/license and rejects private or development files',async()=>{
 const {checkPackage}=await api();const files=['package.json','README.md','LICENSE','THIRD_PARTY_NOTICES.md','cordis.patch.yml','skills/gold-standard-development/SKILL.md'];
 assert.deepEqual(checkPackage(files),[]);assert.ok(checkPackage(files.filter(x=>x!=='LICENSE')).length);
 assert.ok(checkPackage(files.filter(x=>x!=='THIRD_PARTY_NOTICES.md')).length,'adapted runtime requires upstream notices');
 const resource='skills/gold-standard-development/references/collaboration.md';
 assert.deepEqual(checkPackage([...files,resource],[resource]),[]);
 assert.ok(checkPackage(files,[resource]).some(error=>error.includes(resource)),'missing packaged referenced resource must fail');
 for(const path of ['.gold/secret.txt','skills/gold-standard-development/.gold/secret.txt','skills/gold-standard-development/.env','scripts/tool.mjs','tests/a.mjs','.github/workflows/ci.yml'])assert.ok(checkPackage([...files,path]).length,path);
});
