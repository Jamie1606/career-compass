// Database types based on schema

export interface Status {
  status_id?: number; // Auto-generated
  name: string;
  color?: string;
  created_at?: string;
}

export interface OfficeType {
  office_type_id?: number; // Auto-generated
  name: string;
  created_at?: string;
}

export interface Employer {
  employer_id?: number; // Auto-generated
  name: string;
  created_at?: string;
}

export interface ContactType {
  contact_type_id?: number; // Auto-generated
  name: string;
  created_at?: string;
}

export interface People {
  people_id?: number; // Auto-generated
  name: string;
  email?: string;
  phone?: string;
  url?: string;
  note?: string;
  created_at?: string;
  employer_id?: number;
  contact_type_id?: number;
}

export interface Job {
  job_id?: number; // Auto-generated
  location?: string;
  job_description?: string;
  link?: string;
  note?: string;
  resume?: Blob;
  cover_letter?: Blob;
  created_at?: string;
  referrer_id?: number;
  office_type_id?: number;
  employer_id?: number;
}

export interface JobStatusHistory {
  history_id?: number; // Auto-generated
  note?: string;
  created_at?: string;
  job_id?: number;
  status_id?: number;
}

export interface Task {
  task_id?: number; // Auto-generated
  name: string;
  due_date?: string;
  completed?: number;
  note?: string;
  created_at?: string;
  job_id?: number;
}

export interface Meta {
  key: string;
  value?: string;
}

// Types for creating new records (without auto-generated fields)
export type CreateStatus = Omit<Status, "status_id">;
export type CreateOfficeType = Omit<OfficeType, "office_type_id">;
export type CreateEmployer = Omit<Employer, "employer_id">;
export type CreateContactType = Omit<ContactType, "contact_type_id">;
export type CreatePeople = Omit<People, "people_id">;
export type CreateJob = Omit<Job, "job_id">;
export type CreateJobStatusHistory = Omit<JobStatusHistory, "history_id">;
export type CreateTask = Omit<Task, "task_id">;
