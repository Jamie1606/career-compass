import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: "file: ./career-compass.db",
  },
});
