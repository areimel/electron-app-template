import type { CollectionSpec, RecordBase, Removed } from "../../shared/collections/base";

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
/** Pure (no electron), tested. IO and events are layered on in collection.ts. */
export function createCollection<F>(_spec: CollectionSpec<F>): Collection<F> { throw new Error("todo"); }
