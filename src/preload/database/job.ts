import { contextBridge, ipcRenderer } from "electron";
import { CreateJob } from "../../main/database/db-types";

contextBridge.exposeInMainWorld("JobAPI", {
  create: (job: CreateJob) => ipcRenderer.invoke("job:create", job),
  getList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("job:getList", search, limit, offset),
  getCount: (search: string) => ipcRenderer.invoke("job:getCount", search),
});
