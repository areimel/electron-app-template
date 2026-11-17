import type { CollectionSpec, RecordBase } from "./base";

export interface TaskFields { title: string; done: boolean; due: string | null }  // title <= 500, due YYYY-MM-DD; order = array order
export type Task = RecordBase & TaskFields;
export const tasks: CollectionSpec<TaskFields> = {
  name: "tasks", version: 1, max: 2000,
  heal: () => { throw new Error("todo"); },
};
