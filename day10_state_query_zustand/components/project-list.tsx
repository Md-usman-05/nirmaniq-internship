"use client"
import{useProjects}from"@/hooks/use-projects"
import{Card,CardContent}from"@/components/ui/card"
export function ProjectList(){
const{data,isLoading,error}=useProjects()
if(isLoading)return<p className="text-sm text-muted-foreground">Loading projects...</p>
if(error)return<p className="text-sm text-destructive">Error: {(error as Error).message}</p>
return(<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{data?.map(p=>(<Card key={p.id}><CardContent className="pt-6"><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.status}</p></CardContent></Card>))}</div>)
}