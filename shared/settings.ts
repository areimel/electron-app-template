import type { ThemeId } from "./theme";

export type ModeSetting = "system" | "light" | "dark";
export interface Settings {
  theme: ThemeId;            // from shared/theme.ts
  mode: ModeSetting;
  accent: string | null;     // ^#[0-9a-f]{6}$ override of --accent, null = theme accent
  closeToTray: boolean;      // default false
  notifications: boolean;    // default true
}
export const SETTINGS_VERSION = 1;               // file settings.json = { version, values }
export function defaultSettings(): Settings { throw new Error("todo"); }     // theme/mode from brand
export function healSettings(_raw: unknown): Settings { throw new Error("todo"); }
export function healSettingsPatch(_raw: unknown): Partial<Settings> { throw new Error("todo"); }  // drops unknown and invalid keys
