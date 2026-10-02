interface ProgressEntry {
  date:Date;
  completedBy:string;
  notes?:string;
}
interface Room {
  id:string;
  type:string;
  status:'pending'|'in_progress'|'completed';
  progress:ProgressEntry[];
}
interface Floor{
  level:number;
  rooms:Room[];
}
interface Tower {
  name:string;
  floors:Floor[];
}
interface Project {
  projectId:string;
  name:string;
  towers:Tower[];
}
export type { Project,Tower,Floor,Room,ProgressEntry};