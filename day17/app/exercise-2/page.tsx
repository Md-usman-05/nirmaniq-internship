import FilteredTable from "./filtered-table";

export default function ExerciseTwoPage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Day 17: Exercise 2</h1>
        <p className="text-muted-foreground mt-2">Data table with multiple column filters.</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <FilteredTable />
      </div>
    </main>
  );
}