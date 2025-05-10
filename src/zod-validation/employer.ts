import { z } from "zod";

// --- Base schema used for shared structure
const baseEmployerSchema = z.object({
  employerId: z.union([z.number(), z.bigint()]),
  name: z.string().trim().min(3, "Employer name must be at least 3 characters.").max(150, "Employer name must be less than 150 characters."),
  createdAt: z.string().optional(), // Optional because it's often auto-generated
});

// --- Schema for inserting a new employer
export const ZodEmployerInsert = baseEmployerSchema.omit({ createdAt: true }).extend({
  employerId: z.union([z.number(), z.bigint()]).optional(), // Optional for insert
});
export type EmployerInsert = z.infer<typeof ZodEmployerInsert>;

// --- Schema for updating an employer
export const ZodEmployerUpdate = baseEmployerSchema.partial().extend({
  employerId: z.union([z.number(), z.bigint()]),
});
export type EmployerUpdate = z.infer<typeof ZodEmployerUpdate>;

// --- Schema for deleting an employer (only needs the ID)
export const ZodEmployerDelete = z.object({
  employerId: z.union([z.number(), z.bigint()]),
});
export type EmployerDelete = z.infer<typeof ZodEmployerDelete>;

export type Employer = z.infer<typeof baseEmployerSchema>;
