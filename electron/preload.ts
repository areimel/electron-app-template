import { contextBridge, ipcRenderer, webUtils } from "electron";
import { isCommandId } from "../shared/commands";
import type { PlayerBridge } from "../shared/types";

function listen<T>(channel: string, cb: (v: T) => void): () => void {
  const handler = (_e: unknown, v: T) => cb(v);
  ipcRenderer.on(channel, handler);
  return () => ipcRenderer.removeListener(channel, handler);
}

// Dropped files are resolved to paths here, in the isolated preload world, from real File objects.
// The page never passes path strings for drops, so it cannot name arbitrary files. Anything that is
// not a genuine File (or has no backing path) is dropped. Nothing calls this until a feature needs drops.
export function droppedPaths(files: unknown): string[] {
  const out: string[] = [];
  if (!Array.isArray(files)) return out;
  for (let i = 0; i < files.length; i++) {
    const f: unknown = files[i];
    if (!(f instanceof File)) continue;
    const path = webUtils.getPathForFile(f);
    if (path) out.push(path);
  }
  return out;
}

const bridge: PlayerBridge = {
  platform: process.platform,
  onCommand: (cb) => listen<unknown>("menu:command", (id) => { if (isCommandId(id)) cb(id); }),
  getRecents: () => ipcRenderer.invoke("app:recents"),
  ready: () => ipcRenderer.send("app:ready"),
};

contextBridge.exposeInMainWorld("player", bridge);
