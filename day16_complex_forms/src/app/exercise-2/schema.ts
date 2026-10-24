import { z } from "zod";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const inspectionSchema = z.object({
  towerId: z.string().min(1, "Please select a tower."),
  floorId: z.string().min(1, "Please select a floor."),
  roomId: z.string().min(1, "Please select a room."),
  notes: z.string().optional(),
  
  // Validate the browser's FileList object
  evidence: z
    .any()
    .refine((files) => files?.length > 0, "An evidence photo is required.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max file size is 10MB.")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, and .png formats are supported."
    ),
});

export type InspectionFormValues = z.infer<typeof inspectionSchema>;