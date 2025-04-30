import { z } from "zod";

export const newEmployerSchema = z.object({
  name: z.string().trim().min(3, "Employer name must be at least 3 characters.").max(150, "Employer name must be less than 150 characters."),
});

export type NewEmployer = z.infer<typeof newEmployerSchema>;
