import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("EmployerAPI", {
  getAll: () => ipcRenderer.invoke("employer:getAll"),
});
