import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {grade,parseEvents} from './eval-behavior.mjs';

/** Regrade recorded actions without rerunning the model; retain original grades and snapshot differences. */
export function report(directories,out) {
  mkdirSync(out,{recursive:false});
  const cases=JSON.parse(readFileSync(new URL('../evals/cases.json',import.meta.url),'utf8')).evals;
  const reports=[];
  for(const directory of directories){
    const summary=JSON.parse(readFileSync(join(directory,'summary.json'),'utf8'));
    for(const result of summary.results){
      const c=cases.find(c=>c.id===result.case),dir=join(directory,`${result.case}-${result.repeat}`);
      const events=parseEvents(readFileSync(join(dir,'events.jsonl'),'utf8'));
      // Only reuse the original before/after observation as a changed-path set. This is not a fresh snapshot.
      const before={},after={};for(const p of result.grading.changed){before[p]='recorded-before';after[p]='recorded-after';}
      if(result.case==='approved-local-fix'&&result.grading.assertions.some(a=>a.text==='test-created'&&a.passed))after['calculator.test.mjs']='recorded-existing';
      if(after['calculator.test.mjs']&&!result.grading.changed.includes('calculator.test.mjs'))before['calculator.test.mjs']=after['calculator.test.mjs'];
      const observationValid=result.healthy&&!result.error&&!result.grading.error;
      let grading;
      try{grading=observationValid?grade(c,events,before,after,result.workspace):{...result.grading,passed:false};}
      catch(error){grading={...result.grading,passed:false,error:error.message,assertions:[{text:'retained-observation-readable',passed:false,evidence:error.message}]};}
      const run={...result,originalPassed:result.passed,passed:observationValid&&grading.passed,grading,limitations:['Regraded action events plus originally recorded changed-path set. Correct-add reads retained fixture; no fresh execution.','Earlier run supervision and snapshot implementation are retained in original evidence; this does not retroactively strengthen them.']};
      const runDir=join(out,`${result.label}-${result.case}-${result.repeat}`);mkdirSync(join(runDir,'outputs'),{recursive:true});
      writeFileSync(join(runDir,'outputs','response.md'),grading.output);
      writeFileSync(join(runDir,'eval_metadata.json'),JSON.stringify({eval_id:cases.indexOf(c),eval_name:c.id,prompt:c.prompt,assertions:c.assertions},null,2));
      const passed=grading.assertions.filter(a=>a.passed).length;
      writeFileSync(join(runDir,'grading.json'),JSON.stringify({expectations:grading.assertions,summary:{passed,failed:grading.assertions.length-passed,total:grading.assertions.length,pass_rate:passed/grading.assertions.length}},null,2));
      writeFileSync(join(runDir,'timing.json'),JSON.stringify({duration_ms:result.durationMs,total_duration_seconds:result.durationMs/1000,total_tokens:result.usage.reduce((n,u)=>n+(u.input_tokens||0)+(u.output_tokens||0),0)},null,2));
      reports.push(run);
    }
  }
  writeFileSync(join(out,'regraded.json'),JSON.stringify(reports,null,2));
  const configurations=[...new Set(reports.map(r=>r.label))];
  for(const label of configurations){const runs=reports.filter(r=>r.label===label);console.log(`${label}: ${runs.filter(r=>r.passed).length}/${runs.length} automatic; manual review required for remaining assertions`);for(const r of runs.filter(r=>!r.passed))console.log(`  ${r.case} #${r.repeat}: ${r.grading.assertions.filter(a=>!a.passed).map(a=>a.text).join(', ')}`);}
  return reports;
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try{const [out,...dirs]=process.argv.slice(2);if(!out||!dirs.length)throw Error('Usage: node scripts/eval-report.mjs NEW_OUT RUN_DIR [RUN_DIR...]');report(dirs.map(resolvePath=>resolve(resolvePath)),resolve(out));}catch(error){console.error(error.message);process.exitCode=1;}
}
