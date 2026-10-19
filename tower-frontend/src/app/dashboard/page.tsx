"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Added Input for the search bar
import { CreateProjectModal } from "@/components/CreateProjectModal";
import Link from "next/link";

export default function DashboardPage() {
  const { token, role, logout } = useAuthStore();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  // NEW: State to hold the search text
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !token) {
      router.push("/");
    }
  }, [isMounted, token, router]);

  // UPGRADED: React Query now listens to 'searchTerm' and passes it to the backend
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ["projects", searchTerm], // Including searchTerm triggers a refetch when it changes
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/projects", {
        params: { search: searchTerm || undefined }, // Send the search query to NestJS
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    },
    enabled: !!token && isMounted,
  });

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isMounted || !token) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects Dashboard</h1>
            <p className="text-slate-500">
              Welcome back! You are logged in as a <span className="font-bold">{role}</span>.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {role === "PM" && <CreateProjectModal />}
            <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
          </div>
        </div>

        {/* NEW: Search Bar Section */}
        <div className="flex items-center space-x-2 max-w-md">
          <Input 
            type="text" 
            placeholder="Search projects by name or location..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white"
          />
        </div>

        {isLoading && <div className="text-slate-500">Loading projects...</div>}
        {isError && <div className="text-red-500 font-medium">Failed to load projects.</div>}

        {/* Projects Grid */}
        {!isLoading && !isError && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects?.map((project: any) => (
              <Link href={`/dashboard/${project.id}`} key={project.id}>
                <Card className="hover:border-slate-400 transition-colors cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                    <p className="text-sm text-slate-500">{project.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm font-medium bg-slate-100 inline-block px-3 py-1 rounded-md">
                      Total Towers: {project.towers?.length || 0}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
            
            {projects?.length === 0 && (
              <div className="col-span-full rounded-lg border border-dashed p-8 text-center text-slate-500">
                {searchTerm ? "No projects match your search." : "No projects found. Create one to get started!"}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}