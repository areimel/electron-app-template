import { randomBytes } from "node:crypto";
import { isObject } from "../../shared/collections/heal";
import { isRecordId, type CollectionSpec, type RecordBase, type Removed } from "../../shared/collections/base";

export interface Collection<F> {
  list(): (RecordBase & F)[];
  get(id: string): (RecordBase & F) | undefined;
  create(input: unknown): RecordBase & F;
  update(id: string, patch: unknown): RecordBase & F;           // throws "Not found" for an unknown id
  remove(id: string): Removed<RecordBase & F>;
  restore(record: unknown, index: number): RecordBase & F;      // keeps id if valid and unused, else new id
  reorder(ids: string[]): void;                                 // must be a permutation of current ids
  replaceAll(items: unknown): void;                             // import; heals every item
  clear(): void;                                                // reset; deletes the file
  onChange(cb: (items: (RecordBase & F)[]) => void): () => void;
}

/** What the pure core needs from the outside. All optional, so tests run it in memory. */
export interface CollectionIo {
  read?: () => unknown;                                        // the parsed file, or undefined
  write?: (envelope: { version: number; items: unknown[] }) => void;
  remove?: () => void;
  now?: () => number;
  newId?: () => string;
}

const finite = (x: unknown): x is number => typeof x === "number" && Number.isFinite(x);

/** Pure (no electron), tested. IO and events are layered on in collection.ts. */
export function createCollection<F>(spec: CollectionSpec<F>, io: CollectionIo = {}): Collection<F> {
  type R = RecordBase & F;
  const now = io.now ?? Date.now;
  const newId = io.newId ?? (() => randomBytes(8).toString("hex"));
  const listeners = new Set<(items: R[]) => void>();

  const freshId = (used: Set<string>): string => {
    let id = newId();
    while (used.has(id)) id = newId();
    return id;
  };

  /** A stored or imported item to a record, or null when its fields are unusable. */
  function toRecord(raw: unknown, used: Set<string>): R | null {
    const fields = spec.heal(raw);
    if (fields === null || !isObject(raw)) return null;
    const id = isRecordId(raw.id) && !used.has(raw.id) ? raw.id : freshId(used);
    used.add(id);
    const t = now();
    return { ...fields, id, createdAt: finite(raw.createdAt) ? raw.createdAt : t, updatedAt: finite(raw.updatedAt) ? raw.updatedAt : t };
  }

  function healItems(raw: unknown): R[] {
    const used = new Set<string>();
    const out: R[] = [];
    if (!Array.isArray(raw)) return out;
    for (const item of raw) {
      if (out.length >= spec.max) break;
      const rec = toRecord(item, used);
      if (rec) out.push(rec);
    }
    return out;
  }

  /** `{version, items}`. A file from a newer version is not understood and reads as empty; anything damaged too. */
  function load(): R[] {
    let raw: unknown;
    try { raw = io.read?.(); } catch { raw = undefined; }
    if (!isObject(raw) || !finite(raw.version) || raw.version > spec.version) return [];
    return healItems(raw.items);
  }

  let items: R[] = load();

  function commit(next: R[], persist = true): void {
    items = next;
    if (persist) {
      try { io.write?.({ version: spec.version, items }); } catch { /* persistence is non-fatal */ }
    }
    const snapshot = items.slice();
    for (const cb of [...listeners]) {
      try { cb(snapshot); } catch { /* one bad listener must not stop the others */ }
    }
  }

  const indexOf = (id: string): number => items.findIndex((r) => r.id === id);
  const full = (): void => { if (items.length >= spec.max) throw new Error(`Limit reached: ${spec.max} ${spec.name}`); };
  const unusable = (): never => { throw new Error(`Invalid ${spec.name} record`); };

  return {
    list: () => items.slice(),
    get: (id) => items.find((r) => r.id === id),
    create(input) {
      full();
      const fields = spec.heal(input) ?? unusable();
      const t = now();
      const rec = { ...fields, id: freshId(new Set(items.map((r) => r.id))), createdAt: t, updatedAt: t } as R;
      commit([...items, rec]);
      return rec;
    },
    update(id, patch) {
      const i = indexOf(id);
      if (i < 0) throw new Error("Not found");
      if (!isObject(patch)) unusable();
      const { id: _id, createdAt, updatedAt: _u, ...current } = items[i] as RecordBase & Record<string, unknown>;
      const fields = spec.heal({ ...current, ...(patch as Record<string, unknown>) }) ?? unusable();
      const rec = { ...fields, id, createdAt, updatedAt: now() } as R;
      commit(items.map((r, j) => (j === i ? rec : r)));
      return rec;
    },
    remove(id) {
      const i = indexOf(id);
      if (i < 0) throw new Error("Not found");
      const record = items[i];
      commit(items.filter((_, j) => j !== i));
      return { record, index: i };
    },
    restore(record, index) {
      full();
      const rec = toRecord(record, new Set(items.map((r) => r.id))) ?? unusable();
      const at = Number.isInteger(index) ? Math.min(Math.max(index, 0), items.length) : items.length;
      commit([...items.slice(0, at), rec, ...items.slice(at)]);
      return rec;
    },
    reorder(ids) {
      const byId = new Map(items.map((r) => [r.id, r]));
      if (!Array.isArray(ids) || ids.length !== items.length || new Set(ids).size !== ids.length || !ids.every((id) => byId.has(id))) {
        throw new Error("Order must list every id exactly once");
      }
      commit(ids.map((id) => byId.get(id) as R));
    },
    replaceAll: (raw) => commit(healItems(raw)),
    clear() {
      try { io.remove?.(); } catch { /* the file may not exist */ }
      commit([], false);
    },
    onChange(cb) {
      listeners.add(cb);
      return () => { listeners.delete(cb); };
    },
  };
}
