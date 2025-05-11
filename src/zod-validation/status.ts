import { z } from "zod";

// --- Base schema used for shared structure
const baseStatusSchema = z.object({
  statusId: z.union([z.number(), z.bigint()]),
  name: z.string().trim().min(3, "Status name must be at least 3 characters.").max(100, "Status name must be less than 100 characters."),
  color: z.string().regex(/^([0-9a-fA-F]{6})$/, "Color must be a valid 6-digit hex code"),
  createdAt: z.string(),
});

// --- Schema for inserting a new status
export const ZodStatusInsert = baseStatusSchema.omit({ statusId: true, createdAt: true });
export type StatusInsert = z.infer<typeof ZodStatusInsert>;

// --- Schema for updating a status
export const ZodStatusUpdate = baseStatusSchema.omit({ createdAt: true }).extend({
  statusId: z.union([z.number(), z.bigint()]),
});
export type StatusUpdate = z.infer<typeof ZodStatusUpdate>;

// --- Schema for deleting a status (only needs the ID)
export const ZodStatusDelete = z.object({
  statusId: z.union([z.number(), z.bigint()]),
});
export type StatusDelete = z.infer<typeof ZodStatusDelete>;

export type Status = z.infer<typeof baseStatusSchema>;
