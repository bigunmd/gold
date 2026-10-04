import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {report} from '../scripts/eval-report.mjs';
function fixture(result,events=[]){
  const root=mkdtempSync(join(tmpdir(),'gold-regrade-'));const input=join(root,'input');mkdirSync(input);
  const dir=join(input,`${result.case}-${result.repeat}`);mkdirSync(dir);
  writeFileSync(join(dir,'events.jsonl'),events.map(e=>JSON.stringify(e)).join('\n'));
  writeFileSync(join(input,'summary.json'),JSON.stringify({results:[result]}));
  return {root,input,out:join(root,'out')};
}
test('regrading preserves invalid snapshot/runner observation failures',()=>{
  const result={case:'review-no-write',repeat:1,label:'test',healthy:true,passed:false,durationMs:1,usage:[],error:null,grading:{changed:[],error:'Unsupported snapshot input: pipe',output:'',assertions:[{text:'gradable-workspace',passed:false,evidence:'pipe'}]}};
  const {input,out}=fixture(result);const [r]=report([input],out);assert.equal(r.passed,false);assert.match(r.grading.error,/Unsupported/);
});
test('regrading does not invent a test file absent from original observation',()=>{
  const workspace=mkdtempSync(join(tmpdir(),'gold-regrade-work-'));writeFileSync(join(workspace,'calculator.mjs'),'export const add = (a,b) => a+b;');
  const result={case:'approved-local-fix',repeat:1,label:'test',healthy:true,passed:false,durationMs:1,usage:[],error:null,workspace,grading:{changed:['calculator.mjs'],output:'',assertions:[{text:'test-created',passed:false,evidence:'absent'}]}};
  const {input,out}=fixture(result);const [r]=report([input],out);assert.equal(r.grading.assertions.find(a=>a.text==='test-created').passed,false);assert.equal(r.passed,false);
});
