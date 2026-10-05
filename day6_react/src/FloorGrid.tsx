import React,{useState}from'react';
type Status='not-started'|'in-progress'|'completed';
interface Floor{id:number;status:Status;}
export const FloorGrid=()=>{
  const[floors,setFloors]=useState<Floor[]>(Array.from({length:20},(_,i)=>({id:i+1,status:'not-started'})));
  const next:Record<Status,Status>={'not-started':'in-progress','in-progress':'completed','completed':'not-started'};
  const colors:Record<Status,string>={'not-started':'#ccc','in-progress':'#f59e0b','completed':'#10b981'};
  const toggle=(id:number)=>setFloors(floors.map(f=>f.id===id?{...f,status:next[f.status]}:f));
  return(
    <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:'5px',width:'300px'}}>
      {floors.map(f=>(
        <div key={f.id} onClick={()=>toggle(f.id)} style={{background:colors[f.status],padding:'10px',textAlign:'center',cursor:'pointer'}}>{f.id}</div>
      ))}
    </div>
  );
};