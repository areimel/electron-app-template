import { existsSync } from "node:fs";
import { basename } from "node:path";
import type { RecentView } from "../../shared/ipc/editor";
import { readJson, writeJson } from "../store/jsonStore";
import { displayFolder } from "./filesCore";
import { healRecents, recentId, withRecent, type RecentFile } from "./recentsShape";

const FILE = "recents.json";

const listeners = new Set<() => void>();
export function onRecentsChanged(cb: () => void): () => void {
  listeners.add(cb);
  return () => { listeners.delete(cb); };
}

function existing(): RecentFile[] {
  return readJson(FILE, healRecents).filter((r) => existsSync(r.path));
}

/** What the renderer may see: hashed id, file name, display-only folder. Never the path. */
export function listRecents(): RecentView[] {
  const home = process.env.HOME ?? process.env.USERPROFILE ?? "";
  return existing().map((r) => ({ id: recentId(r.path), name: r.name, folder: displayFolder(r.path, home) }));
}

export function recentPath(id: string): string | null {
  return existing().find((r) => recentId(r.path) === id)?.path ?? null;
}

export function addRecent(path: string): void {
  writeJson(FILE, withRecent(existing(), path, basename(path), Date.now()));
  for (const l of listeners) l();
}
