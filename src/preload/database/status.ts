import { contextBridge, ipcRenderer } from "electron";
import { CreateStatus } from "../../main/database/db-types";

contextBridge.exposeInMainWorld("StatusAPI", {
  create: (newStatus: CreateStatus) => ipcRenderer.invoke("status:create", newStatus),
  update: (name: string, color: string, statusID: number) => ipcRenderer.invoke("status:update", name, color, statusID),
  delete: (statusID: number) => ipcRenderer.invoke("status:delete", statusID),
  getList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("status:getList", search, limit, offset),
  getById: (statusID: number) => ipcRenderer.invoke("status:getById", statusID),
  getCount: (search: string) => ipcRenderer.invoke("status:getCount", search),
  getAll: () => ipcRenderer.invoke("status:getAll"),
});

export {};
