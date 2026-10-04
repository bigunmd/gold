import {createHash} from 'node:crypto';
import {lstatSync, readFileSync, readlinkSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import {resolve, join, dirname, relative, sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const sha = data => createHash('sha256').update(data).digest('hex');
/** Working contents, not approval or a replacement for tests. Ignores ignored inputs. */
export function fingerprint(root = process.cwd()) {
  root = resolve(root);
  const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^GIT_/i.test(key)));
  env.GIT_CONFIG_NOSYSTEM='1'; env.GIT_CONFIG_GLOBAL=process.platform==='win32'?'NUL':'/dev/null';
  const git = args => execFileSync('git', ['-C',root,...args], {env, encoding:'utf8', stdio:['ignore','pipe','pipe'], maxBuffer:16*1024*1024});
  if (resolve(git(['rev-parse','--show-toplevel']).trim()) !== root) throw Error('Supply the repository/worktree root');
  const paths = [...new Set(git(['ls-files','--cached','--others','--exclude-standard','-z']).split('\0').filter(Boolean))].sort();
  const files=paths.map(path=>{
    const absolute=join(root,path); let ancestor=dirname(absolute);
    while(ancestor!==root){
      const rel=relative(root,ancestor);if(rel==='..'||rel.startsWith(`..${sep}`))throw Error(`Escaping input: ${path}`);
      try{if(lstatSync(ancestor).isSymbolicLink())throw Error(`Symlink ancestor in input: ${path}`);}catch(error){if(error.code!=='ENOENT')throw error;}
      ancestor=dirname(ancestor);
    }
    let stat;
    try {stat=lstatSync(absolute);} catch(error) {if(error.code==='ENOENT') return {path,kind:'missing'}; throw error;}
    if(stat.isSymbolicLink()) return {path,kind:'symlink',sha256:sha(readlinkSync(absolute))};
    if(!stat.isFile()) throw Error(`Unsupported input (submodule/directory): ${path}; fingerprint separately`);
    return {path,kind:'file',executable:!!(stat.mode&0o111),sha256:sha(readFileSync(absolute))};
  });
  return {schemaVersion:1,algorithm:'sha256',digest:sha(JSON.stringify(files)),files,limitations:['Ignored files and external symlink targets are excluded. Record relevant external/generated inputs separately.','Snapshot is not atomic; stop concurrent writers and compare before/after verification.','Digest identifies working contents, not approval, Git index state or model compliance.']};
}
if(process.argv[1] && resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  try {
    const args=process.argv.slice(2);
    if(args.length && (args.length!==2 || args[0]!=='--root')) throw Error('Usage: node scripts/fingerprint.mjs [--root PATH]');
    console.log(JSON.stringify(fingerprint(args[1]),null,2));
  } catch(error) {console.error(error.message);process.exitCode=1;}
}
