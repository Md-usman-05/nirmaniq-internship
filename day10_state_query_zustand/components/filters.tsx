"use client"
import{Select,SelectContent,SelectItem,SelectTrigger,SelectValue}from"@/components/ui/select"
import{Button}from"@/components/ui/button"
import{useUIStore}from"@/store/ui-store"
export function Filters(){
const selectedFilters=useUIStore(s=>s.selectedFilters)
const setSelectedFilters=useUIStore(s=>s.setSelectedFilters)
const viewMode=useUIStore(s=>s.viewMode)
const setViewMode=useUIStore(s=>s.setViewMode)
return(<div className="flex flex-wrap items-center gap-3"><Select value={selectedFilters.status} onValueChange={v=>typeof v==="string"&&setSelectedFilters({status:v})}><SelectTrigger className="w-[180px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="Active">Active</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="On Hold">On Hold</SelectItem></SelectContent></Select><Select value={selectedFilters.risk} onValueChange={v=>typeof v==="string"&&setSelectedFilters({risk:v})}><SelectTrigger className="w-[180px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All Risk</SelectItem><SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="High">High</SelectItem></SelectContent></Select><div className="ml-auto flex gap-2"><Button variant={viewMode==="table"?"default":"outline"} size="sm" onClick={()=>setViewMode("table")}>Table</Button><Button variant={viewMode==="grid"?"default":"outline"} size="sm" onClick={()=>setViewMode("grid")}>Grid</Button></div></div>)
}
