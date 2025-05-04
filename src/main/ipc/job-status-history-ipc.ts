import { ipcMain } from "electron";
import { handleIPC } from "../utils/ipc-handler";
import { createJobStatusHistory } from "../database/job-status-history";

ipcMain.handle("job-status-history:create", handleIPC(createJobStatusHistory));

export {};
