import { ZodError } from "zod";
import db from "./db";
import { CreateJob, Job } from "./db-types";
import { createEmployer, getEmployerByName } from "./employer";
import { getStatusById } from "./status";
import { getOfficeTypeById } from "./office-type";
import { createJobStatusHistory } from "./job-status-history";

export const createJob = async (job: CreateJob) => {
  try {
    const employer = getEmployerByName(job.employer_name);
    let employerID: number | bigint;

    if (!employer) {
      employerID = createEmployer({ name: job.employer_name });
    } else {
      employerID = employer.employer_id;
    }

    const status = getStatusById(job.status_id);
    const officeType = getOfficeTypeById(job.office_type_id);

    if (!status) {
      throw new Error("Status not found");
    }

    if (!officeType) {
      throw new Error("Office type not found");
    }

    const stmt = db.prepare("INSERT INTO job (title, location, job_description, link, resume, cover_letter, created_at, office_type_id, employer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    const result = stmt.run(job.title, job.location, job.job_description, job.link, job.resume, job.cover_letter, job.created_at, job.office_type_id, employerID);

    if (!result.lastInsertRowid) {
      throw new Error("Failed to create job");
    }

    createJobStatusHistory({ job_id: result.lastInsertRowid, status_id: job.status_id, note: job.note });

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

export const getJobList = async (search: string, limit: number, offset: number) => {
  let query = "SELECT * FROM job";
  let params: any[] = [];

  if (search) {
    query += " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  query += " LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const stmt = db.prepare(query);
  const result = stmt.all(...params) as Job[];
  return result;
};

export const getJobCount = async (search: string) => {
  let query = "SELECT COUNT(*) as count FROM job";
  let params: any[] = [];

  if (search) {
    query += " WHERE title LIKE ?";
    params.push(`%${search}%`);
  }

  const stmt = db.prepare(query);
  const result = stmt.get(...params) as { count: number };
  return result.count;
};
