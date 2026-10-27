import { Suspense } from "react";
import BulkActionTable from "./bulk-action-table";

export default function ExerciseFourPage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Day 17: Exercise 4</h1>
        <p className="text-muted-foreground mt-2">Row selection and React Query bulk mutations.</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading Table...</div>}>
          <BulkActionTable />
        </Suspense>
      </div>
    </main>
  );
}