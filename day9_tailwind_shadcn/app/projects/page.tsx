"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NewProjectDialog } from "@/components/new-project-dialog"
import { ProjectTable } from "@/components/project-table"
import { ThemeToggle } from "@/components/theme-toggle"
import { projects as initialProjects, type Project } from "@/lib/projects"

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjects)

  const summaryCards = [
    { label: "Total Projects", value: projects.length },
    {
      label: "In Progress",
      value: projects.filter((project) => project.status === "Active" || project.status === "At Risk").length,
    },
    {
      label: "Completed",
      value: projects.filter((project) => project.status === "Completed").length,
    },
  ]

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio overview
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Projects</h1>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NewProjectDialog onCreate={(project) => setProjects((current) => [project, ...current])} />
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="overflow-hidden rounded-xl border bg-background shadow-sm">
        <ProjectTable projects={projects} />
      </div>
    </div>
  )
}