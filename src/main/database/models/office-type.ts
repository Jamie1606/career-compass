import { ZodError } from "zod";
import db from "../config/db";
import { OfficeTypeInsert, OfficeTypeUpdate, ZodOfficeTypeInsert, ZodOfficeTypeUpdate } from "../../../zod-validation";
import { OfficeType } from "../types";

export const createOfficeType = async (newOfficeType: OfficeTypeInsert) => {
  try {
    const parsed = ZodOfficeTypeInsert.parse(newOfficeType);
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

export const updateOfficeType = async (officeTypeUpdate: OfficeTypeUpdate) => {
  try {
    const parsed = ZodOfficeTypeUpdate.parse(officeTypeUpdate);
    const stmt = db.prepare("UPDATE office_type SET name = ? WHERE office_type_id = ?");
    const result = stmt.run(parsed.name, parsed.officeTypeId);

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

export const deleteOfficeType = async (officeTypeId: number) => {
  const stmt = db.prepare("DELETE FROM office_type WHERE office_type_id = ?");
  const result = stmt.run(officeTypeId);

  if (!result.changes) {
    throw new Error("Failed to delete office type");
  }

  return result.changes;
};

export const getAllOfficeType = async () => {
  const stmt = db.prepare("SELECT office_type_id AS officeTypeId, name, created_at AS createdAt FROM office_type");
  const result = stmt.all();

  return result as OfficeType[];
};

export const getOfficeTypeById = async (officeTypeId: number | bigint) => {
  const stmt = db.prepare("SELECT office_type_id AS officeTypeId, name, created_at AS createdAt FROM office_type WHERE office_type_id = ?");
  const result = stmt.get(officeTypeId);

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
  let query = "SELECT office_type_id AS officeTypeId, name, created_at AS createdAt FROM office_type";
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
