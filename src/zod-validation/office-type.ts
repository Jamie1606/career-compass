import { z } from "zod";

// --- Base schema used for shared structure
const baseOfficeTypeSchema = z.object({
  officeTypeId: z.union([z.number(), z.bigint()]),
  name: z.string().trim().min(3, "Office type name must be at least 3 characters.").max(100, "Office type name must be less than 100 characters."),
  createdAt: z.string().optional(), // Optional because it's often auto-generated
});

// --- Schema for inserting a new employer
export const ZodOfficeTypeInsert = baseOfficeTypeSchema.omit({ createdAt: true, officeTypeId: true });
export type OfficeTypeInsert = z.infer<typeof ZodOfficeTypeInsert>;

// --- Schema for updating an employer
export const ZodOfficeTypeUpdate = baseOfficeTypeSchema.omit({ createdAt: true }).extend({
  officeTypeId: z.union([z.number(), z.bigint()]),
});
export type OfficeTypeUpdate = z.infer<typeof ZodOfficeTypeUpdate>;

// --- Schema for deleting an employer (only needs the ID)
export const ZodOfficeTypeDelete = z.object({
  officeTypeId: z.union([z.number(), z.bigint()]),
});
export type OfficeTypeDelete = z.infer<typeof ZodOfficeTypeDelete>;

export type OfficeType = z.infer<typeof baseOfficeTypeSchema>;
