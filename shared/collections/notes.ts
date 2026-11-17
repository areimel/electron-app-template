import type { CollectionSpec, RecordBase } from "./base";

export interface NoteFields { title: string; body: string; pinned: boolean }  // title <= 200, body <= 100_000
export type Note = RecordBase & NoteFields;
export const notes: CollectionSpec<NoteFields> = {
  name: "notes", version: 1, max: 1000,
  heal: () => { throw new Error("todo"); },
};
