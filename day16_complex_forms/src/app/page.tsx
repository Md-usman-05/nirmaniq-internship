"use client";

import dynamic from "next/dynamic";

// Dynamically import the component and disable SSR 
// This strictly prevents the crypto.randomUUID() server crash
const CreateProjectForm = dynamic(
  () => import("./exercise-1/create-project-form"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Day 16: Exercise 1</h1>
        <p className="text-muted-foreground mt-2">
          Multi-step form with React Hook Form, Zod, and Dynamic Field Arrays.
        </p>
      </div>
      
      <CreateProjectForm />
    </main>
  );
}