import { z } from "zod";

export const tableSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string(),
      taskName: z.string().min(1, "Task name required"),
      progress: z.coerce.number().min(0).max(100, "Max 100%"),
      status: z.enum(["Pending", "In Progress", "Completed"]),
    })
  ),
});

export type TableFormValues = z.infer<typeof tableSchema>;