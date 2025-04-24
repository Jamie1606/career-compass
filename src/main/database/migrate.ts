import db from "./db";
import path from "node:path";
import fs from "node:fs";

interface MetaRow {
  value: string;
}

function getCurrentSchemaVersion(): number {
  try {
    const row = db.prepare("SELECT value FROM meta WHERE key = 'schema_version'").get() as MetaRow | undefined;
    return row ? parseInt(row.value) : 0;
  } catch (error) {
    return 0;
  }
}

export function runMigrations() {
  const migrationDir = path.join(__dirname, "../../migrations");
  const migrationFiles = fs
    .readdirSync(migrationDir)
    .filter((file) => file.match(/^\d+_.*\.sql$/))
    .sort(); // ensure order like 001, 002...

  const currentVersion = getCurrentSchemaVersion();

  for (const file of migrationFiles) {
    const version = parseInt(file.split("_")[0]);

    if (version > currentVersion) {
      const fullPath = path.join(migrationDir, file);
      const sql = fs.readFileSync(fullPath, "utf-8");
      console.log(`Applying migration: ${file}`);
      db.exec(sql);
    }
  }
}
