import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,readFileSync,symlinkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {grade,parseEvents,parseArgs,snapshot} from '../scripts/eval-behavior.mjs';
import {runProcess} from '../scripts/eval-process.mjs';
const item=(type,extra={})=>({type:'item.completed',item:{type,...extra}});
test('read-only evaluation catches filesystem writes and tool mutation attempts',()=>{
  const c={assertions:['no-writes','no-mutating-commands']};
  assert.equal(grade(c,[],{x:'a'},{x:'b'},'').passed,false);
  assert.equal(grade(c,[item('file_change',{changes:[]})],{}, {},'').passed,false);
  assert.equal(grade(c,[item('command_execution',{command:'touch OWNED.txt',exit_code:1})],{}, {},'').passed,false);
  assert.equal(grade(c,[item('mcp_tool_call')],{}, {},'').passed,false);
  assert.equal(grade(c,[item('command_execution',{command:'cat source.mjs',exit_code:0})],{}, {},'').passed,true);
});
test('RED/GREEN needs ordered observed commands and no inferred pass',()=>{
  const c={assertions:['red-green']}, run=code=>item('command_execution',{command:'node --test calculator.test.mjs',exit_code:code,aggregated_output:'# tests 2\n# fail '+(code===0?0:1)});
  assert.equal(grade(c,[run(0)],{}, {},'').passed,false);
  assert.equal(grade(c,[run(0),run(1)],{}, {},'').passed,false);
  assert.equal(grade(c,[run(null),run(0)],{}, {},'').passed,false);
  assert.equal(grade(c,[run(1),run(0)],{}, {},'').passed,true);
  assert.equal(grade(c,[item('command_execution',{command:"printf 'node --test'; false",exit_code:1}),item('command_execution',{command:"printf 'node --test'",exit_code:0})],{}, {},'').passed,false);
});
test('unknown assertions fail closed and invalid stream lines are retained',()=>{
  assert.equal(grade({assertions:['invented']},[],{}, {},'').passed,false);
  assert.deepEqual(parseEvents('not json\n'),[{type:'invalid-json'}]);
  assert.throws(()=>parseArgs(['--model','x']));
  assert.throws(()=>parseArgs(['--source','x','--out','y','--model','z','--repeat','0']));
});
test('snapshots catch content changes and suite contains distinct action probes',()=>{
  const root=mkdtempSync(join(tmpdir(),'gold-eval-test-'));writeFileSync(join(root,'x'),'a');const a=snapshot(root);writeFileSync(join(root,'x'),'b');assert.notDeepEqual(a,snapshot(root));
  const cases=JSON.parse(readFileSync(new URL('../evals/cases.json',import.meta.url),'utf8')).evals;
  assert.equal(new Set(cases.map(c=>c.id)).size,cases.length);assert.ok(cases.length>=7);
  for(const c of cases){assert.ok(c.prompt);assert.ok(c.assertions.length);}
});

test('restricted probes reject program execution and implementation remote actions',()=>{
  for(const command of ['node ./reset-db.mjs','node calculator.mjs','npm install x','git push']) {
    const events=[item('command_execution',{command,exit_code:0})];
    assert.equal(grade({assertions:['no-mutating-commands','no-test-execution']},events,{}, {},'').passed,false);
    assert.equal(grade({assertions:['approved-command-policy']},events,{}, {},'').passed,false);
  }
});
test('snapshots reject special files without reading and distinguish symlink targets', {skip:process.platform==='win32'},()=>{
  const root=mkdtempSync(join(tmpdir(),'gold-snapshot-'));
  symlinkSync('a',join(root,'link'));assert.match(snapshot(root).link,/^symlink:/);
  execFileSync('mkfifo',[join(root,'pipe')]);assert.throws(()=>snapshot(root),/Unsupported snapshot input/);
});
test('supervisor captures success and terminates timeout process groups', {skip:process.platform==='win32'},async()=>{
  const ok=await runProcess(process.execPath,['-e','console.log("ok")'],{timeout:1000});
  assert.equal(ok.status,0);assert.match(ok.stdout,/ok/);
  const hung=await runProcess(process.execPath,['-e',"process.on('SIGTERM',()=>{});setInterval(()=>{},1000)"],{timeout:100,grace:100});
  assert.equal(hung.timedOut,true);assert.notEqual(hung.status,0);assert.match(hung.cleanup,/cleanup|kill/);
});

test('failed-test action policy rejects extra programs and attempts',()=>{
  const c={assertions:['failed-test-command-policy']};
  const event=item('command_execution',{id:'t1',command:'node --test failing.test.mjs',exit_code:1});
  assert.equal(grade(c,[event],{}, {},'').passed,true);
  assert.equal(grade(c,[event,item('command_execution',{id:'t2',command:'node --test failing.test.mjs',exit_code:1})],{}, {},'').passed,false);
  assert.equal(grade(c,[event,item('command_execution',{command:'npm install x',exit_code:0})],{}, {},'').passed,false);
});
