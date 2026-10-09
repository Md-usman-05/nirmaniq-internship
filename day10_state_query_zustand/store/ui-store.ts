"use client"
import{create}from"zustand"
type ViewMode="table"|"grid"
type UIState={
sidebarOpen:boolean
selectedFilters:{status:string;risk:string}
viewMode:ViewMode
toggleSidebar:()=>void
setSelectedFilters:(f:Partial<{status:string;risk:string}>)=>void
setViewMode:(m:ViewMode)=>void
}
export const useUIStore=create<UIState>(set=>({
sidebarOpen:false,
selectedFilters:{status:"all",risk:"all"},
viewMode:"table",
toggleSidebar:()=>set(s=>({sidebarOpen:!s.sidebarOpen})),
setSelectedFilters:f=>set(s=>({selectedFilters:{...s.selectedFilters,...f}})),
setViewMode:m=>set({viewMode:m}),
}))
