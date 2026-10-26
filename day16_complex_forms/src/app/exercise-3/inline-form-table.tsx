"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tableSchema, type TableFormValues } from "./schema";
import { Button } from "@/components/ui/button";

const INITIAL_DATA = [
  { id: "1", taskName: "Foundation Pour", progress: 100, status: "Completed" as const },
  { id: "2", taskName: "Steel Framing", progress: 45, status: "In Progress" as const },
  { id: "3", taskName: "HVAC Rough-in", progress: 0, status: "Pending" as const },
];

export default function InlineTableForm() {
  const { register, control, handleSubmit, resetField, getValues, formState: { errors } } = useForm<TableFormValues>({
    resolver: zodResolver(tableSchema),
    defaultValues: { tasks: INITIAL_DATA },
  });

  const { fields } = useFieldArray({ control, name: "tasks" });

  const onSubmit = (data: TableFormValues) => {
    console.log("Bulk Update Payload:", data.tasks);
    alert("Bulk progress saved! Check console.");
  };

  // Handles Escape (revert to last saved state) and Enter (blur/save)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, index: number, fieldName: keyof TableFormValues["tasks"][0]) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.currentTarget.blur();
    }
    if (e.key === "Escape") {
      e.preventDefault();
      // Revert field to its initial state if canceled
      resetField(`tasks.${index}.${fieldName}`);
      e.currentTarget.blur();
    }
  };

  const inputStyles = "w-full bg-transparent border border-transparent px-2 py-1 rounded hover:bg-muted/50 focus:bg-background focus:border-input focus:ring-1 focus:ring-ring focus:outline-none transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 border rounded-lg bg-card">
      <h2 className="text-2xl font-bold mb-6">Bulk Progress Update</h2>

      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Task ID</th>
              <th className="px-4 py-3 font-medium">Task Name</th>
              <th className="px-4 py-3 font-medium w-32">Progress (%)</th>
              <th className="px-4 py-3 font-medium w-48">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {fields.map((field, index) => (
              <tr key={field.id} className="bg-background group">
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {/* Hidden input for ID submission */}
                  <input type="hidden" {...register(`tasks.${index}.id`)} />
                  #{getValues(`tasks.${index}.id`)}
                </td>
                
                <td className="px-2 py-2">
                  <input
                    {...register(`tasks.${index}.taskName`)}
                    onKeyDown={(e) => handleKeyDown(e, index, "taskName")}
                    className={inputStyles}
                  />
                  {errors.tasks?.[index]?.taskName && (
                    <span className="text-red-500 text-xs px-2">{errors.tasks[index]?.taskName?.message}</span>
                  )}
                </td>

                <td className="px-2 py-2">
                  <input
                    type="number"
                    {...register(`tasks.${index}.progress`)}
                    onKeyDown={(e) => handleKeyDown(e, index, "progress")}
                    className={inputStyles}
                  />
                  {errors.tasks?.[index]?.progress && (
                    <span className="text-red-500 text-xs px-2">{errors.tasks[index]?.progress?.message}</span>
                  )}
                </td>

                <td className="px-2 py-2">
                  <select
                    {...register(`tasks.${index}.status`)}
                    onKeyDown={(e) => handleKeyDown(e, index, "status")}
                    className={inputStyles}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-6">
        <Button type="submit">Save All Updates</Button>
      </div>
    </form>
  );
}