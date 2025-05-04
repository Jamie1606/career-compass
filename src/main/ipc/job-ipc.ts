import { ipcMain } from "electron";
import { handleIPC } from "../utils/ipc-handler";
import { createJob, getJobCount, getJobList } from "../database/job";
import { deleteJob } from "../database/job";
import { getJobById } from "../database/job";

ipcMain.handle("job:create", handleIPC(createJob));
ipcMain.handle("job:delete", handleIPC(deleteJob));
ipcMain.handle("job:getList", handleIPC(getJobList));
ipcMain.handle("job:getCount", handleIPC(getJobCount));
ipcMain.handle("job:getById", handleIPC(getJobById));

export {};
