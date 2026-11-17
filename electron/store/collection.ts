import { COLLECTIONS, type CollectionName, type FieldsOf } from "../../shared/collections";
import { createCollection, type Collection } from "./collectionCore";
import { readJson, removeJson, writeJson } from "./jsonStore";

export type { Collection };
export { createCollection };

const cache = new Map<CollectionName, Collection<unknown>>();

/** Lazily created, one per name; reads and writes `userData/<name>.json` as `{ version, items }`. */
export function collection<N extends CollectionName>(name: N): Collection<FieldsOf<N>> {
  let c = cache.get(name);
  if (!c) {
    const spec = COLLECTIONS[name];
    const file = `${spec.name}.json`;
    c = createCollection<unknown>(spec as { name: string; version: number; max: number; heal(raw: unknown): unknown }, {
      read: () => readJson(file, (raw) => raw),
      write: (envelope) => { writeJson(file, envelope); },
      remove: () => removeJson(file),
    });
    cache.set(name, c);
  }
  return c as Collection<FieldsOf<N>>;
}
