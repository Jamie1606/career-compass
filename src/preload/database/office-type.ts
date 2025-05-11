import { contextBridge, ipcRenderer } from "electron";
import { OfficeTypeInsert, OfficeTypeUpdate } from "src/zod-validation";

contextBridge.exposeInMainWorld("OfficeTypeAPI", {
  create: (newOfficeType: OfficeTypeInsert) => ipcRenderer.invoke("officeType:create", newOfficeType),
  update: (officeTypeUpdate: OfficeTypeUpdate) => ipcRenderer.invoke("officeType:update", officeTypeUpdate),
  delete: (officeTypeId: number) => ipcRenderer.invoke("officeType:delete", officeTypeId),
  getById: (officeTypeId: number) => ipcRenderer.invoke("officeType:getById", officeTypeId),
  getList: (search: string, limit: number, offset: number) => ipcRenderer.invoke("officeType:getList", search, limit, offset),
  getCount: (search: string) => ipcRenderer.invoke("officeType:getCount", search),
  getAll: () => ipcRenderer.invoke("officeType:getAll"),
});
