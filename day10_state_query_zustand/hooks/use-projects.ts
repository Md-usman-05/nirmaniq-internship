"use client"
import{useQuery}from"@tanstack/react-query"
import{fetchProjects}from"@/lib/mock-api"
export const projectKeys={all:["projects"]as const}
export function useProjects(){
return useQuery({queryKey:projectKeys.all,queryFn:fetchProjects})
}
