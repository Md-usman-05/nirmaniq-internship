export type Status = "Active" | "Pending" | "Planning" | "Completed" | "On Hold" | "At Risk"
export type RiskLevel = "Low" | "Medium" | "High" | "Critical"

export type Project = {
  id: string
  name: string
  status: Status
  progress: number
  risk: RiskLevel
  lastUpdated: string
}

export const projects: Project[] = [
  {
    id: "1",
    name: "Skyline Tower",
    status: "Active",
    progress: 82,
    risk: "Medium",
    lastUpdated: "2026-10-08T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Riverside Bridge",
    status: "Pending",
    progress: 46,
    risk: "High",
    lastUpdated: "2026-09-30T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Metro Station Phase 2",
    status: "Completed",
    progress: 100,
    risk: "Low",
    lastUpdated: "2026-10-05T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Harbor Warehouse",
    status: "On Hold",
    progress: 21,
    risk: "Critical",
    lastUpdated: "2026-09-12T00:00:00.000Z",
  },
  {
    id: "5",
    name: "Northline Transit",
    status: "At Risk",
    progress: 63,
    risk: "High",
    lastUpdated: "2026-10-03T00:00:00.000Z",
  },
]

export const statusVariant: Record<
  Status,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Active: "default",
  Pending: "secondary",
  Planning: "secondary",
  Completed: "outline",
  "On Hold": "destructive",
  "At Risk": "destructive",
}

export const riskVariant: Record<
  RiskLevel,
  "default" | "secondary" | "outline" | "destructive"
> = {
  Low: "outline",
  Medium: "secondary",
  High: "default",
  Critical: "destructive",
}