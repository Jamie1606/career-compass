import { z } from "zod";

// --- Base schema used for shared structure
const baseResumeSchema = z.object({
  resumeId: z.union([z.number(), z.bigint()]),
  name: z.string().trim().min(3, "Resume file name must be at least 3 characters.").max(100, "Resume file name must be less than 150 characters."),
  resume: z.instanceof(Blob).refine((blob) => blob.size > 0, "Resume file cannot be empty."),
  createdAt: z.string(),
});

// --- Schema for inserting a new resume
export const ZodResumeInsert = baseResumeSchema.omit({ createdAt: true, resumeId: true });
export type ResumeInsert = z.infer<typeof ZodResumeInsert>;

// --- Schema for updating an existing resume
export const ZodResumeUpdate = baseResumeSchema.omit({ createdAt: true }).extend({
  resumeId: z.union([z.number(), z.bigint()]),
});
export type ResumeUpdate = z.infer<typeof ZodResumeUpdate>;

// --- Schema for deleting a resume (only needs the ID)
export const ZodResumeDelete = z.object({
  resumeId: z.union([z.number(), z.bigint()]),
});
export type ResumeDelete = z.infer<typeof ZodResumeDelete>;

export type Resume = z.infer<typeof baseResumeSchema>;
