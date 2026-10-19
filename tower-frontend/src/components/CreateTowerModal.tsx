import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Accept projectId as a prop from the parent page
export function CreateTowerModal({ projectId }: { projectId: string }) {
  const [name, setName] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const createTowerMutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "http://localhost:3000/towers",
        { 
          name, 
          totalFloors: Number(totalFloors), // Ensure it is sent as a number
          projectId 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    },
    onSuccess: () => {
      // Invalidate specifically THIS project's cache so the UI updates instantly
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      setIsOpen(false);
      setName("");
      setTotalFloors("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTowerMutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="inline-flex h-10 items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        Create Tower
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Tower</DialogTitle>
          <DialogDescription>
            Define the tower name and the total number of floors to generate the tracking structure.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tower Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Tower A"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalFloors">Total Floors</Label>
            <Input
              id="totalFloors"
              type="number"
              min="1"
              value={totalFloors}
              onChange={(e) => setTotalFloors(e.target.value)}
              placeholder="e.g. 15"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={createTowerMutation.isPending}
          >
            {createTowerMutation.isPending ? "Creating..." : "Save Tower"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}