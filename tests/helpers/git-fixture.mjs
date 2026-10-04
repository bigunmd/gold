import {mkdirSync,mkdtempSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFileSync} from 'node:child_process';

/** Mutating Git commands must only operate in a newly allocated fixture repository. */
export function createGitFixture({base=fileURLToPath(new URL('../../.gold/git-fixtures/',import.meta.url)),prefix='range-',env:inherited=process.env}={}){
 mkdirSync(base,{recursive:true});
 const root=mkdtempSync(join(base,prefix));
 const cwd=join(root,'repo'),home=join(root,'home'),hooks=join(root,'hooks'),templates=join(root,'templates');
 for(const path of [cwd,home,hooks,templates])mkdirSync(path);
 const config=join(root,'empty.config');writeFileSync(config,'');
 // Git has many routing/config variables (including indexed GIT_CONFIG_KEY_n entries).
 // Remove the whole namespace rather than maintaining a fragile denylist.
 const env=Object.fromEntries(Object.entries(inherited).filter(([key])=>!/^GIT_/i.test(key)));
 Object.assign(env,{HOME:home,XDG_CONFIG_HOME:home,GIT_CONFIG_NOSYSTEM:'1',GIT_CONFIG_SYSTEM:config,GIT_CONFIG_GLOBAL:config,
  GIT_AUTHOR_NAME:'Test Human',GIT_AUTHOR_EMAIL:'test@example.com',GIT_COMMITTER_NAME:'Test Human',GIT_COMMITTER_EMAIL:'test@example.com',GIT_TERMINAL_PROMPT:'0'});
 const git=(...args)=>execFileSync('git',['-c',`core.hooksPath=${hooks}`,'-c','commit.gpgsign=false','-c','tag.gpgsign=false',...args],{cwd,env,encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
 git('init','--quiet','--initial-branch=main','--object-format=sha1',`--template=${templates}`);
 // Also protect child Git invocations given this fixture's cwd/environment.
 git('config','core.hooksPath',hooks);git('config','commit.gpgsign','false');git('config','tag.gpgsign','false');
 return {cwd,env,git};
}
