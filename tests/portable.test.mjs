import test from 'node:test';
import assert from 'node:assert/strict';
import {existsSync, readFileSync, writeFileSync, mkdirSync, mkdtempSync, symlinkSync, cpSync, readdirSync, unlinkSync} from 'node:fs';
import {join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import {checkMarkdown} from '../scripts/check-release.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const script = join(root, 'scripts/install-host.mjs');
const read = p => readFileSync(p, 'utf8');
function project() {
  const base = join(root, '.gold/portable-fixtures');
  mkdirSync(base, {recursive:true});
  return mkdtempSync(join(base, 'project-'));
}
async function api() {
  assert.ok(existsSync(script), 'portable host installer must exist');
  return import(script);
}
for (const [host, instructions, skills] of [['codex','AGENTS.md','.agents/skills'],['claude','CLAUDE.md','.claude/skills'],['opencode','AGENTS.md','.opencode/skills']]) {
  test(`${host}: preview is read-only, apply installs native instructions/resources and is idempotent`, async () => {
    const {installHost} = await api();
    const target = project();
    writeFileSync(join(target,instructions), '# Existing project rules\nKeep me.\n');
    const before = read(join(target,instructions));
    const preview = installHost({host,target});
    assert.ok(preview.changes.length > 50);
    assert.equal(read(join(target,instructions)),before);
    assert.equal(existsSync(join(target,skills)),false);
    const result = installHost({host,target,apply:true});
    assert.ok(result.changes.length);
    const startup = read(join(target,instructions));
    assert.ok(startup.startsWith(before));
    assert.match(startup,/explicit approval of scope/);
    assert.match(startup,/Entry point: GOLD Auto/);
    assert.match(startup,/Lead with the result or recommendation/);
    assert.match(startup,/gold-standard-development's references\/collaboration\.md/);
    assert.doesNotMatch(startup,/\{\{model\}\}|Harness|subagent_fork/);
    assert.ok(existsSync(join(target,skills,'gold-standard-development/references/develop.md')));
    assert.match(read(join(target,skills,'gold-standard-development/SKILL.md')), /legacy.*references\/architecture-migration\.md/i);
    for (const resource of ['references/architecture.md', 'references/architecture-migration.md', 'templates/c4-architecture.md', 'templates/c4-view.md', 'templates/c4-evolution.md']) {
      assert.equal(read(join(target,skills,'gold-standard-development',resource)), read(join(root,'skills/gold-standard-development',resource)));
    }
    assert.ok(existsSync(join(target,'.gold-host/THIRD_PARTY_NOTICES.md')));
    assert.deepEqual(installHost({host,target,apply:true}).changes,[]);
    const manifest = JSON.parse(read(join(target,'.gold-host/manifest.json')));
    assert.equal(manifest.host,host);
    assert.match(manifest.sourceDigest,/^[a-f0-9]{64}$/);
    assert.equal(manifest.version,JSON.parse(read(join(root,'package.json'))).version);
    assert.deepEqual(checkMarkdown(target,Object.keys(manifest.files).filter(p=>p.endsWith('.md'))),[]);
    const userSkill = join(target,skills,'implement-spec/SKILL.md');
    if (host==='opencode') {
      assert.equal(existsSync(userSkill),false);
      assert.ok(manifest.omittedSkills.includes('implement-spec'));
      assert.match(startup,/not installed/);
    } else {
      assert.match(read(userSkill),/disable-model-invocation: true/);
      if(host==='codex') assert.match(read(join(target,skills,'implement-spec/agents/openai.yaml')),/allow_implicit_invocation: false/);
    }
  });
}
test('all hosts refuse collisions before any writes and preserve user edits', async () => {
  const {installHost} = await api();
  const target = project();
  mkdirSync(join(target,'.agents/skills/tdd'),{recursive:true});
  writeFileSync(join(target,'.agents/skills/tdd/SKILL.md'),'My skill');
  assert.throws(()=>installHost({host:'codex',target,apply:true}),/collision/i);
  assert.equal(existsSync(join(target,'AGENTS.md')),false);
  assert.equal(read(join(target,'.agents/skills/tdd/SKILL.md')),'My skill');
  const other = project();
  installHost({host:'codex',target:other,apply:true});
  writeFileSync(join(other,'.agents/skills/tdd/SKILL.md'),'User changed');
  assert.throws(()=>installHost({host:'codex',target:other,apply:true}),/modified/i);
  assert.equal(read(join(other,'.agents/skills/tdd/SKILL.md')),'User changed');
});
test('startup content outside the managed block is preserved; altered blocks and another host are refused',async()=>{
  const {installHost}=await api(); const target=project();
  installHost({host:'codex',target,apply:true});
  const path=join(target,'AGENTS.md'); const startup=read(path);
  writeFileSync(path,startup+'\nUser addition\n');
  assert.deepEqual(installHost({host:'codex',target,apply:true}).changes,[]);
  assert.ok(read(path).endsWith('User addition\n'));
  assert.throws(()=>installHost({host:'claude',target,apply:true}),/host/i);
  writeFileSync(path,startup.replace('Entry point: GOLD Auto','User change'));
  assert.throws(()=>installHost({host:'codex',target,apply:true}),/modified/i);
});
test('reject unsafe target paths, symlinks, malformed state and discovery collisions',async()=>{
  const {installHost}=await api();
  for(const host of ['unknown','constructor','toString','__proto__']) assert.throws(()=>installHost({host,target:project()}),/host/i);
  const target=project(), outside=project();
  symlinkSync(outside,join(target,'.agents'),'dir');
  assert.throws(()=>installHost({host:'codex',target,apply:true}),/symlink/i);
  assert.equal(existsSync(join(outside,'skills')),false);
  if(process.platform!=='win32') {
    const odd=join(project(),'literal\\\\name'); mkdirSync(odd);
    symlinkSync(outside,join(odd,'.agents'),'dir');
    assert.throws(()=>installHost({host:'codex',target:odd,apply:true}),/symlink/i);
    assert.equal(existsSync(join(outside,'skills')),false);
  }
  const linked=project(); symlinkSync(outside,join(linked,'target'),'dir');
  assert.throws(()=>installHost({host:'codex',target:join(linked,'target'),apply:true}),/symlink/i);
  const malformed=project(); mkdirSync(join(malformed,'.gold-host'));
  writeFileSync(join(malformed,'.gold-host/manifest.json'),'{"schemaVersion":1,"host":"codex","files":{"../../escape":"bad"}}');
  assert.throws(()=>installHost({host:'codex',target:malformed,apply:true}),/manifest|state/i);
  const collision=project(); mkdirSync(join(collision,'.claude/skills/tdd'),{recursive:true});
  writeFileSync(join(collision,'.claude/skills/tdd/SKILL.md'),'Another provider');
  assert.throws(()=>installHost({host:'opencode',target:collision,apply:true}),/collision/i);
});
test('changed-source updates preserve outside text, refresh identity and fail closed on retired resources',async()=>{
  await api();
  const checkout=project(), target=project();
  for(const path of ['scripts','preset-src','skills','package.json','LICENSE','THIRD_PARTY_NOTICES.md']) cpSync(join(root,path),join(checkout,path),{recursive:true});
  const cli=join(checkout,'scripts/install-host.mjs');
  const run=(...args)=>spawnSync(process.execPath,[cli,'--host','codex','--target',target,...args],{encoding:'utf8'});
  assert.equal(run('--apply').status,0);
  const instructionPath=join(target,'AGENTS.md'), state=join(target,'.gold-host/manifest.json');
  writeFileSync(instructionPath,read(instructionPath)+'\nOutside user rule\n');
  const oldInstructions=read(instructionPath), oldState=read(state);
  const persona=join(checkout,'preset-src/core-persona.txt'); writeFileSync(persona,read(persona)+'\nUpdated source policy.\n');
  const resource=join(checkout,'skills/tdd/tests.md'); writeFileSync(resource,read(resource)+'\nUpdated source reference.\n');
  const preview=run(); assert.equal(preview.status,0,preview.stderr);
  assert.equal(read(state),oldState); assert.equal(read(instructionPath),oldInstructions);
  assert.ok(JSON.parse(preview.stdout).changes.includes('.agents/skills/tdd/tests.md'));
  const update=run('--apply'); assert.equal(update.status,0,update.stderr);
  assert.match(read(instructionPath),/Updated source policy/); assert.ok(read(instructionPath).endsWith('Outside user rule\n'));
  assert.match(read(join(target,'.agents/skills/tdd/tests.md')),/Updated source reference/);
  assert.notEqual(JSON.parse(read(state)).sourceDigest,JSON.parse(oldState).sourceDigest);
  assert.deepEqual(JSON.parse(run('--apply').stdout).changes,[]);
  const stableState=read(state), stableInstructions=read(instructionPath);
  // Verified literal fixture target: remove only this copied reference, never source or installed user files.
  assert.equal(resource,join(checkout,'skills/tdd/tests.md')); assert.ok(read(resource).includes('Updated source reference'));
  unlinkSync(resource);
  const removed=run('--apply'); assert.notEqual(removed.status,0); assert.match(removed.stderr,/retired resource/);
  assert.equal(read(state),stableState); assert.equal(read(instructionPath),stableInstructions);
});
test('emitted invocation classifications match the exact canonical user-only set',async()=>{
  const {buildHost}=await api();
  const expected=['ask-matt','grill-me','grill-with-docs','handoff','implement','implement-spec','improve-codebase-architecture','retro','setup-matt-pocock-skills','teach','to-questionnaire','to-spec','to-tickets','triage','wait-what','wayfinder'].sort();
  const sourceNames=readdirSync(join(root,'skills')).filter(name=>existsSync(join(root,'skills',name,'SKILL.md'))).sort();
  assert.deepEqual(sourceNames.filter(name=>/^disable-model-invocation: true$/m.test(read(join(root,'skills',name,'SKILL.md')).split('\n---')[0])),expected);
  for(const host of ['codex','claude','opencode']) {
    const bundle=buildHost(host); const entries=Object.keys(bundle.files).filter(path=>path.endsWith('/SKILL.md')).map(path=>path.split('/').at(-2)).sort();
    assert.deepEqual(entries,host==='opencode'?sourceNames.filter(name=>!expected.includes(name)):sourceNames);
    assert.deepEqual(bundle.omittedSkills,host==='opencode'?expected:[]);
    if(host==='codex') assert.deepEqual(Object.keys(bundle.files).filter(path=>path.endsWith('/agents/openai.yaml')).map(path=>path.split('/').at(-3)).sort(),expected);
  }
});
test('CLI validates flags, previews by default, requires explicit target and works outside source cwd', async()=>{
  await api(); const target=project();
  const run=(...args)=>spawnSync(process.execPath,[script,...args],{cwd:target,encoding:'utf8'});
  assert.notEqual(run('--host','codex').status,0);
  assert.notEqual(run('--host','codex','--target',target,'--force').status,0);
  const preview=run('--host','codex','--target',target); assert.equal(preview.status,0,preview.stderr);
  assert.equal(existsSync(join(target,'AGENTS.md')),false);
  const apply=run('--host','codex','--target',target,'--apply'); assert.equal(apply.status,0,apply.stderr);
  assert.ok(existsSync(join(target,'AGENTS.md')));
});
