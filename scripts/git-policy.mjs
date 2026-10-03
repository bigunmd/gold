const types='feat|fix|docs|refactor|test|perf|build|ci|chore|revert';
const conventional=new RegExp(`^(${types})(\\([a-zA-Z0-9._/-]+\\))?!?: \\S.*$`);
// Conservative known-identity detector, not proof that any other identity is human.
const modelName=/^(?:(?:anthropic|openai|github|google)[ -]+)?(?:claude(?:[ -]+(?:code|sonnet|opus|haiku))?|chatgpt|copilot|codex|deepseek|gemini|gpt(?:[- ]?\d[\w.-]*)?|anthropic|openai|ai[- ]?(?:assistant|agent|model))(?:\s*\[bot\])?$/i;
function modelIdentity(value){
 const name=value.replace(/\s*<[^>]*>\s*$/,'').trim();
 const email=value.match(/<([^>]+)>\s*$/)?.[1]??'';
 return modelName.test(name)||/^(?:claude|chatgpt|copilot|codex|gemini|deepseek)(?:\[bot\])?@/i.test(email);
}
export function checkSubject(subject,{merge=false,revert=false}={}){
 if(typeof subject!=='string'||/[\r\n]/.test(subject))return ['Commit subject must be a single line'];
 if(conventional.test(subject))return [];
 if(merge&&/^Merge (?:branch |remote-tracking branch |pull request |tag )\S/.test(subject))return [];
 if(revert&&/^Revert ".+"$/.test(subject))return [];
 return ['Use type(scope optional)! optional: description (Conventional Commits)'];
}
export function checkAttribution({message,author='',committer='',prBody=false}){
 const errors=[];
 for(const [field,value] of Object.entries({author,committer}))if(value&&modelIdentity(value))errors.push(`Known model/provider ${field} identity is prohibited`);
 let text=String(message??'');
 text=text.replace(/^\s*(```|~~~)[\s\S]*?^\s*\1[^\n]*$/gm,'');
 for(const line of text.split(/\r?\n/)){
  const trailer=line.match(/^\s*(Co-authored-by|Signed-off-by):\s*(.+)$/i);
  if(trailer&&modelIdentity(trailer[2]))errors.push(`Known model attribution in ${trailer[1]}`);
  const generated=line.match(/^\s*(?:generated|written|authored)\s+(?:by|with)\s+(.+?)\s*$/i);
  if(generated&&modelIdentity(generated[1]))errors.push('Model-generated attribution footer prohibited');
 }
 return errors;
}
export function checkBranch(name){
 if(['main','master','develop'].includes(name))return [];
 if(new RegExp(`^(${types})/[a-z0-9]+(?:-[a-z0-9]+)*$`).test(name))return [];
 if(/^release\/\d+\.\d+\.\d+(?:-[a-z0-9]+(?:[.-][a-z0-9]+)*)?$/.test(name))return [];
 return ['Prefer type/short-kebab-case-description or release/x.y.z; existing branches are not renamed automatically'];
}
