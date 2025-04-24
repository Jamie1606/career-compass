import { contextBridge, ipcRenderer } from "electron";
import { CreateOfficeType } from "../../main/database/db-types";

contextBridge.exposeInMainWorld("OfficeTypeAPI", {
  create: (newOfficeType: CreateOfficeType) => ipcRenderer.invoke("officeType:create", newOfficeType),
  update: (name: string, officeTypeID: number) => ipcRenderer.invoke("officeType:update", name, officeTypeID),
  delete: (officeTypeID: number) => ipcRenderer.invoke("officeType:delete", officeTypeID),
  getById: (officeTypeID: number) => ipcRenderer.invoke("officeType:getById", officeTypeID),
  getList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("officeType:getList", search, limit, offset),
  getCount: (search: string) => ipcRenderer.invoke("officeType:getCount", search),
  getAll: () => ipcRenderer.invoke("officeType:getAll"),
});
