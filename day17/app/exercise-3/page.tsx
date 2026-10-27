import { Suspense } from "react";
import UrlSyncedTable from "./url-synced-table";

export default function ExerciseThreePage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Day 17: Exercise 3</h1>
        <p className="text-muted-foreground mt-2">URL-Synced Filters (Search Params as Single Source of Truth).</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground border rounded bg-card">Loading Table...</div>}>
          <UrlSyncedTable />
        </Suspense>
      </div>
    </main>
  );
}