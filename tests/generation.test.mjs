import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, mkdirSync, mkdtempSync, cpSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
const root = fileURLToPath(new URL('../', import.meta.url));
const script = new URL('../scripts/build-presets.mjs', import.meta.url);
const fixture = { roles: [{id:'sample', name:'Sample: "role"', description:'Line one\nLine two', order:1, focus:'Focus sample'}], corePersona:'Shared policy', sharedTools:"          - id: tool-bash\n            name: '@deepseek-ai/dsh-tool-bash'\n" };
async function renderer() {
  assert.ok(existsSync(script), 'missing preset renderer');
  return (await import(script)).renderPatch;
}
test('renderer emits quoted metadata and shared persona/tool composition', async () => {
  const render = await renderer();
  const result = render(fixture);
  assert.match(result, /^# Generated[^\n]*\n- insert:\n/);
  assert.ok(result.includes('    - id: preset-sample\n'));
  assert.ok(result.includes('        name: "Sample: \\"role\\""\n'.replaceAll('\\\\','\\')));
  assert.ok(result.includes('        description: "Line one\\nLine two"\n'));
  assert.ok(result.includes('              prefix: "Shared policy\\nFocus sample"\n'));
  assert.ok(result.endsWith(fixture.sharedTools));
  assert.equal(render(fixture), result);
});
test('renderer rejects duplicate ids and malformed metadata instead of emitting invalid declarations', async () => {
  const render = await renderer();
  for (const roles of [[], [fixture.roles[0],fixture.roles[0]], [{...fixture.roles[0],id:'Bad ID'}], [{...fixture.roles[0],name:''}], [{...fixture.roles[0],focus:undefined}], [{...fixture.roles[0],order:NaN}]]) assert.throws(()=>render({...fixture,roles}));
  for (const patch of [{corePersona:''},{sharedTools:''},{sharedTools:'- id: unindented'}]) assert.throws(()=>render({...fixture,...patch}));
});
test('generated roster has compatible gold plus four specialists sharing one tool source', async () => {
  const render=await renderer();
  const {roles}=await import('../preset-src/roles.mjs');
  assert.deepEqual(roles.map(r=>r.id).sort(), ['gold','gold-architect','gold-auto','gold-devops','gold-reviewer']);
  const corePersona=readFileSync(join(root,'preset-src/core-persona.txt'),'utf8');
  const sharedTools=readFileSync(join(root,'preset-src/shared-tools.yml'),'utf8');
  const output=render({roles,corePersona,sharedTools});
  assert.equal(readFileSync(join(root,'cordis.patch.yml'),'utf8'),output);
  assert.equal(output.split(sharedTools.trimEnd()).length-1,5);
  for(const r of roles) assert.ok(output.includes(JSON.stringify(corePersona.trim()+'\n'+r.focus)));
});
test('CLI check is read-only, detects stale artifacts and builds independently of cwd', async () => {
  await renderer();
  const base=join(root,'.gold/test-fixtures'); mkdirSync(base,{recursive:true});
  const dir=mkdtempSync(join(base,'generation-'));
  cpSync(join(root,'scripts'),join(dir,'scripts'),{recursive:true});
  cpSync(join(root,'preset-src'),join(dir,'preset-src'),{recursive:true});
  const output=join(dir,'cordis.patch.yml');writeFileSync(output,'stale\n');
  const cli=join(dir,'scripts/build-presets.mjs');
  const run=(...args)=>spawnSync(process.execPath,[cli,...args],{cwd:root,encoding:'utf8'});
  assert.equal(run('--check').status,1);assert.equal(readFileSync(output,'utf8'),'stale\n');
  assert.equal(run().status,0); const built=readFileSync(output,'utf8');
  assert.equal(run('--check').status,0);assert.equal(run().status,0);assert.equal(readFileSync(output,'utf8'),built);
  assert.notEqual(run('--unknown').status,0);assert.equal(readFileSync(output,'utf8'),built);
});
