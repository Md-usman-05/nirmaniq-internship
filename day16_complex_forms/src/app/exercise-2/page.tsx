"use client";

import dynamic from "next/dynamic";

const FloorInspectionForm = dynamic(
  () => import("./floor-inspection-form"),
  { ssr: false }
);

export default function ExerciseTwoPage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Day 16: Exercise 2</h1>
        <p className="text-muted-foreground mt-2">Dependent dropdowns and file validation.</p>
      </div>
      <FloorInspectionForm />
    </main>
  );
}