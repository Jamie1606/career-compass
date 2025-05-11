import { contextBridge, ipcRenderer } from "electron";
import { StatusInsert, StatusUpdate } from "src/zod-validation";

contextBridge.exposeInMainWorld("StatusAPI", {
  create: (newStatus: StatusInsert) => ipcRenderer.invoke("status:create", newStatus),
  update: (statusUpdate: StatusUpdate) => ipcRenderer.invoke("status:update", statusUpdate),
  delete: (statusId: number) => ipcRenderer.invoke("status:delete", statusId),
  getList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("status:getList", search, limit, offset),
  getById: (statusId: number) => ipcRenderer.invoke("status:getById", statusId),
  getCount: (search: string) => ipcRenderer.invoke("status:getCount", search),
  getAll: () => ipcRenderer.invoke("status:getAll"),
});

export {};
