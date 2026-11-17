import type { Settings } from "../../shared/settings";

/** Module store over useSyncExternalStore; defaults until `settings:get` resolves. */
export function useSettings(): [Settings, (patch: Partial<Settings>) => Promise<void>] { throw new Error("todo"); }
export function useSetting<K extends keyof Settings>(_key: K): [Settings[K], (value: Settings[K]) => void] { throw new Error("todo"); }
