import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border bg-background p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          NirmanIQ
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Project portfolio</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Track delivery status, project health, and milestone progress in a clean shadcn-powered dashboard.
        </p>
        <Link
          href="/projects"
          className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Open project list
        </Link>
      </div>
    </main>
  )
}
