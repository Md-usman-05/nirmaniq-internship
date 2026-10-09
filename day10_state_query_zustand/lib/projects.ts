export type Status="Active"|"Pending"|"Completed"|"On Hold"
export type Risk="Low"|"Medium"|"High"
export type Project={id:string;name:string;status:Status;progress:number;risk:Risk;updatedAt:string}
export type ProjectInput={name:string;status:string}
export const projects:Project[]=[
{id:"1",name:"Skyline Tower",status:"Active",progress:65,risk:"Low",updatedAt:"2026-10-07"},
{id:"2",name:"Riverside Bridge",status:"Pending",progress:15,risk:"Medium",updatedAt:"2026-10-05"},
{id:"3",name:"Metro Station Phase 2",status:"Completed",progress:100,risk:"Low",updatedAt:"2026-09-28"},
{id:"4",name:"Harbor Warehouse",status:"On Hold",progress:40,risk:"High",updatedAt:"2026-10-01"},
]
export const initialProjects=projects
export const statusVariant:Record<Status,"default"|"secondary"|"outline"|"destructive">={Active:"default",Pending:"secondary",Completed:"outline","On Hold":"destructive"}
export const riskVariant:Record<Risk,"default"|"secondary"|"destructive">={Low:"secondary",Medium:"default",High:"destructive"}