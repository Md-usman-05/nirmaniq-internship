"use client";

import { use, useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CreateTowerModal } from "@/components/CreateTowerModal";

function ProjectDetailsContent() {
  const params = useParams();
  const projectId = params.id as string;
  
  const { token, role } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !token) {
      router.push("/");
    }
  }, [isMounted, token, router]);

  const { data: project, isLoading, isError } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token && isMounted && !!projectId,
  });

  // NEW: Delete Project Mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      // Clear cache and redirect to dashboard
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      router.push("/dashboard");
    },
  });

  const handleDeleteProject = () => {
    if (window.confirm("Are you sure you want to delete this project? This will permanently delete all associated towers and floor data.")) {
      deleteProjectMutation.mutate();
    }
  };

  if (!isMounted || !token) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/dashboard">
              <Button variant="outline">← Back to Dashboard</Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isLoading ? "Loading..." : project?.name}
              </h1>
              <p className="text-slate-500">{project?.location}</p>
            </div>
          </div>
          
          {/* UPGRADED: Added Delete Project Button for PM */}
          {role === "PM" && (
            <div className="flex items-center gap-3">
              <Button 
                variant="destructive" 
                onClick={handleDeleteProject}
                disabled={deleteProjectMutation.isPending}
              >
                {deleteProjectMutation.isPending ? "Deleting..." : "Delete Project"}
              </Button>
              <CreateTowerModal projectId={projectId} />
            </div>
          )}
        </div>

        {/* Loading / Error States */}
        {isLoading && <div className="text-slate-500">Loading project data...</div>}
        {isError && <div className="text-red-500 font-medium">Failed to load project details.</div>}

        {/* Towers Grid */}
        {!isLoading && !isError && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b pb-2">Towers Overview</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {project?.towers?.map((tower: any) => (
                <Link href={`/dashboard/tower/${tower.id}`} key={tower.id}>
                  <Card className="hover:border-slate-400 transition-colors cursor-pointer h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{tower.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm font-medium">Total Floors: {tower.totalFloors}</p>
                      <p className="text-sm text-slate-500">
                        Overall Progress: <span className="font-bold text-blue-600">{tower.progressPercentage}%</span>
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {project?.towers?.length === 0 && (
              <div className="rounded-lg border border-dashed p-8 text-center text-slate-500">
                No towers have been added to this project yet.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading route...</div>}>
      <ProjectDetailsContent />
    </Suspense>
  );
}