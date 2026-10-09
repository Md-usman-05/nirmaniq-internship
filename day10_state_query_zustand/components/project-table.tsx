"use client"
import{Table,TableBody,TableCell,TableHead,TableHeader,TableRow}from"@/components/ui/table"
import{Badge}from"@/components/ui/badge"
import{Progress}from"@/components/ui/progress"
import{Card,CardContent}from"@/components/ui/card"
import{statusVariant,riskVariant,type Project}from"@/lib/projects"
import{useUIStore}from"@/store/ui-store"
export function ProjectTable({projects}:{projects:Project[]}){
const viewMode=useUIStore(s=>s.viewMode)
if(viewMode==="grid"){
return(<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{projects.map(p=>(<Card key={p.id}><CardContent className="space-y-2 pt-6"><p className="font-medium">{p.name}</p><div className="flex gap-2"><Badge variant={statusVariant[p.status]}>{p.status}</Badge><Badge variant={riskVariant[p.risk]}>{p.risk}</Badge></div><Progress value={p.progress}/></CardContent></Card>))}</div>)
}
return(<div className="overflow-x-auto rounded-md border"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead className="min-w-[160px]">Progress</TableHead><TableHead>Risk Level</TableHead><TableHead>Last Updated</TableHead></TableRow></TableHeader><TableBody>{projects.map(p=>(<TableRow key={p.id}><TableCell className="font-medium">{p.name}</TableCell><TableCell><Badge variant={statusVariant[p.status]}>{p.status}</Badge></TableCell><TableCell><div className="flex items-center gap-2"><Progress value={p.progress} className="w-24"/><span className="text-xs text-muted-foreground">{p.progress}%</span></div></TableCell><TableCell><Badge variant={riskVariant[p.risk]}>{p.risk}</Badge></TableCell><TableCell>{p.updatedAt}</TableCell></TableRow>))}</TableBody></Table></div>)
}
