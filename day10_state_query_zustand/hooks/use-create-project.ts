"use client"
import{useMutation,useQueryClient}from"@tanstack/react-query"
import{createProject,type Project}from"@/lib/mock-api"
import{projectKeys}from"./use-projects"
export function useCreateProject(){
const qc=useQueryClient()
return useMutation({
mutationFn:createProject,
onMutate:async(input)=>{
await qc.cancelQueries({queryKey:projectKeys.all})
const previous=qc.getQueryData<Project[]>(projectKeys.all)
const optimistic:Project={id:`temp-${Date.now()}`,name:input.name,status:input.status as Project["status"],progress:0,risk:"Low",updatedAt:new Date().toISOString().slice(0,10)}
qc.setQueryData<Project[]>(projectKeys.all,old=>old?[optimistic,...old]:[optimistic])
return{previous}
},
onError:(_err,_input,ctx)=>{
if(ctx?.previous)qc.setQueryData(projectKeys.all,ctx.previous)
},
onSuccess:()=>{
qc.invalidateQueries({queryKey:projectKeys.all})
},
})
}
