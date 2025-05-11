import { ipcMain } from "electron";
import { handleIPC } from "../utils/ipc-handler";
import { createOfficeType, deleteOfficeType, getAllOfficeType, getOfficeTypeById, getOfficeTypeCount, getOfficeTypeList, updateOfficeType } from "../database";

ipcMain.handle("officeType:create", handleIPC(createOfficeType));
ipcMain.handle("officeType:update", handleIPC(updateOfficeType));
ipcMain.handle("officeType:delete", handleIPC(deleteOfficeType));
ipcMain.handle("officeType:getById", handleIPC(getOfficeTypeById));
ipcMain.handle("officeType:getList", handleIPC(getOfficeTypeList));
ipcMain.handle("officeType:getCount", handleIPC(getOfficeTypeCount));
ipcMain.handle("officeType:getAll", handleIPC(getAllOfficeType));

export {};
