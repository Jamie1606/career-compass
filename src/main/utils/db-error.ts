export function parseSQLiteError(error: unknown): string {
  if (!(error instanceof Error)) return "Unexpected error occurred.";

  const code = (error as any).code;

  if (code === "SQLITE_CONSTRAINT_UNIQUE") {
    return "A record with this value already exists.";
  }

  return "Database error: " + error.message;
}
