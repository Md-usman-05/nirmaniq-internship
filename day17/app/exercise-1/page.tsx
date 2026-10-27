import ActivityTable from "./activity-table";

export default function ExerciseOnePage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Day 17: Exercise 1</h1>
        <p className="text-muted-foreground mt-2">Server-side pagination and column sorting with React Query.</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <ActivityTable />
      </div>
    </main>
  );
}