"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Project, RiskLevel, Status } from "@/lib/projects"

type NewProjectDialogProps = {
  onCreate: (project: Project) => void
}

type FormValues = {
  name: string
  status: Status | null
  progress: number
  risk: RiskLevel
  lastUpdated: string
}

const statusOptions: Status[] = ["Active", "Pending", "Completed", "On Hold"]
const riskOptions: RiskLevel[] = ["Low", "Medium", "High", "Critical"]

export function NewProjectDialog({ onCreate }: NewProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    status: null,
    progress: 0,
    risk: "Medium",
    lastUpdated: "",
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const name = formValues.name.trim()
    if (!name) {
      toast.error("Project name is required")
      return
    }

    if (!formValues.status) {
      toast.error("Project status is required")
      return
    }

    const project: Project = {
      id: crypto.randomUUID(),
      name,
      status: formValues.status,
      progress: formValues.progress,
      risk: formValues.risk,
      lastUpdated: new Date(formValues.lastUpdated).toISOString(),
    }

    onCreate(project)
    setFormValues({
      name: "",
      status: null,
      progress: 0,
      risk: "Medium",
      lastUpdated: new Date().toISOString().slice(0, 10),
    })
    setIsOpen(false)
    toast.success(`${project.name} added to the project list`)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open)
        if (open) {
          setFormValues((current) => ({
            ...current,
            lastUpdated: current.lastUpdated || new Date().toISOString().slice(0, 10),
          }))
        }
      }}
    >
      <DialogTrigger render={<Button>New Project</Button>} />
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>
          <DialogDescription>
            Add a new initiative and track its health, progress, and timeline.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="project-name">
              Project name
            </label>
            <Input
              id="project-name"
              placeholder="e.g. Solstice Campus"
              required
              value={formValues.name}
              onChange={(event) =>
                setFormValues((current) => ({ ...current, name: event.target.value }))
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                name="status"
                required
                value={formValues.status}
                onValueChange={(value) => {
                  if (value !== null && statusOptions.includes(value as Status)) {
                    setFormValues((current) => ({ ...current, status: value as Status }))
                  }
                }}
              >
                <SelectTrigger className="w-full" aria-label="Status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Risk level</label>
              <Select
                value={formValues.risk}
                onValueChange={(value) => {
                  if (riskOptions.includes(value as RiskLevel)) {
                    setFormValues((current) => ({ ...current, risk: value as RiskLevel }))
                  }
                }}
              >
                <SelectTrigger className="w-full" aria-label="Risk level">
                  <SelectValue placeholder="Select risk" />
                </SelectTrigger>
                <SelectContent>
                  {riskOptions.map((risk) => (
                    <SelectItem key={risk} value={risk}>
                      {risk}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="project-progress">
                Progress
              </label>
              <Input
                id="project-progress"
                type="number"
                min={0}
                max={100}
                value={formValues.progress}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    progress: Number(event.target.value) || 0,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="project-last-updated">
                Last updated
              </label>
              <Input
                id="project-last-updated"
                type="date"
                required
                value={formValues.lastUpdated}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    lastUpdated: event.target.value,
                  }))
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
