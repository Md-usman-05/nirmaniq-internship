"use client"
import{Card,CardContent,CardHeader,CardTitle}from"@/components/ui/card"
import{useProjects}from"@/hooks/use-projects"
export function StatsCards(){
const{data}=useProjects()
const total=data?.length??0
const inProgress=data?.filter(p=>p.status==="Active").length??0
const completed=data?.filter(p=>p.status==="Completed").length??0
return(<div className="grid gap-4 sm:grid-cols-3"><Card><CardHeader><CardTitle className="text-sm text-muted-foreground">Total Projects</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{total}</CardContent></Card><Card><CardHeader><CardTitle className="text-sm text-muted-foreground">In Progress</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{inProgress}</CardContent></Card><Card><CardHeader><CardTitle className="text-sm text-muted-foreground">Completed</CardTitle></CardHeader><CardContent className="text-2xl font-semibold">{completed}</CardContent></Card></div>)
}