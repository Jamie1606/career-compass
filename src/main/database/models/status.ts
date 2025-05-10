import { ZodError } from "zod";
import db from "../config/db";
import { StatusInsert, StatusUpdate, ZodStatusDelete, ZodStatusInsert, ZodStatusUpdate } from "../../../zod-validation/status";
import { Status } from "../types";

export const createStatus = async (newStatus: StatusInsert) => {
  try {
    const parsed = ZodStatusInsert.parse(newStatus);
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

export const updateStatus = async (statusUpdate: StatusUpdate) => {
  try {
    const parsed = ZodStatusUpdate.parse(statusUpdate);
    const stmt = db.prepare("UPDATE status SET name = ?, color = ? WHERE status_id = ?");
    const result = stmt.run(parsed.name, parsed.color, parsed.statusId);

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

export const deleteStatus = async (statusId: number) => {
  try {
    const parsed = ZodStatusDelete.parse({ statusId });
    const stmt = db.prepare("DELETE FROM status WHERE status_id = ?");
    const result = stmt.run(parsed.statusId);

    if (!result.changes) {
      throw new Error("Failed to delete status");
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

export const getAllStatus = async () => {
  const stmt = db.prepare("SELECT status_id AS statusId, name, color, created_at AS createdAt FROM status");
  const result = stmt.all();

  return result as Status[];
};

export const getStatusById = async (statusId: number | bigint) => {
  const stmt = db.prepare("SELECT status_id AS statusId, name, color, created_at AS createdAt FROM status WHERE status_id = ?");
  const result = stmt.get(statusId);

  return result as Status;
};

export const getStatusCount = async (search: string) => {
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

export const getStatusList = async (search: string, limit: number, offset: number) => {
  let query = "SELECT status_id AS statusId, name, color, created_at AS createdAt FROM status";
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
