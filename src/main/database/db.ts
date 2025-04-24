import Database from "better-sqlite3";
import path from "node:path";
import { app } from "electron";

const db = new Database(path.join(app.getPath("userData"), "career-compass.db"));

export default db;
