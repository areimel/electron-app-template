import type { CollectionSpec, RecordBase } from "./base";

export interface SnippetFields { label: string; text: string }  // label <= 100, text <= 20_000
export type Snippet = RecordBase & SnippetFields;
export const snippets: CollectionSpec<SnippetFields> = {
  name: "snippets", version: 1, max: 200,
  heal: () => { throw new Error("todo"); },
};
