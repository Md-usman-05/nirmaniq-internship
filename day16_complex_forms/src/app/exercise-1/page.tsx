"use client";

import dynamic from "next/dynamic";

// Dynamically import the form to disable SSR for this specific route
const CreateProjectForm = dynamic(
  () => import("./create-project-form"),
  { ssr: false }
);

export default function ExerciseOnePage() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Day 16: Exercise 1</h1>
        <p className="text-muted-foreground">Multi-step form with React Hook Form, Zod, and Dynamic Field Arrays.</p>
      </div>
      <CreateProjectForm />
    </main>
  );
}