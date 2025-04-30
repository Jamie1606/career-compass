import { z } from "zod";

export const newJobSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters.").max(100, "Title must be less than 100 characters."),
  application_date: z.string().datetime(),
  status_id: z.number().int().positive(),
  office_type_id: z.number().int().positive(),
  location: z.string().trim().min(3, "Location must be at least 3 characters.").max(100, "Location must be less than 100 characters."),
  job_description: z.string().trim().min(3, "Job description must be at least 3 characters.").max(1000, "Job description must be less than 1000 characters."),
  job_link: z.string().trim().min(3, "Job link must be at least 3 characters.").max(100, "Job link must be less than 100 characters."),
  resume: z.string().trim().min(3, "Resume must be at least 3 characters.").max(100, "Resume must be less than 100 characters."),
  cover_letter: z.string().trim().min(3, "Cover letter must be at least 3 characters.").max(100, "Cover letter must be less than 100 characters."),
});

export type NewJob = z.infer<typeof newJobSchema>;
