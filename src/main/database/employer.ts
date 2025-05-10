// import { ZodError } from "zod";
// import { newEmployerSchema } from "../zod-schema/employer";
// import db from "./db";
// import { CreateEmployer, Employer } from "./db-types";

// export const createEmployer = async (employer: CreateEmployer) => {
//   try {
//     const parsed = newEmployerSchema.parse(employer);
//     const stmt = db.prepare("INSERT INTO employer (name) VALUES (?)");
//     const result = stmt.run(parsed.name);

//     if (!result.lastInsertRowid) {
//       throw new Error("Failed to create employer");
//     }

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

// export const deleteEmployer = async (employerID: number| bigint) => {
//   const stmt = db.prepare("DELETE FROM employer WHERE employer_id = ?");
//   const result = stmt.run(employerID);
//   return result.changes;
// };

// export const getAllEmployers = async () => {
//   const stmt = db.prepare("SELECT * FROM employer");
//   const result = stmt.all();
//   return result as Employer[];
// };

// export const getEmployerById = async (employerId: number) => {
//   const stmt = db.prepare("SELECT * FROM employer WHERE employer_id = ?");
//   const result = stmt.get(employerId);
//   return result as Employer;
// };

// export const getEmployerByName = async (employerName: string) => {
//   const stmt = db.prepare("SELECT * FROM employer WHERE name = ?");
//   const result = stmt.get(employerName);
//   return result as Employer;
// };
