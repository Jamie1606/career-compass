// import db from "./db";
// import { CreateJobStatusHistory, JobStatusHistoryDetail } from "./db-types";

// export const createJobStatusHistory = async (jobStatusHistory: CreateJobStatusHistory) => {
//   const job = await getLatestJobStatusHistoryByJobID(jobStatusHistory.job_id);

//   if (job.status_id === jobStatusHistory.status_id) {
//     throw new Error("New status is the same as the latest status");
//   }

//   const stmt = db.prepare("INSERT INTO job_status_history (job_id, status_id, note) VALUES (?, ?, ?)");
//   const result = stmt.run(jobStatusHistory.job_id, jobStatusHistory.status_id, jobStatusHistory.note);
//   return result.lastInsertRowid;
// };

// export const deleteJobStatusHistory = async (jobID: number | bigint) => {
//   const stmt = db.prepare("DELETE FROM job_status_history WHERE job_id = ?");
//   const result = stmt.run(jobID);
//   return result.changes;
// };

// export const getJobStatusHistoryByJobID = async (jobID: number | bigint) => {
//   const stmt = db.prepare(`
//     SELECT 
//       jsh.*,
//       s.name as status_name,
//       s.color as status_color
//     FROM job_status_history jsh
//     LEFT JOIN status s ON s.status_id = jsh.status_id 
//     WHERE jsh.job_id = ?
//     ORDER BY jsh.created_at DESC
//   `);
//   const result = stmt.all(jobID) as JobStatusHistoryDetail[];
//   return result;
// };

// export const getLatestJobStatusHistoryByJobID = async (jobID: number | bigint) => {
//   const stmt = db.prepare(`
//     SELECT 
//       jsh.*,
//       s.name as status_name,
//       s.color as status_color
//     FROM job_status_history jsh
//     LEFT JOIN status s ON s.status_id = jsh.status_id
//     WHERE jsh.job_id = ?
//     ORDER BY jsh.created_at DESC
//     LIMIT 1
//   `);
//   const result = stmt.get(jobID) as JobStatusHistoryDetail;
//   return result;
// };
