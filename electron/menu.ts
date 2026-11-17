import { Menu, app } from "electron";
import type { MenuContext } from "../shared/commands";
import { emit } from "./ipc/handle";
import { openLink, setAboutPanel } from "./features/links";
import { buildTemplate, sanitizeMenuContext } from "./menuTemplate";

// The native menu is generated: shell commands from shared/commands.ts, the Go menu and the active app's
// menu from the context the renderer sends with menu:set-context (validated in sanitizeMenuContext).
let context: MenuContext = { apps: [], app: null };
let built = false;

function rebuild(): void {
  Menu.setApplicationMenu(Menu.buildFromTemplate(buildTemplate({
    mac: process.platform === "darwin",
    dev: !app.isPackaged,
    context,
    send: (id) => emit("menu:command", id),
    openLink,
  })));
}

export function buildMenu(): void {
  if (!built) { built = true; setAboutPanel(); }
  rebuild();
}

/** menu:set-context. Throws on a malformed context; skips the rebuild when nothing changed. */
export function setMenuContext(raw: unknown): void {
  const next = sanitizeMenuContext(raw);
  if (JSON.stringify(next) === JSON.stringify(context)) return;
  context = next;
  rebuild();
}
