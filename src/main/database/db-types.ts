// Database types based on schema

export interface Status {
  status_id?: number | bigint; // Auto-generated
  name: string;
  color?: string;
  created_at?: string;
}

export interface OfficeType {
  office_type_id?: number | bigint; // Auto-generated
  name: string;
  created_at?: string;
}

export interface Employer {
  employer_id?: number | bigint; // Auto-generated
  name: string;
  created_at?: string;
}

export interface ContactType {
  contact_type_id?: number | bigint; // Auto-generated
  name: string;
  created_at?: string;
}

export interface People {
  people_id?: number | bigint; // Auto-generated
  name: string;
  email?: string;
  phone?: string;
  url?: string;
  note?: string;
  created_at?: string;
  employer_id?: number | bigint;
  contact_type_id?: number | bigint;
}

export interface Job {
  job_id?: number | bigint; // Auto-generated
  title: string;
  location?: string;
  job_description?: string;
  link?: string;
  resume?: Blob;
  cover_letter?: Blob;
  created_at?: string;
  referrer_id?: number | bigint;
  office_type_id?: number | bigint;
  employer_id?: number | bigint;
}

export interface JobStatusHistory {
  history_id?: number | bigint; // Auto-generated
  note?: string;
  created_at?: string;
  job_id?: number | bigint;
  status_id?: number | bigint;
}

export interface Task {
  task_id?: number | bigint; // Auto-generated
  name: string;
  due_date?: string;
  completed?: number;
  note?: string;
  created_at?: string;
  job_id?: number | bigint;
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
export type CreateJob = Omit<Job, "job_id" | "employer_id"> & { employer_name: string; status_id: number | bigint; note?: string };
export type CreateJobStatusHistory = Omit<JobStatusHistory, "history_id">;
export type CreateTask = Omit<Task, "task_id">;

export type JobStatusHistoryDetail = JobStatusHistory & {
  status_name: string;
  status_color: string;
};

export type JobList = Omit<Job, "employer_id" | "office_type_id"> & {
  employer_name: string;
  status_name: string;
  status_color: string;
  office_type_name: string;
};

export type JobDetail = Omit<Job, "employer_id" | "office_type_id"> & {
  employer_name: string;
  office_type_name: string;
  status_history: JobStatusHistoryDetail[];
};
