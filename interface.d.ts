import { CreateJobStatusHistory, CreateOfficeType, CreateStatus, Employer, JobDetail, JobList, OfficeType, Status } from "src/main/database/db-types";

export type APISuccess<T> = {
  success: true;
  data: T;
};

export type APIError = {
  success: false;
  error: string;
};

export type APIResponse<T> = APISuccess<T> | APIError;

export interface IStatusAPI {
  create: (newStatus: CreateStatus) => Promise<APIResponse<number | bigint>>;
  update: (name: string, color: string, statusID: number | bigint) => Promise<APIResponse<number>>;
  delete: (statusID: number | bigint) => Promise<APIResponse<number>>;
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<Status[]>>;
  getById: (statusID: number | bigint) => Promise<APIResponse<Status>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
  getAll: () => Promise<APIResponse<Status[]>>;
}

export interface IOfficeTypeAPI {
  create: (newOfficeType: CreateOfficeType) => Promise<APIResponse<number | bigint>>;
  update: (name: string, officeTypeID: number | bigint) => Promise<APIResponse<number>>;
  delete: (officeTypeID: number | bigint) => Promise<APIResponse<number>>;
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<OfficeType[]>>;
  getById: (officeTypeID: number | bigint) => Promise<APIResponse<OfficeType>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
  getAll: () => Promise<APIResponse<OfficeType[]>>;
}

export interface IEmployerAPI {
  getAll: () => Promise<APIResponse<Employer[]>>;
}

export interface IJobAPI {
  create: (job: CreateJob) => Promise<APIResponse<number | bigint>>;
  delete: (jobID: number | bigint) => Promise<APIResponse<number>>;
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<JobList[]>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
  getById: (jobID: number | bigint) => Promise<APIResponse<JobDetail>>;
}

export interface IJobStatusHistoryAPI {
  create: (jobStatusHistory: CreateJobStatusHistory) => Promise<APIResponse<number | bigint>>;
}

declare global {
  interface Window {
    StatusAPI: IStatusAPI;
    OfficeTypeAPI: IOfficeTypeAPI;
    EmployerAPI: IEmployerAPI;
    JobAPI: IJobAPI;
    JobStatusHistoryAPI: IJobStatusHistoryAPI;
  }
}

export {};
