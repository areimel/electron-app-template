import { BrowserWindow, nativeTheme } from "electron";
import { SETTINGS_VERSION, defaultSettings, healSettings, healSettingsPatch, type Settings } from "../../shared/settings";
import { WINDOW_BG } from "../../shared/theme";
import { readJson, removeJson, writeJson } from "./jsonStore";

const FILE = "settings.json";
const listeners = new Set<(s: Settings) => void>();
let current: Settings | null = null;

export function getSettings(): Settings {
  current ??= readJson(FILE, healSettings);
  return current;
}

/** nativeTheme follows the mode (menus, dialogs, prefers-color-scheme); the window background follows the theme. */
export function applySettingsToNative(s: Settings = getSettings()): void {
  nativeTheme.themeSource = s.mode;
  const bg = WINDOW_BG[s.theme][nativeTheme.shouldUseDarkColors ? "dark" : "light"];
  for (const win of BrowserWindow.getAllWindows()) if (!win.isDestroyed()) win.setBackgroundColor(bg);
}

function notify(s: Settings): void {
  for (const cb of [...listeners]) {
    try { cb(s); } catch { /* one bad listener must not stop the others */ }
  }
}

/** `patch` is untrusted: unknown and invalid keys are dropped. */
export function updateSettings(patch: unknown): Settings {
  const prev = getSettings();
  const next = { ...prev, ...healSettingsPatch(patch) };
  if ((Object.keys(next) as (keyof Settings)[]).every((k) => next[k] === prev[k])) return prev;
  current = next;
  writeJson(FILE, { version: SETTINGS_VERSION, values: next });
  applySettingsToNative(next);
  notify(next);
  return next;
}

/** Data reset: back to defaults and the file removed. */
export function resetSettings(): Settings {
  try { removeJson(FILE); } catch { /* nothing to delete */ }
  current = defaultSettings();
  applySettingsToNative(current);
  notify(current);
  return current;
}

export function onSettingsChanged(cb: (s: Settings) => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}
