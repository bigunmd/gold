import {readFileSync, readdirSync, lstatSync, mkdirSync, writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve, join, dirname, parse, sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {roles} from '../preset-src/roles.mjs';

const source = fileURLToPath(new URL('../', import.meta.url));
const hosts = {
  codex: {instructions:'AGENTS.md', skills:'.agents/skills'},
  claude: {instructions:'CLAUDE.md', skills:'.claude/skills'},
  opencode: {instructions:'AGENTS.md', skills:'.opencode/skills'},
};
const statePath = '.gold-host/manifest.json';
const begin = '<!-- GOLD managed instructions: begin -->';
const end = '<!-- GOLD managed instructions: end -->';
const sha = data => createHash('sha256').update(data).digest('hex');
const read = path => readFileSync(path, 'utf8');
const stat = path => {try {return lstatSync(path);} catch(error) {if(error.code==='ENOENT') return null; throw error;}};

// Refuse symlinks in every existing ancestor, including the explicitly supplied target.
// This is a preflight guard, not protection against a concurrent hostile filesystem writer.
function safePath(path) {
  const absolute = resolve(path);
  let current = parse(absolute).root;
  for (const part of absolute.slice(current.length).split(sep).filter(Boolean)) {
    current = join(current,part);
    const info = stat(current);
    if (info?.isSymbolicLink()) throw Error(`Symlink refused: ${current}`);
    if (info && current!==absolute && !info.isDirectory()) throw Error(`Not a directory: ${current}`);
  }
  return absolute;
}
function filesIn(dir) {
  return readdirSync(dir,{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name)).flatMap(entry=>{
    if(entry.name.startsWith('.') || entry.name==='__pycache__' || entry.name.endsWith('.pyc')) return [];
    const path = join(dir,entry.name);
    if(entry.isSymbolicLink() || (!entry.isDirectory() && !entry.isFile())) throw Error(`Unsupported source: ${path}`);
    return entry.isDirectory()?filesIn(path).map(p=>`${entry.name}/${p}`):[entry.name];
  });
}
function managedBlock(text) {
  const start=text.indexOf(begin), finish=text.indexOf(end);
  if(start<0 && finish<0) return null;
  if(start<0 || finish<start || text.indexOf(begin,start+begin.length)>=0 || text.indexOf(end,finish+end.length)>=0) throw Error('Malformed GOLD instruction markers');
  return {start, finish:finish+end.length, text:text.slice(start,finish+end.length)};
}

export function buildHost(host) {
  if(!Object.hasOwn(hosts,host)) throw Error(`Unknown host: ${host}`);
  const config=hosts[host];
  const version=JSON.parse(read(join(source,'package.json'))).version;
  const files={}; const omittedSkills=[]; const skillNames=[];
  for(const entry of readdirSync(join(source,'skills'),{withFileTypes:true}).sort((a,b)=>a.name.localeCompare(b.name))) {
    if(!entry.isDirectory() || entry.name.startsWith('.')) continue;
    const skillRoot=join(source,'skills',entry.name);
    const skill=read(join(skillRoot,'SKILL.md'));
    const userOnly=/^disable-model-invocation: true$/m.test(skill.split('\n---')[0]);
    skillNames.push(entry.name);
    if(host==='opencode' && userOnly) {omittedSkills.push(entry.name); continue;}
    for(const path of filesIn(skillRoot)) files[`${config.skills}/${entry.name}/${path}`]=readFileSync(join(skillRoot,path));
    if(host==='codex' && userOnly) files[`${config.skills}/${entry.name}/agents/openai.yaml`]=Buffer.from('policy:\n  allow_implicit_invocation: false\n');
  }
  files['.gold-host/LICENSE']=readFileSync(join(source,'LICENSE'));
  // Only relocate local link destinations; preserve notice and license wording.
  files['.gold-host/THIRD_PARTY_NOTICES.md']=Buffer.from(read(join(source,'THIRD_PARTY_NOTICES.md')).replaceAll('](skills/',`](../${config.skills}/`));
  // Keep upstream provenance even when its user-only setup entry point is omitted.
  files['.gold-host/matt-skills-upstream-manifest.json']=readFileSync(join(source,'skills/setup-matt-pocock-skills/upstream-manifest.json'));
  const adapter=[
    `Runtime adapter: ${host}. Project skill root: ${config.skills}. Start in this project so its root instructions are loaded.`,
    'Load skills through native discovery/loading when available; otherwise read the named SKILL.md from the project skill root. Resolve references, templates and scripts relative to that installed skill directory, never the current working directory. Do not execute bundled scripts merely to load a skill.',
    'Use available native file read/search/edit, user-question and artifact presentation facilities. When a dedicated tool is unavailable, use a scoped read-only local equivalent or inline report and disclose the limitation. Never invent tools, install replacements, or change permissions automatically.',
    'Fresh independent delegation requires a new non-inheriting context with a self-contained brief, scoped ownership and parent verification. If unavailable, disclose it and perform bounded separate passes; do not claim these are independent agents. Runtime plan mode and tool restrictions remain authoritative.',
    'Skills marked disable-model-invocation: true are user-only: recommend, never auto-load or invoke them indirectly from another skill. Explicit user invocation is not blanket approval for implementation, publication or other effects.',
    host==='codex'?'Codex user-only skills also set policy.allow_implicit_invocation: false in agents/openai.yaml. Verify that this Codex version honors that policy before using them.':host==='claude'?'Claude Code user-only skills retain native disable-model-invocation: true. Verify native skill discovery in a fresh session.':`OpenCode user-only skills are not installed because equivalent cross-version invocation enforcement is not established: ${omittedSkills.join(', ')}. Do not attempt to load these missing skills; disclose this limitation when recommending them.`,
    'These instructions do not prove model compliance. Verify active instruction discovery, local/global conflicts, skill loading and approval behavior in a fresh session before relying on GOLD. Updates require explicit local installation; no global hooks, server, authentication or runtime configuration changes are supplied.',
  ].join('\n');
  const block=`${begin}\n# GOLD Auto\n\n${read(join(source,'preset-src/core-persona.txt')).trim()}\n${roles.find(r=>r.id==='gold-auto').focus}\n\n${adapter}\n${end}`;
  // Identity covers emitted resources and startup policy, independently of package version.
  const sourceDigest=sha(JSON.stringify({host,version,block,files:Object.entries(files).map(([path,data])=>[path,sha(data)])}));
  return {config,files,block,version,sourceDigest,omittedSkills,skillNames};
}

/** Preview by default. Only --apply mutates the explicitly named existing project. */
export function installHost({host,target,apply=false}) {
  const bundle=buildHost(host);
  if(typeof target!=='string' || !target.trim()) throw Error('An explicit project target is required');
  target=safePath(target);
  if(!stat(target)?.isDirectory() || target===parse(target).root) throw Error('Target must be an existing project directory, not a filesystem root');
  const pathFor=path=>safePath(join(target,path));
  const existing=path=>{
    const absolute=pathFor(path), info=stat(absolute);
    if(!info) return null;
    if(!info.isFile()) throw Error(`Expected regular file: ${path}`);
    return readFileSync(absolute);
  };
  const previousBytes=existing(statePath);
  let previous=null;
  if(previousBytes) {
    try {previous=JSON.parse(previousBytes.toString());} catch {throw Error('Malformed installation manifest');}
    if(previous.schemaVersion!==1 || previous.host!==host || !previous.files || typeof previous.files!=='object' || Array.isArray(previous.files) || !/^[a-f0-9]{64}$/.test(previous.blockHash)) throw Error('Invalid installation manifest or different host; use a separate project');
    for(const [path,hash] of Object.entries(previous.files)) {
      if(!Object.hasOwn(bundle.files,path) || !/^[a-f0-9]{64}$/.test(hash)) throw Error(`Unsupported manifest path or retired resource: ${path}; manual migration required`);
      const data=existing(path);
      if(!data || sha(data)!==hash) throw Error(`Modified or missing managed file: ${path}`);
    }
  } else if(stat(pathFor('.gold-host'))) throw Error('Installation state collision: .gold-host already exists');

  // Other compatibility roots may override a native skill even when output paths differ.
  for(const root of ['.agents/skills','.claude/skills','.opencode/skills']) {
    for(const name of bundle.skillNames) {
      const path=`${root}/${name}`;
      if(stat(pathFor(path)) && (root!==bundle.config.skills || !previous || !Object.hasOwn(previous.files,`${path}/SKILL.md`))) throw Error(`Skill collision: ${path}`);
      if(stat(pathFor(`${root}/${name}.md`))) throw Error(`Skill collision: ${root}/${name}.md`);
    }
  }
  const instructionBytes=existing(bundle.config.instructions);
  const text=instructionBytes?.toString('utf8') ?? '';
  const managed=managedBlock(text);
  if(previous && (!managed || sha(managed.text)!==previous.blockHash)) throw Error('Modified or missing GOLD instruction block');
  if(!previous && managed) throw Error('Unowned GOLD instruction block collision');
  const instructions=managed ? text.slice(0,managed.start)+bundle.block+text.slice(managed.finish) : text+(text && !text.endsWith('\n')?'\n':'')+(text?'\n':'')+bundle.block+'\n';
  const files={...bundle.files};
  for(const path of Object.keys(files)) {
    const data=existing(path);
    if(data && (!previous || !Object.hasOwn(previous.files,path))) throw Error(`File collision: ${path}`);
  }
  const manifest={schemaVersion:1,host,version:bundle.version,sourceDigest:bundle.sourceDigest,blockHash:sha(bundle.block),omittedSkills:bundle.omittedSkills,files:Object.fromEntries(Object.entries(files).map(([path,data])=>[path,sha(data)]))};
  files[bundle.config.instructions]=Buffer.from(instructions);
  files[statePath]=Buffer.from(JSON.stringify(manifest,null,2)+'\n');
  const changes=Object.entries(files).filter(([path,data])=>!existing(path)?.equals(data)).map(([path])=>path);
  if(apply) {
    // Complete preflight happens above. Manifest is last; interrupted writes fail closed on retry.
    // No deletions or rollback: preserve partial state for explicit human recovery.
    for(const path of changes) {
      const absolute=pathFor(path); const before=existing(path);
      mkdirSync(dirname(absolute),{recursive:true});
      writeFileSync(absolute,files[path],{flag:before?'w':'wx'});
    }
  }
  return {host,target,applied:apply,version:bundle.version,sourceDigest:bundle.sourceDigest,omittedSkills:bundle.omittedSkills,changes};
}

if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const args=process.argv.slice(2); const options={};
    for(let i=0;i<args.length;i++) {
      const arg=args[i];
      if(arg==='--apply' && !options.apply) options.apply=true;
      else if(['--host','--target'].includes(arg) && !Object.hasOwn(options,arg.slice(2)) && args[i+1] && !args[i+1].startsWith('--')) options[arg.slice(2)]=args[++i];
      else throw Error('Usage: node scripts/install-host.mjs --host codex|claude|opencode --target PATH [--apply]');
    }
    console.log(JSON.stringify(installHost(options),null,2));
  } catch(error) {console.error(error.message); process.exitCode=1;}
}
