import { lazy } from "react";
import type { AppDefinition } from "../types";

export const notes: AppDefinition = {
  id: "notes",
  name: "Notes",
  icon: "notes",
  summary: "Records in a JSON collection: list, search, autosave",
  component: lazy(() => import("./NotesApp")),
  commands: [],
};
