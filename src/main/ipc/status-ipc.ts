import { ipcMain } from "electron";
import { createStatus, deleteStatus, getAllStatus, getStatusById, getStatusCount, getStatusList, updateStatus } from "../database/status";
import { handleIPC } from "../utils/ipc-handler";

ipcMain.handle("status:create", handleIPC(createStatus));
ipcMain.handle("status:update", handleIPC(updateStatus));
ipcMain.handle("status:delete", handleIPC(deleteStatus));
ipcMain.handle("status:getList", handleIPC(getStatusList));
ipcMain.handle("status:getById", handleIPC(getStatusById));
ipcMain.handle("status:getCount", handleIPC(getStatusCount));
ipcMain.handle("status:getAll", handleIPC(getAllStatus));

export {};
