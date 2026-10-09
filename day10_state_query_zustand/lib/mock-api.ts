import{initialProjects,type Project,type ProjectInput}from"@/lib/projects"
export type{Project,Status,Risk}from"@/lib/projects"
let store=[...initialProjects]
const delay=(ms:number)=>new Promise(r=>setTimeout(r,ms))
export async function fetchProjects(){
await delay(600)
return[...store]
}
export async function createProject(input:ProjectInput){
await delay(500)
if(input.name.toLowerCase().includes("fail"))throw new Error("Server error")
const p:Project={id:String(Date.now()),name:input.name,status:input.status as Project["status"],progress:0,risk:"Low",updatedAt:new Date().toISOString().slice(0,10)}
store=[p,...store]
return p
}