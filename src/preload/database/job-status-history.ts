import { contextBridge, ipcRenderer } from "electron";
import { CreateJobStatusHistory } from "src/main/database/db-types";

contextBridge.exposeInMainWorld("JobStatusHistoryAPI", {
  create: (jobStatusHistory: CreateJobStatusHistory) => ipcRenderer.invoke("job-status-history:create", jobStatusHistory),
});
