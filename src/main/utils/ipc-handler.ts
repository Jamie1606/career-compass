import { parseSQLiteError } from "./db-error";

export function handleIPC<TArgs extends any[], TResult>(fn: (...args: TArgs) => Promise<TResult>) {
  return async (_event: Electron.IpcMainInvokeEvent, ...args: TArgs) => {
    try {
      const data = await fn(...args);
      return { success: true, data: data as TResult };
    } catch (error) {
      console.log(error);
      return { success: false, error: parseSQLiteError(error) };
    }
  };
}
