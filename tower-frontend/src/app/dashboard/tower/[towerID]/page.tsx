"use client";
import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
function TowerDetailsContent() {
  const params = useParams();
  const towerId = params.towerID as string; 
  
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

  const { data: tower, isLoading, isError } = useQuery({
    queryKey: ["tower", towerId],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/towers/${towerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token && isMounted && !!towerId, 
  });

  const updateFloorMutation = useMutation({
    mutationFn: async ({ floorNumber, status }: { floorNumber: number, status: string }) => {
      const response = await axios.patch(
        `http://localhost:3000/towers/${towerId}/progress`,
        { floorNumber, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tower", towerId] });
    },
  });

  const deleteTowerMutation = useMutation({
    mutationFn: async () => {
      await axios.delete(`http://localhost:3000/towers/${towerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project"] }); 
      router.back();
    },
  });
  const handleDeleteTower = () => {
    if (window.confirm(`Are you sure you want to delete this tower? All progress will be lost.`)) {
      deleteTowerMutation.mutate();
    }
  };

  if (!isMounted || !token) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED": return "bg-green-100 text-green-800 border-green-200";
      case "IN_PROGRESS": return "bg-blue-100 text-blue-800 border-blue-200";
      case "PENDING": return "bg-slate-100 text-slate-800 border-slate-200";
      default: return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
  
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="outline" onClick={() => router.back()}>
              ← Back to Project
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {isLoading ? "Loading..." : tower?.name}
              </h1>
              {!isLoading && !isError && (
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-3 w-48 overflow-hidden rounded-full bg-slate-200">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-500" 
                      style={{ width: `${tower?.progressPercentage || 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-slate-600">
                    {tower?.progressPercentage}% Completed
                  </span>
                </div>
              )}
            </div>
          </div>
          {role === "PM" && (
            <Button 
              variant="destructive" 
              onClick={handleDeleteTower}
              disabled={deleteTowerMutation.isPending}
            >
              {deleteTowerMutation.isPending ? "Deleting..." : "Delete Tower"}
            </Button>
          )}
        </div>

        {isLoading && <div className="text-slate-500">Loading tower data...</div>}
        {isError && <div className="text-red-500 font-medium">Failed to load tower details.</div>}

      
        {!isLoading && !isError && (
          <Card>
            <CardHeader>
              <CardTitle>Floor Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tower?.floors?.map((floor: any) => (
                <div key={floor.floorNumber} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <span className="font-semibold w-24">Floor {floor.floorNumber}</span>
                    <span className={`px-3 py-1 text-xs font-semibold border rounded-full ${getStatusColor(floor.status)}`}>
                      {floor.status.replace("_", " ")}
                    </span>
                  </div>
                  
                  {role === "SE" && (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        disabled={floor.status === "IN_PROGRESS" || updateFloorMutation.isPending}
                        onClick={() => updateFloorMutation.mutate({ floorNumber: floor.floorNumber, status: "IN_PROGRESS" })}
                      >
                        Start
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        disabled={floor.status === "COMPLETED" || updateFloorMutation.isPending}
                        onClick={() => updateFloorMutation.mutate({ floorNumber: floor.floorNumber, status: "COMPLETED" })}
                      >
                        Complete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function TowerDetailsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-slate-500">Loading route...</div>}>
      <TowerDetailsContent />
    </Suspense>
  );
}