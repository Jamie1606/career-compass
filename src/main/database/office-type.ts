import { ZodError } from "zod";
import { newOfficeTypeSchema } from "../zod-schema/office-type";
import db from "./db";
import { CreateOfficeType, OfficeType } from "./db-types";

export const createOfficeType = async (officeType: CreateOfficeType) => {
  try {
    const parsed = newOfficeTypeSchema.parse(officeType);
    const stmt = db.prepare("INSERT INTO office_type (name) VALUES (?)");
    const result = stmt.run(parsed.name);

    if (!result.lastInsertRowid) {
      throw new Error("Failed to create office type");
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

export const updateOfficeType = async (name: string, officeTypeID: number) => {
  try {
    const parsed = newOfficeTypeSchema.parse({ name });
    const stmt = db.prepare("UPDATE office_type SET name = ? WHERE office_type_id = ?");
    const result = stmt.run(parsed.name, officeTypeID);

    if (!result.changes) {
      throw new Error("Failed to update office type");
    }

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

export const deleteOfficeType = async (officeTypeID: number) => {
  const stmt = db.prepare("DELETE FROM office_type WHERE office_type_id = ?");
  const result = stmt.run(officeTypeID);

  if (!result.changes) {
    throw new Error("Failed to delete office type");
  }

  return result.changes;
};

export const getAllOfficeType = async () => {
  const stmt = db.prepare("SELECT * FROM office_type");
  const result = stmt.all();

  return result as OfficeType[];
};

export const getOfficeTypeById = async (officeTypeID: number | bigint) => {
  const stmt = db.prepare("SELECT * FROM office_type WHERE office_type_id = ?");
  const result = stmt.get(officeTypeID);

  if (!result) {
    throw new Error("No office type found");
  }

  return result as OfficeType;
};

export const getOfficeTypeCount = async (search: string) => {
  let query = "SELECT COUNT(*) as count FROM office_type";
  let params: any[] = [];

  if (search) {
    query += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  const stmt = db.prepare(query);
  const result = stmt.get(...params) as { count: number };

  return result.count;
};

export const getOfficeTypeList = async (search: string, limit: number, offset: number) => {
  let query = "SELECT * FROM office_type";
  let params: any[] = [];

  if (search) {
    query += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const stmt = db.prepare(query);
  const result = stmt.all(...params) as OfficeType[];

  return result;
};
