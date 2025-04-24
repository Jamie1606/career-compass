import { CreateOfficeType, CreateStatus, OfficeType, Status } from "src/main/database/db-types";

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
  create: (newStatus: CreateStatus) => Promise<APIResponse<number>>;
  update: (name: string, color: string, statusID: number) => Promise<APIResponse<number>>;
  delete: (statusID: number) => Promise<APIResponse<number>>;
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<Status[]>>;
  getById: (statusID: number) => Promise<APIResponse<Status>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
  getAll: () => Promise<APIResponse<Status[]>>;
}

export interface IOfficeTypeAPI {
  create: (newOfficeType: CreateOfficeType) => Promise<APIResponse<number>>;
  update: (name: string, officeTypeID: number) => Promise<APIResponse<number>>;
  delete: (officeTypeID: number) => Promise<APIResponse<number>>;
  getList: (search: string, limit: number, offset: number) => Promise<APIResponse<OfficeType[]>>;
  getById: (officeTypeID: number) => Promise<APIResponse<OfficeType>>;
  getCount: (search: string) => Promise<APIResponse<number>>;
  getAll: () => Promise<APIResponse<OfficeType[]>>;
}

declare global {
  interface Window {
    StatusAPI: IStatusAPI;
    OfficeTypeAPI: IOfficeTypeAPI;
  }
}

export {};
