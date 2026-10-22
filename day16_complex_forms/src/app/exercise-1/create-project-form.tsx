"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema, type ProjectFormValues } from "./schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateProjectForm() {
  const [step, setStep] = useState(1);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      location: "",
      towers: [{ towerName: "", floors: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "towers",
  });

  const formValues = watch();

  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(["name", "location"]);
    } else if (step === 2) {
      isValid = await trigger(["towers"]);
    }

    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: ProjectFormValues) => {
    console.log("Final Validated Payload:", data);
    alert("Project Created! Check console for payload.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 border rounded-lg shadow-sm bg-card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Create Project</h2>
        <p className="text-muted-foreground text-sm">Step {step} of 3</p>
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" {...register("name")} placeholder="Skyline Tower" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" {...register("location")} placeholder="Financial District" />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-4 items-start border p-4 rounded-md bg-muted/50">
              <div className="flex-1">
                <Label>Tower Name</Label>
                <Input {...register(`towers.${index}.towerName`)} placeholder="Tower A" className="mt-1" />
                {errors.towers?.[index]?.towerName && (
                  <p className="text-red-500 text-sm mt-1">{errors.towers[index]?.towerName?.message}</p>
                )}
              </div>
              <div className="w-24">
                <Label>Floors</Label>
                <Input type="number" {...register(`towers.${index}.floors`)} className="mt-1" />
                {errors.towers?.[index]?.floors && (
                  <p className="text-red-500 text-sm mt-1">{errors.towers[index]?.floors?.message}</p>
                )}
              </div>
              <div className="pt-7">
                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                  X
                </Button>
              </div>
            </div>
          ))}
          
          <Button type="button" variant="outline" onClick={() => append({ towerName: "", floors: 1 })}>
            + Add Another Tower
          </Button>
          {errors.towers?.root && <p className="text-red-500 text-sm mt-2">{errors.towers.root.message}</p>}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 rounded-md border p-4 bg-muted/30">
          <h3 className="font-semibold text-lg border-b pb-2">Review Configuration</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Project Name</p>
              <p className="font-medium">{formValues.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{formValues.location}</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Towers Configured ({formValues.towers.length})</p>
            <ul className="space-y-2">
              {formValues.towers.map((tower, idx) => (
                <li key={idx} className="flex justify-between bg-background p-2 rounded border text-sm">
                  <span>{tower.towerName}</span>
                  <span className="font-medium">{tower.floors} Floors</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8 pt-4 border-t">
        <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
          Back
        </Button>
        
        {step < 3 ? (
          <Button type="button" onClick={nextStep}>Next Step</Button>
        ) : (
          <Button type="submit">Submit Project</Button>
        )}
      </div>
    </form>
  );
}