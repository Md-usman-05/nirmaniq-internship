"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("manager@build.com");
  const [password, setPassword] = useState("securepass123");
  const [role, setRole] = useState<"PM" | "SE">("PM");
  
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        role,
      });
      return response.data;
    },
    onSuccess: (data) => {
      // Save token and role to Zustand (which persists to localStorage)
      setAuth(data.access_token, role);
      // Redirect to the master dashboard
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tower Tracker</CardTitle>
          <CardDescription>Sign in to manage construction progress.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as "PM" | "SE")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="PM">Project Manager (PM)</option>
                <option value="SE">Site Engineer (SE)</option>
              </select>
            </div>

            {loginMutation.isError && (
              <p className="text-sm text-red-500 font-medium">
                Invalid credentials. Please try again.
              </p>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}