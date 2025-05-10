// import { ZodError } from "zod";
// import db from "./db";
// import { CreateJob, Job, JobDetail, JobList } from "./db-types";
// import { createEmployer, deleteEmployer, getEmployerByName } from "./employer";
// import { getStatusById } from "./status";
// import { getOfficeTypeById } from "./office-type";
// import { createJobStatusHistory, deleteJobStatusHistory, getJobStatusHistoryByJobID } from "./job-status-history";

// export const createJob = async (job: CreateJob) => {
//   try {
//     const employer = await getEmployerByName(job.employer_name);
//     let employerID: number | bigint;

//     if (!employer) {
//       employerID = await createEmployer({ name: job.employer_name });
//     } else {
//       employerID = employer.employer_id;
//     }

//     const status = await getStatusById(job.status_id);
//     const officeType = await getOfficeTypeById(job.office_type_id);

//     if (!status) {
//       throw new Error("Status not found");
//     }

//     if (!officeType) {
//       throw new Error("Office type not found");
//     }

//     const stmt = db.prepare("INSERT INTO job (title, location, job_description, link, resume, cover_letter, created_at, office_type_id, employer_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

//     const result = stmt.run(job.title, job.location, job.job_description, job.link, job.resume, job.cover_letter, job.created_at, job.office_type_id, employerID);

//     if (!result.lastInsertRowid) {
//       throw new Error("Failed to create job");
//     }

//     createJobStatusHistory({ job_id: result.lastInsertRowid, status_id: job.status_id, note: job.note });

//     return result.lastInsertRowid;
//   } catch (error) {
//     if (error instanceof ZodError) {
//       const firstError = error.errors[0]?.message;
//       throw new Error(firstError || "Invalid input.");
//     } else {
//       throw error;
//     }
//   }
// };

// export const deleteJob = async (jobID: number | bigint) => {
//   const stmt = db.prepare("SELECT employer_id FROM job WHERE job_id = ?");
//   const result = stmt.get(jobID) as { employer_id: number | bigint };

//   if (!result) {
//     throw new Error("Job not found");
//   }

//   deleteJobStatusHistory(jobID);

//   const stmt2 = db.prepare("DELETE FROM job WHERE job_id = ?");
//   const result2 = stmt2.run(jobID);

//   const stmt3 = db.prepare("SELECT COUNT(*) AS count FROM job WHERE employer_id = ?");
//   const result3 = stmt3.get(result.employer_id) as { count: number };

//   if (result3.count === 0) {
//     deleteEmployer(result.employer_id);
//   }

//   return result2.changes;
// };

// export const getJobList = async (search: string, limit: number, offset: number) => {
//   let query = `SELECT 
//         job.job_id, 
//         job.title, 
//         job.location, 
//         job.job_description, 
//         job.created_at, 
//         employer.name AS employer_name, 
//         office_type.name AS office_type_name, 
//         status.name AS status_name, 
//         status.color AS status_color
//       FROM job
//       JOIN employer ON job.employer_id = employer.employer_id
//       JOIN office_type ON job.office_type_id = office_type.office_type_id
//       LEFT JOIN (
//           SELECT jsh1.*
//           FROM job_status_history jsh1
//           INNER JOIN (
//               SELECT job_id, MAX(created_at) AS max_created
//               FROM job_status_history
//               GROUP BY job_id
//           ) jsh2 ON jsh1.job_id = jsh2.job_id AND jsh1.created_at = jsh2.max_created
//       ) AS latest_status ON job.job_id = latest_status.job_id
//       LEFT JOIN status ON latest_status.status_id = status.status_id`;

//   let params: any[] = [];

//   if (search) {
//     query += " WHERE title LIKE ?";
//     params.push(`%${search}%`);
//   }

//   query += " LIMIT ? OFFSET ?";
//   params.push(limit, offset);

//   const stmt = db.prepare(query);
//   const result = stmt.all(...params) as JobList[];
//   return result;
// };

// export const getJobCount = async (search: string) => {
//   let query = "SELECT COUNT(*) as count FROM job";
//   let params: any[] = [];

//   if (search) {
//     query += " WHERE title LIKE ?";
//     params.push(`%${search}%`);
//   }

//   const stmt = db.prepare(query);
//   const result = stmt.get(...params) as { count: number };
//   return result.count;
// };

// export const getJobById = async (jobID: number | bigint) => {
//   const sql = `
//     SELECT 
//       job.job_id, 
//       job.title, 
//       job.location, 
//       job.job_description, 
//       job.link,
//       job.resume,
//       job.cover_letter,
//       job.created_at, 
//       employer.name AS employer_name, 
//       office_type.name AS office_type_name
//     FROM job
//     JOIN employer ON job.employer_id = employer.employer_id
//     JOIN office_type ON job.office_type_id = office_type.office_type_id
//     WHERE job.job_id = ?
//   `;

//   const stmt = db.prepare(sql);
//   const result = stmt.get(jobID) as Omit<JobDetail, "status_history"> | undefined;

//   if (!result) {
//     throw new Error("Job not found");
//   }

//   const statusHistory = await getJobStatusHistoryByJobID(jobID);
//   return { ...result, status_history: statusHistory } as JobDetail | undefined;
// };
