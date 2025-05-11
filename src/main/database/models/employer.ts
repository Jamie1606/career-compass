import { ZodError } from "zod";
import db from "../config/db";
import { EmployerInsert, ZodEmployerDelete, ZodEmployerInsert } from "../../../zod-validation";
import { Employer } from "../types";

export const createEmployer = async (newEmployer: EmployerInsert) => {
  try {
    const parsed = ZodEmployerInsert.parse(newEmployer);
    const stmt = db.prepare("INSERT INTO employer (name) VALUES (?)");
    const result = stmt.run(parsed.name);

    if (!result.lastInsertRowid) {
      throw new Error("Failed to create employer");
    }

    return result.lastInsertRowid;
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.errors[0]?.message;
      throw new Error(firstError || "Invalid input.");
    } else {
      throw error;
    }
  }
};

export const deleteEmployer = async (employerId: number | bigint) => {
  try {
    const parsed = ZodEmployerDelete.parse({ employerId });
    const stmt = db.prepare("DELETE FROM employer WHERE employer_id = ?");
    const result = stmt.run(parsed.employerId);
    return result.changes;
  } catch (error) {
    if (error instanceof ZodError) {
      const firstError = error.errors[0]?.message;
      throw new Error(firstError || "Invalid input.");
    } else {
      throw error;
    }
  }
};

export const getAllEmployers = async () => {
  const stmt = db.prepare("SELECT employer_id AS employerId, name, created_at AS createdAt FROM employer");
  const result = stmt.all();
  return result as Employer[];
};

export const getEmployerById = async (employerId: number) => {
  const stmt = db.prepare("SELECT employer_id AS employerId, name, created_at AS createdAt FROM employer WHERE employer_id = ?");
  const result = stmt.get(employerId);
  return result as Employer;
};

export const getEmployerByName = async (employerName: string) => {
  const stmt = db.prepare("SELECT employer_id AS employerId, name, created_at AS createdAt FROM employer WHERE name = ?");
  const result = stmt.get(employerName);
  return result as Employer;
};
