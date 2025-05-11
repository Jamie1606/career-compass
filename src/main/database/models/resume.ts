import { ZodError } from "zod";
import { ResumeInsert, ZodResumeDelete, ZodResumeInsert } from "../../../zod-validation";
import db from "../config/db";
import { Resume } from "../types";

export const createResume = async (newResume: ResumeInsert) => {
  try {
    const parsed = ZodResumeInsert.parse(newResume);
    const stmt = db.prepare("INSERT INTO resume (name, resume) VALUES (?, ?)");
    const result = stmt.run(parsed.name, parsed.resume);

    if (!result.lastInsertRowid) {
      throw new Error("Failed to create resume");
    }

    return result.lastInsertRowid;
  } catch (error) {
    throw error;
  }
};

export const deleteResume = async (resumeId: number | bigint) => {
  try {
    const parsed = ZodResumeDelete.parse({ resumeId });
    const stmt = db.prepare("DELETE FROM resume WHERE resume_id = ?");
    const result = stmt.run(parsed.resumeId);

    if (!result.changes) {
      throw new Error("Failed to delete resume");
    }

    return result.changes;
  } catch (error) {
    throw error;
  }
};

export const getAllResume = async () => {
  const stmt = db.prepare("SELECT resume_id AS resumeId, name, resume, created_at AS createdAt FROM resume");
  const result = stmt.all();

  return result as Resume[];
};
