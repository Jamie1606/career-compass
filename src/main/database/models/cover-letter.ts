import { ZodError } from "zod";
import { ResumeInsert, ZodResumeInsert } from "../../../zod-validation";
import db from "../config/db";
import { Resume } from "../types";

export const createCoverLetter = async (newResume: ResumeInsert) => {
  try {
    const parsed = ZodResumeInsert.parse(newResume);
    const stmt = db.prepare("INSERT INTO cover_letter (name, cover_letter) VALUES (?, ?)");
    const result = stmt.run(parsed.name, parsed.resume);

    if (!result.lastInsertRowid) {
      throw new Error("Failed to create resume");
    }

    return result.lastInsertRowid;
  } catch (error) {
    throw error;
  }
};

export const getAllCoverLetter = async () => {
  const stmt = db.prepare("SELECT cover_letter_id AS coverLetterId, name, cover_letter as coverLetter, created_at AS createdAt FROM cover_letter");
  const result = stmt.all();

  return result as Resume[];
};
