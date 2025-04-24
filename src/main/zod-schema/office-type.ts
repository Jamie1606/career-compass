import { z } from "zod";

export const newOfficeTypeSchema = z.object({
  name: z.string().trim().min(3, "Office type name must be at least 3 characters.").max(100, "Office type name must be less than 100 characters."),
});

export type NewOfficeType = z.infer<typeof newOfficeTypeSchema>;
