import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/main/database/schema.ts",
  dialect: "sqlite",
  out: "./drizzle",
  dbCredentials: {
    url: "./job-tracker.db",
  },
});
