"use client"

import { useMemo, useState } from "react"
import { ArrowUpDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  riskVariant,
  statusVariant,
  type Project,
  type RiskLevel,
} from "@/lib/projects"

type SortKey = "name" | "status" | "progress" | "risk" | "lastUpdated"
type SortDirection = "asc" | "desc"

type ProjectTableProps = {
  projects: Project[]
}

const riskOrder: RiskLevel[] = ["Low", "Medium", "High", "Critical"]

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value))
}

export function ProjectTable({ projects }: ProjectTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("lastUpdated")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  const sortedProjects = useMemo(() => {
    const sorted = [...projects]

    sorted.sort((a, b) => {
      let comparison = 0

      switch (sortKey) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "status":
          comparison = a.status.localeCompare(b.status)
          break
        case "progress":
          comparison = a.progress - b.progress
          break
        case "risk":
          comparison = riskOrder.indexOf(a.risk) - riskOrder.indexOf(b.risk)
          break
        case "lastUpdated":
          comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
          break
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

    return sorted
  }, [projects, sortDirection, sortKey])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"))
      return
    }

    setSortKey(key)
    setSortDirection("asc")
  }

  const sortableHeader = (key: SortKey, label: string, className?: string) => (
    <TableHead
      className={className}
      aria-sort={
        sortKey === key
          ? sortDirection === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <button
        type="button"
        className="inline-flex items-center gap-2 font-medium hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Sort by ${label}${sortKey === key ? `, ${sortDirection === "asc" ? "ascending" : "descending"}` : ""}`}
        onClick={() => handleSort(key)}
      >
        {label}
        <ArrowUpDown
          aria-hidden="true"
          className={`size-4 ${sortKey === key && sortDirection === "desc" ? "rotate-180" : ""}`}
        />
      </button>
    </TableHead>
  )

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {sortableHeader("name", "Name", "w-[28%]")}
            {sortableHeader("status", "Status", "w-[16%]")}
            {sortableHeader("progress", "Progress", "w-[20%]")}
            {sortableHeader("risk", "Risk Level", "w-[16%]")}
            {sortableHeader("lastUpdated", "Last Updated", "w-[20%]")}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedProjects.map((project) => (
            <TableRow key={project.id}>
              <TableCell className="font-medium">{project.name}</TableCell>
              <TableCell>
                <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{project.progress}%</span>
                  </div>
                  <div
                    className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-label={`${project.name} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={project.progress}
                  >
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant={riskVariant[project.risk]}>{project.risk}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(project.lastUpdated)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
