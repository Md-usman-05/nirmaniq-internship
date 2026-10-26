"use client";

import dynamic from "next/dynamic";

const InlineTableForm = dynamic(
  () => import("./inline-form-table"),
  { ssr: false }
);

export default function ExerciseThreePage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Day 16: Exercise 3</h1>
        <p className="text-muted-foreground mt-2">Inline-editable table for bulk progress updates.</p>
      </div>
      <InlineTableForm />
    </main>
  );
}