import { ipcMain } from "electron";
import { handleIPC } from "../utils/ipc-handler";
import { getAllEmployers } from "../database/models/employer";

ipcMain.handle("employer:getAll", handleIPC(getAllEmployers));

export {};
