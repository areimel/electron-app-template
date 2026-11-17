/**
 * Single source of truth for user commands. Consumed by the renderer shortcut dispatcher, the native
 * menu, button tooltips and the shortcut-help overlay. Add a command here, then give it a handler.
 */
export type CommandGroup = "View";

export interface CommandSpec {
  id: string;
  label: string;
  group: CommandGroup;
  /** KeyboardEvent.key values handled in the renderer; optional "Shift+" prefix (e.g. "Shift+E", "?"). */
  keys?: string[];
  /** Electron accelerator for menu display/registration. */
  accelerator?: string;
  /** Shown in the native menu. Defaults to true. */
  menu?: boolean;
}

export const GROUP_ORDER: readonly CommandGroup[] = ["View"];

export const COMMANDS = [
  { id: "fullscreen", label: "Fullscreen", group: "View", keys: ["f"] },
  { id: "shortcuts", label: "Keyboard shortcuts", group: "View", keys: ["?"] },
] as const satisfies readonly CommandSpec[];

export type CommandId = (typeof COMMANDS)[number]["id"];

const byId = new Map<string, CommandSpec>(COMMANDS.map((c) => [c.id, c]));

export function isCommandId(x: unknown): x is CommandId {
  return typeof x === "string" && byId.has(x);
}

export function commandById(id: CommandId): CommandSpec {
  return byId.get(id)!;
}

const KEY_NAMES: Record<string, [string, string]> = {
  " ": ["Space", "Space"],
  ArrowLeft: ["←", "←"],
  ArrowRight: ["→", "→"],
  ArrowUp: ["↑", "↑"],
  ArrowDown: ["↓", "↓"],
};
const MODS: Record<string, [string, string]> = {
  CmdOrCtrl: ["Ctrl", "⌘"],
  Cmd: ["Ctrl", "⌘"],
  Ctrl: ["Ctrl", "⌃"],
  Shift: ["Shift", "⇧"],
  Alt: ["Alt", "⌥"],
};

/** Splits "CmdOrCtrl+Shift+O" / "Shift+E" / "+" into modifiers and the final key. */
export function parseKey(key: string): { mods: string[]; key: string } {
  const parts = key.length > 1 ? key.split("+") : [key];
  let last = parts.pop() ?? "";
  if (last === "" && parts.length) last = "+"; // trailing "+" key
  return { mods: parts.filter(Boolean), key: last };
}

/** Human label for a key or accelerator, e.g. "CmdOrCtrl+O" -> "Ctrl+O" / "⌘O". */
export function formatKey(key: string, mac: boolean): string {
  const i = mac ? 1 : 0;
  const p = parseKey(key);
  const main = KEY_NAMES[p.key]?.[i] ?? (p.key.length === 1 ? p.key.toUpperCase() : p.key);
  const mods = p.mods.map((m) => MODS[m]?.[i] ?? m);
  return mac ? [...mods, main].join("") : [...mods, main].join("+");
}

/** Tooltip text: "Play / Pause (Space)". Prefers the first key, else the accelerator. */
export function hint(id: CommandId, mac = false): string {
  const c = commandById(id);
  const k = c.keys?.[0] ?? c.accelerator;
  return k ? `${c.label} (${formatKey(k, mac)})` : c.label;
}

/** Converts a renderer key to an Electron accelerator, or undefined if it has no sensible form. */
export function toAccelerator(key: string): string | undefined {
  if (key === "?") return "Shift+/";
  const { mods, key: k } = parseKey(key);
  const map: Record<string, string> = { " ": "Space", ArrowLeft: "Left", ArrowRight: "Right", ArrowUp: "Up", ArrowDown: "Down" };
  const main = map[k] ?? (k.length === 1 ? k.toUpperCase() : k);
  return [...mods, main].join("+");
}
