import type { CollectionName } from "../../shared/collections";
import type { Settings } from "../../shared/settings";

/** Pure. `{ format: brand.packageName, version: 1, exportedAt, settings, collections }`; unknown collections ignored. */
export interface Bundle {
  format: string; version: number; exportedAt: string;
  settings: Settings; collections: Record<CollectionName, unknown[]>;
}
export function healBundle(_raw: unknown): Bundle | null { throw new Error("todo"); }
