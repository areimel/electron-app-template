import type { CollectionName, FieldsOf, RecordOf } from "../../shared/collections";
import type { Removed } from "../../shared/collections/base";

/** Items update only from `data:changed`; mutations await the invoke. The one cast from AnyRecord lives here. */
export function useCollection<N extends CollectionName>(_name: N): {
  items: RecordOf<N>[]; status: "loading" | "ready" | "error"; error: string | null;
  create(input: Partial<FieldsOf<N>>): Promise<RecordOf<N>>;
  update(id: string, patch: Partial<FieldsOf<N>>): Promise<RecordOf<N>>;
  remove(id: string): Promise<Removed<RecordOf<N>>>;
  restore(removed: Removed<RecordOf<N>>): Promise<void>;
  reorder(ids: string[]): Promise<void>;
} {
  throw new Error("todo");
}
