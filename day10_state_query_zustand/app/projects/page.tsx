"use client"
import{useProjects}from"@/hooks/use-projects"
import{useUIStore}from"@/store/ui-store"
import{ProjectTable}from"@/components/project-table"
import{StatsCards}from"@/components/stats-cards"
import{Filters}from"@/components/filters"
import{NewProjectDialog}from"@/components/new-project-dialog"
export default function ProjectsPage(){
const{data,isLoading,error}=useProjects()
const selectedFilters=useUIStore(s=>s.selectedFilters)
const filtered=(data??[]).filter(p=>(selectedFilters.status==="all"||p.status===selectedFilters.status)&&(selectedFilters.risk==="all"||p.risk===selectedFilters.risk))
return(<div className="container mx-auto space-y-6 py-10"><div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-wide text-muted-foreground">Portfolio Overview</p><h1 className="text-2xl font-semibold">Projects</h1></div><NewProjectDialog/></div><StatsCards/><Filters/>{isLoading&&<p className="text-sm text-muted-foreground">Loading...</p>}{error&&<p className="text-sm text-destructive">Error: {(error as Error).message}</p>}{!isLoading&&!error&&<ProjectTable projects={filtered}/>}</div>)
}
