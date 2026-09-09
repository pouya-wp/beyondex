export type WorkspaceAgent={slug:string;enabled:boolean};
export type WorkspaceEvent={id:string;slug:string;at:string;status:"review"|"done"|"rejected"};
export type WorkspaceMessage={id:string;slug:string;text:string;role:"user"|"assistant"};
export type Workspace={version:1;name:string;approval:boolean;agents:WorkspaceAgent[];events:WorkspaceEvent[];messages:WorkspaceMessage[]};
export const WORKSPACE_KEY="beyondex-workspace-v1";
export function createWorkspace():Workspace{return {version:1,name:"",approval:true,agents:[{slug:"email-marketing",enabled:true},{slug:"sales-sdr",enabled:true},{slug:"accounting",enabled:false}],events:[],messages:[]};}
export function parseWorkspace(raw:string,allowed:string[]):Workspace|null{
 try{const v=JSON.parse(raw);if(!v||v.version!==1||typeof v.name!=="string"||typeof v.approval!=="boolean"||!Array.isArray(v.agents)||!Array.isArray(v.events)||!Array.isArray(v.messages))return null;
 const agents=v.agents.filter((a:WorkspaceAgent)=>a&&allowed.includes(a.slug)&&typeof a.enabled==="boolean").filter((a:WorkspaceAgent,i:number,arr:WorkspaceAgent[])=>arr.findIndex(b=>b.slug===a.slug)===i);
 const events=v.events.filter((e:WorkspaceEvent)=>e&&typeof e.id==="string"&&allowed.includes(e.slug)&&typeof e.at==="string"&&Number.isFinite(Date.parse(e.at))&&["review","done","rejected"].includes(e.status)).slice(0,100);
 const messages=v.messages.filter((m:WorkspaceMessage)=>m&&typeof m.id==="string"&&allowed.includes(m.slug)&&typeof m.text==="string"&&m.text.length<=2000&&["user","assistant"].includes(m.role)).slice(-100);
 return {version:1,name:v.name.slice(0,60),approval:v.approval,agents,events,messages};}catch{return null;}
}
