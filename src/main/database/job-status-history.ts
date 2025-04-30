import db from "./db";
import { CreateJobStatusHistory } from "./db-types";

export const createJobStatusHistory = (jobStatusHistory: CreateJobStatusHistory) => {
  const stmt = db.prepare("INSERT INTO job_status_history (job_id, status_id, note) VALUES (?, ?, ?)");
  const result = stmt.run(jobStatusHistory.job_id, jobStatusHistory.status_id, jobStatusHistory.note);
  return result.lastInsertRowid;
};
