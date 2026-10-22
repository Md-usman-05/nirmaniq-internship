import { z } from "zod";

export const projectSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters."),
  location: z.string().min(3, "Location is required."),
  towers: z.array(
    z.object({
      towerName: z.string().min(1, "Tower name is required."),
      floors: z.coerce.number().min(1, "Must have at least 1 floor."),
    })
  ).min(1, "You must configure at least one tower."),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;