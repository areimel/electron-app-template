import type { CollectionName } from "../../shared/collections";
import type { Check } from "./handle";

const todo = (): never => { throw new Error("todo"); };
export const v: {
  none: (a: unknown[]) => [];
  args<T extends unknown[]>(...checks: { [K in keyof T]: Check<T[K]> }): (a: unknown[]) => T;
  string(o?: { min?: number; max?: number; pattern?: RegExp }): Check<string>;  // default max 10_000
  int(min: number, max: number): Check<number>;
  bool: Check<boolean>;
  oneOf<T extends string>(values: readonly T[]): Check<T>;
  nullable<T>(c: Check<T>): Check<T | null>;
  recordId: Check<string>;            // isRecordId
  collection: Check<CollectionName>;  // key of COLLECTIONS
  raw: Check<unknown>;                // only for payloads that go straight into a heal()
} = { none: todo, args: todo, string: todo, int: todo, bool: todo, oneOf: todo, nullable: todo, recordId: todo, collection: todo, raw: todo };
