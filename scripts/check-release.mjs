import {readFileSync,existsSync,statSync,readdirSync} from 'node:fs';
import {resolve,dirname,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const outside = path => path === '..' || path.startsWith(`..${sep}`);
const stripCode = text => text.replace(/^\s*(```|~~~)[\s\S]*?^\s*\1[^\n]*$/gm,'');
function anchors(text){
 const counts=new Map();return new Set([...stripCode(text).matchAll(/^#{1,6}\s+(.+?)\s*#*$/gm)].map(([,heading])=>{
  const base=heading.toLowerCase().replace(/<[^>]*>/g,'').replace(/[^\p{L}\p{N}_\-\s]/gu,'').replace(/\s/g,'-');
  const n=counts.get(base)||0;counts.set(base,n+1);return n?`${base}-${n}`:base;
 }));
}
/** Local Markdown links only; packageFiles optionally limits targets to npm's inventory. No network requests. */
export function checkMarkdown(root,files,{packageFiles}={}){
 const errors=[];
 const packaged=packageFiles?new Set(packageFiles):null;
 // npm omits directory records, but packed files make their parent directories available.
 if(packaged)for(const file of packageFiles){let parent=dirname(file);while(parent!=='.'){packaged.add(parent);parent=dirname(parent);}packaged.add('');}
 for(const file of files){
  const text=stripCode(readFileSync(resolve(root,file),'utf8'));
  const links=[...text.matchAll(/!?\[[^\]\n]*\]\(<?([^\s)>]+)>?(?:\s+"[^"]*")?\)/g)].map(m=>m[1]);
  const refs=new Map([...text.matchAll(/^\s*\[([^\]]+)\]:\s*<?([^\s>]+)>?/gm)].map(m=>[m[1].toLowerCase(),m[2]]));
  for(const m of text.matchAll(/\[([^\]\n]+)\]\[([^\]\n]*)\]/g)){const key=(m[2]||m[1]).toLowerCase();if(refs.has(key))links.push(refs.get(key));else errors.push(`${file}: undefined reference ${key}`);}
  for(const link of links){
   if(/^[a-z][a-z0-9+.-]*:|^\/\//i.test(link))continue;
   try{
    const [path,fragment]=link.split('#');const target=path?resolve(dirname(resolve(root,file)),decodeURIComponent(path)):resolve(root,file);
    const local=relative(resolve(root),target);
     if(outside(local))throw Error('outside repository');
     if(packaged&&!packaged.has(local.split(sep).join('/')))throw Error('target not packaged');
    if(!existsSync(target))throw Error('missing target');
    if(fragment&&target.endsWith('.md')&&statSync(target).isFile()&&!anchors(readFileSync(target,'utf8')).has(decodeURIComponent(fragment)))throw Error('missing heading anchor');
   }catch(error){errors.push(`${file}: ${link}: ${error.message}`);}
  }
 }
 return errors;
}
const privatePath = path => path.split('/').some((part, index)=>part.startsWith('.')||['node_modules','tests','preset-src'].includes(part)||(part==='scripts' && !(path.startsWith('skills/') && index===2)));
export function checkPackage(files,expectedResources=[]){
 const required=['package.json','README.md','LICENSE','THIRD_PARTY_NOTICES.md','cordis.patch.yml','skills/gold-standard-development/SKILL.md',...expectedResources];
 return [...new Set(required)].filter(p=>!files.includes(p)).map(p=>`Missing packaged ${p}`).concat(files.filter(p=>privatePath(p)||(!required.includes(p)&&!p.startsWith('skills/'))).map(p=>`Unexpected packaged ${p}`));
}
function resourceInventory(root,dir='skills'){
 return readdirSync(resolve(root,dir),{withFileTypes:true}).flatMap(entry=>{
  const path=`${dir}/${entry.name}`;
  if(privatePath(path))return [];
  return entry.isDirectory()?resourceInventory(root,path):[path];
 });
}
function run(command,args,cwd){const result=spawnSync(command,args,{cwd,encoding:'utf8',shell:process.platform==='win32'});if(result.error)throw result.error;if(result.status!==0)throw Error(result.stderr||result.stdout||`${command} failed`);return result.stdout;}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{
  const root=fileURLToPath(new URL('../',import.meta.url));const mode=process.argv[2];let errors;
  if(mode==='docs'){
   const files=run('git',['ls-files','--cached','--others','--exclude-standard','-z'],root).split('\0').filter(Boolean);
   errors=checkMarkdown(root,[...new Set(files)].filter(p=>p.endsWith('.md')));
  }else if(mode==='package'){
   const data=JSON.parse(run('npm',['pack','--dry-run','--json','--ignore-scripts'],root));const pack=Array.isArray(data)?data[0]:Object.values(data)[0];
   const files=pack.files.map(f=>f.path);
   errors=[...checkPackage(files,resourceInventory(root)),...checkMarkdown(root,files.filter(p=>/\.md$/i.test(p)),{packageFiles:files})];
  }else throw Error('Usage: node scripts/check-release.mjs docs|package');
  if(errors.length)throw Error(errors.join('\n'));console.log(`${mode} checks passed.`);
 }catch(error){console.error(error.message);process.exitCode=1;}
}
