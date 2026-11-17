import { Menu } from "electron";
import { SHELL_COMMANDS } from "../shared/commands";
import { getWindow } from "./window";
import { openLink, setAboutPanel } from "./features/links";

// Placeholder menu; builder E replaces it with the menu built from SHELL_COMMANDS, goCommands and menu:set-context.
function send(id: string): void {
  getWindow()?.webContents.send("menu:command", id);
}

let built = false;
export function buildMenu(): void {
  if (!built) { built = true; setAboutPanel(); }
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    { label: "File", submenu: [{ role: "quit" }] },
    { role: "editMenu" },
    { label: "View", submenu: SHELL_COMMANDS.filter((c) => c.group === "View").map((c) =>
      ({ label: c.label, accelerator: c.accelerator, click: () => send(c.id) })) },
    { role: "windowMenu" },
    { label: "Help", submenu: [{ label: "Website", click: () => openLink("website") }] },
  ]));
}
