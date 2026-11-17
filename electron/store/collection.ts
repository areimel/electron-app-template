import type { CollectionName, FieldsOf } from "../../shared/collections";
import type { Collection } from "./collectionCore";

export type { Collection };
export { createCollection } from "./collectionCore";
/** Lazily created, one per name. */
export function collection<N extends CollectionName>(_name: N): Collection<FieldsOf<N>> { throw new Error("todo"); }
