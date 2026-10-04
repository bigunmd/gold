import {spawn} from 'node:child_process';
/** POSIX process-group supervisor. Refuse unsupported platforms rather than claim descendant cleanup. */
export function runProcess(command,args,{cwd,env,input,timeout=180000,grace=1000,maxBytes=16*1024*1024}={}) {
  if(process.platform==='win32')throw Error('Behavior runner requires POSIX process-group supervision; Windows adapter not implemented');
  return new Promise(resolve=>{
    const child=spawn(command,args,{cwd,env,detached:true,stdio:['pipe','pipe','pipe']});
    let stdout='',stderr='',size=0,error=null,timedOut=false,cleanup='pending',closed=false,killTimer,settleTimer;
    const signal=kind=>{if(!child.pid)return;try{process.kill(-child.pid,kind);}catch(e){if(e.code!=='ESRCH')error||=e.message;}};
    const finish=(status,signalName)=>{if(closed)return;closed=true;clearTimeout(timer);clearTimeout(killTimer);clearTimeout(settleTimer);resolve({status,signal:signalName,stdout,stderr,error,timedOut,cleanup});};
    const stop=reason=>{if(error)return;error=reason;timedOut=reason==='timeout';signal('SIGTERM');killTimer=setTimeout(()=>{signal('SIGKILL');cleanup='group-kill-requested';settleTimer=setTimeout(()=>{child.stdout.destroy();child.stderr.destroy();child.unref();finish(null,'SIGKILL');},grace);},grace);};
    const timer=setTimeout(()=>stop('timeout'),timeout);
    child.stdout.setEncoding('utf8');child.stderr.setEncoding('utf8');
    child.stdout.on('data',chunk=>{size+=Buffer.byteLength(chunk);if(size>maxBytes)stop('output-limit');else stdout+=chunk.toString();});
    child.stderr.on('data',chunk=>{size+=Buffer.byteLength(chunk);if(size>maxBytes)stop('output-limit');else stderr+=chunk.toString();});
    child.on('error',e=>{error=e.message;cleanup='spawn-failed';finish(null,null);});
    child.on('close',(status,signalName)=>{signal('SIGKILL');cleanup='process-group-cleanup-requested';finish(status,signalName);});
    child.stdin.on('error',()=>{});child.stdin.end(input);
  });
}
