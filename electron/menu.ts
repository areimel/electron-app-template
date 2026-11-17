import { app, Menu, type MenuItemConstructorOptions } from "electron";
import { COMMANDS, toAccelerator, type CommandGroup, type CommandSpec } from "../shared/commands";
import { getWindow } from "./window";
import { openLink, setAboutPanel } from "./links";

function send(id: string): void {
  getWindow()?.webContents.send("menu:command", id);
}

function item(c: CommandSpec): MenuItemConstructorOptions {
  const click = () => send(c.id);
  if (c.accelerator) return { label: c.label, accelerator: c.accelerator, click };
  // Plain keys are handled in the renderer; show them without letting the menu steal typing.
  const shown = c.keys?.[0] ? toAccelerator(c.keys[0]) : undefined;
  return shown
    ? { label: c.label, accelerator: shown, registerAccelerator: false, click }
    : { label: c.label, click };
}

function groupMenu(group: CommandGroup): MenuItemConstructorOptions[] {
  return COMMANDS.filter((c) => c.group === group && (c as CommandSpec).menu !== false).map(item);
}

function build(): void {
  const view: MenuItemConstructorOptions[] = groupMenu("View");
  if (!app.isPackaged) view.push({ type: "separator" }, { role: "toggleDevTools" });
  const template: MenuItemConstructorOptions[] = [
    { label: "File", submenu: [{ role: "quit" }] },
    { role: "editMenu" },
    { label: "View", submenu: view },
    { role: "windowMenu" },
    { label: "Help", submenu: [
      { label: "Keyboard shortcuts", accelerator: "Shift+/", registerAccelerator: false, click: () => send("shortcuts") },
      { type: "separator" },
      { label: "Website", click: () => openLink("website") },
      { label: "Report an Issue", click: () => openLink("issues") },
      { type: "separator" },
      { role: "about", label: "About Shader Video Player" },
    ] },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

let built = false;
export function buildMenu(): void {
  if (!built) { built = true; setAboutPanel(); }
  build();
}
