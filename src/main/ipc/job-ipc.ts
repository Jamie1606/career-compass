import { ipcMain } from "electron";
import { handleIPC } from "../utils/ipc-handler";
import { createJob, getJobCount, getJobList } from "../database/job";

ipcMain.handle("job:create", handleIPC(createJob));
ipcMain.handle("job:getList", handleIPC(getJobList));
ipcMain.handle("job:getCount", handleIPC(getJobCount));

export {};
