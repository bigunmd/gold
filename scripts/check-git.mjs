import {readFileSync} from 'node:fs';import {spawnSync} from 'node:child_process';import {resolve} from 'node:path';import {fileURLToPath} from 'node:url';
import {checkSubject,checkAttribution,checkBranch} from './git-policy.mjs';
const sha=value=>{if(typeof value!=='string'||! /^[a-f0-9]{40,64}$/i.test(value)||/^0+$/.test(value))throw Error('Invalid or missing commit SHA');return value;};
function git(cwd,args){const r=spawnSync('git',args,{cwd,encoding:'utf8',maxBuffer:16*1024*1024});if(r.error)throw r.error;if(r.status!==0)throw Error(r.stderr||'Git command failed');return r.stdout;}
export function selectRange(name,event){
 if(name==='pull_request'){
  const pr=event.pull_request;if(!pr||typeof pr.title!=='string')throw Error('Missing PR metadata');
  return {base:sha(pr.base?.sha),head:sha(pr.head?.sha),branch:pr.head.ref??null,prTitle:pr.title,prBody:pr.body??''};
 }
 if(name==='push')return {base:/^0{40,64}$/.test(event.before??'')?null:sha(event.before),head:sha(event.after),branch:event.ref?.replace(/^refs\/heads\//,'')??null,prTitle:null,prBody:null};
 throw Error('Unsupported event; manual use requires explicit --base SHA --head SHA');
}
export function inspectRange({cwd,base,head}){
 sha(head);if(base!==null)sha(base);
 for(const ref of [base,head].filter(Boolean)){try{git(cwd,['rev-parse','--verify',`${ref}^{commit}`]);}catch(error){throw Error(`Cannot resolve commit ${ref}; fetch sufficient history. ${error.message}`);}}
 const ids=git(cwd,['rev-list','--reverse',...(base?[`${base}..${head}`]:[head])]).trim().split('\n').filter(Boolean);
 if(!ids.length)throw Error('Empty candidate range; no commits checked');
 return ids.map(id=>{
  const fields=git(cwd,['show','-s','--format=%H%x00%an <%ae>%x00%cn <%ce>%x00%P%x00%B',id]).split('\0');
  if(fields.length!==5)throw Error('Invalid commit record framing');
  const [commit,author,committer,parents,message]=fields;return {sha:commit,author,committer,parents:parents?parents.split(' '):[],message};
 });
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const args=process.argv.slice(2);const options={};
  for(let i=0;i<args.length;i+=2){if(!['--base','--head','--event','--event-name'].includes(args[i])||!args[i+1]||options[args[i]])throw Error('Usage: --base SHA --head SHA OR --event PATH --event-name NAME');options[args[i]]=args[i+1];}
  const cwd=process.cwd();let selection;
  if(options['--event']){
   if(options['--base']||options['--head'])throw Error('Do not mix event and explicit ranges');
   const name=options['--event-name'];
   if(name==='workflow_dispatch'){
    const head=git(cwd,['rev-parse','HEAD']).trim();const parents=git(cwd,['show','-s','--format=%P',head]).trim().split(' ').filter(Boolean);
    selection={base:parents[0]??null,head,prTitle:null,branch:null};console.log('Manual dispatch: checking latest commit (root: all reachable history).');
   }else selection=selectRange(name,JSON.parse(readFileSync(options['--event'],'utf8')));
   if(name==='pull_request')selection.base=git(cwd,['merge-base',selection.base,selection.head]).trim();
  }else selection={base:sha(options['--base']),head:sha(options['--head']),prTitle:null,branch:null};
  const commits=inspectRange({cwd,...selection});const errors=[];
  for(const commit of commits){const subject=commit.message.split('\n')[0];const revert=/^Revert ".+"$/.test(subject)&&/^This reverts commit [a-f0-9]{40,64}(?:\.|, reversing\nchanges made to [a-f0-9]{40,64}\.)\s*$/m.test(commit.message);
   for(const error of [...checkSubject(subject,{merge:commit.parents.length>1,revert}),...checkAttribution(commit)])errors.push(`${commit.sha.slice(0,8)}: ${error}`);
  }
  if(selection.prTitle!==null){errors.push(...checkSubject(selection.prTitle).map(e=>`PR title: ${e}`),...checkAttribution({message:selection.prTitle+'\n'+(selection.prBody??''),prBody:true}));}
  if(selection.branch)for(const warning of checkBranch(selection.branch))console.warn(`Branch advisory: ${warning}`);
  if(errors.length)throw Error(errors.join('\n'));console.log(`Git metadata passed for ${commits.length} candidate commit(s). Identity consent and authorization are not mechanically proven.`);
 }catch(error){console.error(error.message);process.exitCode=1;}
}
