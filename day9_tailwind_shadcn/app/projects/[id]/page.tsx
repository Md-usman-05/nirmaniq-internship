import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { projects, riskVariant, statusVariant } from "@/lib/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }))
}

export const instant = false

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = projects.find((item) => item.id === id)

  if (!project) {
    notFound()
  }

  return (
    <main className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/projects"
        className="mb-6 inline-flex h-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition-colors hover:bg-muted"
      >
        Back to projects
      </Link>

      <div className="mt-6">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Project #{project.id}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{project.name}</h1>
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={statusVariant[project.status]}>{project.status}</Badge>
          <Badge variant={riskVariant[project.risk]}>{project.risk} risk</Badge>
        </div>
      </div>

      <dl className="mt-8 grid gap-6 rounded-xl border p-6 sm:grid-cols-3">
        <div>
          <dt className="text-sm text-muted-foreground">Progress</dt>
          <dd className="mt-1 text-lg font-medium">{project.progress}%</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Risk level</dt>
          <dd className="mt-1 text-lg font-medium">{project.risk}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Last updated</dt>
          <dd className="mt-1 text-lg font-medium">
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              timeZone: "UTC",
            }).format(new Date(project.lastUpdated))}
          </dd>
        </div>
      </dl>
    </main>
  )
}
