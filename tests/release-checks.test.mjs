import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync,mkdirSync,mkdtempSync,writeFileSync} from 'node:fs';
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
test('package policy requires runtime/license and rejects private or development files',async()=>{
 const {checkPackage}=await api();const files=['package.json','README.md','LICENSE','cordis.patch.yml','skills/gold-standard-development/SKILL.md'];
 assert.deepEqual(checkPackage(files),[]);assert.ok(checkPackage(files.filter(x=>x!=='LICENSE')).length);
 const resource='skills/gold-standard-development/references/collaboration.md';
 assert.deepEqual(checkPackage([...files,resource],[resource]),[]);
 assert.ok(checkPackage(files,[resource]).some(error=>error.includes(resource)),'missing packaged referenced resource must fail');
 for(const path of ['.gold/secret.txt','skills/gold-standard-development/.gold/secret.txt','skills/gold-standard-development/.env','scripts/tool.mjs','tests/a.mjs','.github/workflows/ci.yml'])assert.ok(checkPackage([...files,path]).length,path);
});
