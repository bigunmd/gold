import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync, writeFileSync, mkdirSync, symlinkSync, renameSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';
import {fingerprint} from '../scripts/fingerprint.mjs';
function fixture() {
  const root=mkdtempSync(join(tmpdir(),'gold-fingerprint-'));
  const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>!/^GIT_/i.test(k)));
  env.GIT_CONFIG_NOSYSTEM='1'; env.GIT_CONFIG_GLOBAL=process.platform==='win32'?'NUL':'/dev/null';
  execFileSync('git',['-c','init.templateDir=','init','--quiet',root],{env});
  writeFileSync(join(root,'.gitignore'),'/.gold/\n');
  writeFileSync(join(root,'code.txt'),'first\n');
  execFileSync('git',['-C',root,'add','.gitignore','code.txt'],{env});
  return root;
}
test('content identity catches repeated edits with identical dirty paths and untracked inputs',()=>{
  const root=fixture(); const a=fingerprint(root);
  assert.equal(fingerprint(root).digest,a.digest);
  writeFileSync(join(root,'code.txt'),'second\n'); const b=fingerprint(root);
  assert.notEqual(a.digest,b.digest);
  writeFileSync(join(root,'new.txt'),'untracked'); assert.notEqual(fingerprint(root).digest,b.digest);
  const c=fingerprint(root); mkdirSync(join(root,'.gold')); writeFileSync(join(root,'.gold','record'),'private');
  assert.equal(fingerprint(root).digest,c.digest);
  assert.equal(c.algorithm,'sha256'); assert.equal(c.files.some(f=>f.path==='new.txt'),true);
});
test('fingerprint ignores caller Git repository selection and refuses non-repository roots',()=>{
  const root=fixture(), other=fixture(); const expected=fingerprint(root).digest;
  const previous=process.env.GIT_DIR; process.env.GIT_DIR=join(other,'.git');
  try { assert.equal(fingerprint(root).digest,expected); } finally { if(previous===undefined)delete process.env.GIT_DIR;else process.env.GIT_DIR=previous; }
  assert.throws(()=>fingerprint(tmpdir()));
});
test('symlinks hash their target string without reading external target data', {skip:process.platform==='win32'},()=>{
  const root=fixture(); const outside=join(mkdtempSync(join(tmpdir(),'gold-external-')),'data'); writeFileSync(outside,'one');
  symlinkSync(outside,join(root,'link')); const a=fingerprint(root); writeFileSync(outside,'two');
  assert.equal(fingerprint(root).digest,a.digest); assert.equal(a.files.find(f=>f.path==='link').kind,'symlink');
});

test('tracked input cannot escape through a symlinked ancestor', {skip:process.platform==='win32'},()=>{
  const root=fixture();mkdirSync(join(root,'dir'));writeFileSync(join(root,'dir','file'),'inside');
  const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>!/^GIT_/i.test(k)));
  env.GIT_CONFIG_NOSYSTEM='1';env.GIT_CONFIG_GLOBAL='/dev/null';
  execFileSync('git',['-C',root,'add','dir/file'],{env});
  const source=join(root,'dir'),destination=join(root,'original-dir');
  assert.equal(source,join(root,'dir'));assert.equal(destination,join(root,'original-dir'));
  renameSync(source,destination);symlinkSync(destination,source);
  assert.throws(()=>fingerprint(root),/Symlink ancestor/);
});
