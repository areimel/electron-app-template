import { ipcMain } from "electron";
import { getRecents } from "./recents";

export function registerIpc(): void {
  ipcMain.handle("app:recents", () => getRecents());
}
