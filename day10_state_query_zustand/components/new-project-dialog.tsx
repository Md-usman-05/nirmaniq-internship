"use client"
import{useState}from"react"
import{toast}from"sonner"
import{Button}from"@/components/ui/button"
import{Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger}from"@/components/ui/dialog"
import{Input}from"@/components/ui/input"
import{Select,SelectContent,SelectItem,SelectTrigger,SelectValue}from"@/components/ui/select"
import{useCreateProject}from"@/hooks/use-create-project"
export function NewProjectDialog(){
const[open,setOpen]=useState(false)
const[name,setName]=useState("")
const[status,setStatus]=useState("Active")
const{mutate,isPending}=useCreateProject()
function handleCreate(){
if(!name.trim()||name.trim().length<3){toast.error("Failed to save");return}
mutate({name,status},{
onSuccess:()=>{toast.success("Project created");setName("");setStatus("Active");setOpen(false)},
onError:()=>{toast.error("Failed to save")},
})
}
return(<Dialog open={open} onOpenChange={setOpen}><DialogTrigger render={<Button>New Project</Button>}/><DialogContent className="sm:max-w-md"><DialogHeader><DialogTitle>Create Project</DialogTitle><DialogDescription>Add a new project to your workspace.</DialogDescription></DialogHeader><div className="space-y-4 py-2"><div className="space-y-2"><label className="text-sm font-medium">Name</label><Input value={name} onChange={e=>setName(e.target.value)} placeholder="Project name"/></div><div className="space-y-2"><label className="text-sm font-medium">Status</label><Select value={status} onValueChange={v=>typeof v==="string"&&setStatus(v)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="Pending">Pending</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="On Hold">On Hold</SelectItem></SelectContent></Select></div></div><DialogFooter><Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button><Button onClick={handleCreate} disabled={isPending}>{isPending?"Creating...":"Create"}</Button></DialogFooter></DialogContent></Dialog>)
}
