// Export / import / reset of the whole bundle (save and open dialogs live here).
import { BrowserWindow, dialog } from "electron";
import { readFile, stat, writeFile } from "node:fs/promises";
import { brand } from "../../shared/brand";
import { COLLECTIONS, type CollectionName } from "../../shared/collections";
import { collection } from "./collection";
import { buildBundle, healBundle } from "./bundle";
import { getSettings, resetSettings, updateSettings } from "./settings";

const MAX_IMPORT_BYTES = 50 * 1024 * 1024;
const names = Object.keys(COLLECTIONS) as CollectionName[];
const FILTERS = [{ name: "JSON", extensions: ["json"] }];

export async function exportData(): Promise<{ saved: boolean }> {
  const parent = BrowserWindow.getFocusedWindow() ?? undefined;
  const options = {
    title: "Export data",
    defaultPath: `${brand.packageName}-data-${new Date().toISOString().slice(0, 10)}.json`,
    filters: FILTERS,
  };
  const { canceled, filePath } = parent ? await dialog.showSaveDialog(parent, options) : await dialog.showSaveDialog(options);
  if (canceled || !filePath) return { saved: false };
  const collections = Object.fromEntries(names.map((n) => [n, collection(n).list()])) as Record<CollectionName, unknown[]>;
  await writeFile(filePath, JSON.stringify(buildBundle(getSettings(), collections), null, 2));
  return { saved: true };
}

export async function importData(): Promise<{ imported: boolean; counts: Record<string, number> }> {
  const parent = BrowserWindow.getFocusedWindow() ?? undefined;
  const options = { title: "Import data", filters: FILTERS, properties: ["openFile" as const] };
  const { canceled, filePaths } = parent ? await dialog.showOpenDialog(parent, options) : await dialog.showOpenDialog(options);
  if (canceled || filePaths.length === 0) return { imported: false, counts: {} };
  const path = filePaths[0];
  if ((await stat(path)).size > MAX_IMPORT_BYTES) throw new Error("That file is too large to be an export from this app.");
  let raw: unknown;
  try { raw = JSON.parse(await readFile(path, "utf8")); } catch { raw = null; }
  const bundle = healBundle(raw);
  if (!bundle) throw new Error(`That file is not an export from ${brand.name}.`);
  const counts: Record<string, number> = {};
  for (const n of names) {
    collection(n).replaceAll(bundle.collections[n]);
    counts[n] = collection(n).list().length;
  }
  updateSettings(bundle.settings);
  return { imported: true, counts };
}

/** Deletes every collection and the settings; each change is pushed to the renderer by the listeners. */
export function resetData(): void {
  for (const n of names) collection(n).clear();
  resetSettings();
}
