"use client";

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { inspectionSchema, type InspectionFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Mock Database 
const DATABASE = {
  towers: [
    { id: "t1", name: "Tower Alpha" },
    { id: "t2", name: "Tower Beta" },
  ],
  floors: {
    t1: [{ id: "f1", name: "Floor 1" }, { id: "f2", name: "Floor 2" }],
    t2: [{ id: "f3", name: "Floor 1" }, { id: "f4", name: "Penthouse" }],
  },
  rooms: {
    f1: [{ id: "r1", name: "Room 101" }, { id: "r2", name: "Room 102" }],
    f2: [{ id: "r3", name: "Room 201" }],
    f3: [{ id: "r4", name: "Lobby" }],
    f4: [{ id: "r5", name: "Master Suite" }],
  }
};

export default function FloorInspectionForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InspectionFormValues>({
    resolver: zodResolver(inspectionSchema),
    defaultValues: { towerId: "", floorId: "", roomId: "" }
  });

  const selectedTowerId = useWatch({ control, name: "towerId" });
  const selectedFloorId = useWatch({ control, name: "floorId" });
  const evidenceFile = useWatch({ control, name: "evidence" });

  // Reset child dropdowns when parent changes
  useEffect(() => {
    setValue("floorId", "");
    setValue("roomId", "");
  }, [selectedTowerId, setValue]);

  useEffect(() => {
    setValue("roomId", "");
  }, [selectedFloorId, setValue]);

  // Handle Image Preview Safely
  useEffect(() => {
    if (evidenceFile && evidenceFile.length > 0) {
      const url = URL.createObjectURL(evidenceFile[0]);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); // Prevent memory leaks
    }
    setPreviewUrl(null);
  }, [evidenceFile]);

  const onSubmit = (data: InspectionFormValues) => {
    console.log("Validated Data:", { ...data, fileName: data.evidence[0].name });
    alert("Inspection saved! Check console.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto p-6 border rounded-lg bg-card space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>Tower</Label>
          <select 
            {...register("towerId")} 
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
          >
            <option value="">Select Tower...</option>
            {DATABASE.towers.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          {errors.towerId && <p className="text-red-500 text-sm mt-1">{errors.towerId.message}</p>}
        </div>

        <div>
          <Label>Floor</Label>
          <select 
            {...register("floorId")} 
            disabled={!selectedTowerId}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1 disabled:opacity-50"
          >
            <option value="">Select Floor...</option>
            {selectedTowerId && DATABASE.floors[selectedTowerId as keyof typeof DATABASE.floors]?.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
          {errors.floorId && <p className="text-red-500 text-sm mt-1">{errors.floorId.message}</p>}
        </div>

        <div>
          <Label>Room</Label>
          <select 
            {...register("roomId")} 
            disabled={!selectedFloorId}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1 disabled:opacity-50"
          >
            <option value="">Select Room...</option>
            {selectedFloorId && DATABASE.rooms[selectedFloorId as keyof typeof DATABASE.rooms]?.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
          {errors.roomId && <p className="text-red-500 text-sm mt-1">{errors.roomId.message}</p>}
        </div>
      </div>

      <div className="border p-4 rounded-md bg-muted/30">
        <Label htmlFor="evidence">Evidence Photo (Max 10MB)</Label>
        <input 
          type="file" 
          id="evidence" 
          accept="image/png, image/jpeg"
          {...register("evidence")} 
          className="mt-2 block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground hover:file:bg-primary/90"
        />
        {errors.evidence && <p className="text-red-500 text-sm mt-1">{errors.evidence?.message as string}</p>}
        
        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Image Preview:</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={previewUrl} alt="Preview" className="h-48 rounded-md object-cover border" />
          </div>
        )}
      </div>

      <Button type="submit" className="w-full">Submit Inspection</Button>
    </form>
  );
}