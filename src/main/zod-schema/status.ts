import { z } from "zod";

export const newStatusSchema = z.object({
  name: z.string().trim().min(3, "Status name must be at least 3 characters.").max(100, "Status name must be less than 100 characters."),
  color: z.string().regex(/^([0-9a-fA-F]{6})$/, "Color must be a valid 6-digit hex code").optional(),
});

export type NewStatus = z.infer<typeof newStatusSchema>;
