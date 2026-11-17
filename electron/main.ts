import { app } from "electron";
import { registerIpc } from "./ipc/index";
import { buildMenu } from "./menu";
import { setPreventSleep } from "./features/powerSave";
import { setupDevCapture } from "./devCapture";
import { createWindow, getWindow } from "./window";

function shutdown(): void {
  setPreventSleep(false);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    const win = getWindow();
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });
  app.on("before-quit", shutdown);
  app.on("window-all-closed", () => app.quit());
  for (const sig of ["SIGINT", "SIGTERM"] as const) {
    process.on(sig, () => { shutdown(); app.exit(0); });
  }

  void app.whenReady().then(() => {
    registerIpc();
    const win = createWindow(() => undefined);
    setupDevCapture(win);
    buildMenu();
  });
}
