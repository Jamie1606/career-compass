import { ZodError } from "zod";
import { parseSQLiteError } from "./db-error";

export function handleIPC<TArgs extends any[], TResult>(fn: (...args: TArgs) => TResult) {
  return async (_event: Electron.IpcMainInvokeEvent, ...args: TArgs) => {
    try {
      const data = await fn(...args);
      return { success: true, data: data as TResult };
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        const firstError = error.errors[0]?.message;
        return { success: false, error: firstError || "Invalid input." };
      }
      return { success: false, error: parseSQLiteError(error) };
    }
  };
}
