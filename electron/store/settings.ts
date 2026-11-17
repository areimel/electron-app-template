import type { Settings } from "../../shared/settings";

export function getSettings(): Settings { throw new Error("todo"); }
export function updateSettings(_patch: unknown): Settings { throw new Error("todo"); }
export function onSettingsChanged(_cb: (s: Settings) => void): () => void { throw new Error("todo"); }
