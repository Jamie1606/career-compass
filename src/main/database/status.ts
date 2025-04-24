import { ZodError } from "zod";
import { newStatusSchema } from "../zod-schema/status";
import db from "./db";
import { CreateStatus, Status } from "./db-types";

export const createStatus = (status: CreateStatus) => {
  try {
    const parsed = newStatusSchema.parse(status);
    const stmt = db.prepare("INSERT INTO status (name, color) VALUES (?, ?)");
    const result = stmt.run(parsed.name, parsed.color);

    if (!result.lastInsertRowid) {
      throw new Error("Failed to create status");
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

export const updateStatus = (name: string, color: string, statusID: number) => {
  try {
    const parsed = newStatusSchema.parse({ name, color });
    const stmt = db.prepare("UPDATE status SET name = ?, color = ? WHERE status_id = ?");
    const result = stmt.run(parsed.name, parsed.color, statusID);

    if (!result.changes) {
      throw new Error("Failed to update status");
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

export const deleteStatus = (statusID: number) => {
  try {
    const stmt = db.prepare("DELETE FROM status WHERE status_id = ?");
    const result = stmt.run(statusID);

    if (!result.changes) {
      throw new Error("Failed to delete status");
    }

    return result.changes;
  } catch (error) {
    throw error;
  }
};

export const getAllStatus = () => {
  const stmt = db.prepare("SELECT * FROM status");
  const result = stmt.all();

  return result as Status[];
};

export const getStatusById = (statusID: number) => {
  try {
    const stmt = db.prepare("SELECT * FROM status WHERE status_id = ?");
    const result = stmt.get(statusID);

    if (!result) {
      throw new Error("No status found");
    }

    return result as Status;
  } catch (error) {
    throw error;
  }
};

export const getStatusCount = (search: string) => {
  let query = "SELECT COUNT(*) as count FROM status";
  let params: any[] = [];

  if (search) {
    query += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  const stmt = db.prepare(query);
  const result = stmt.get(...params) as { count: number };

  return result.count;
};

export const getStatusList = (search: string, limit: number, offset: number) => {
  let query = "SELECT * FROM status";
  let params: any[] = [];

  if (search) {
    query += " WHERE name LIKE ?";
    params.push(`%${search}%`);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const stmt = db.prepare(query);
  const result = stmt.all(...params) as Status[];

  return result;
};
