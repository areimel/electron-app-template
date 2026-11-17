import { lazy } from "react";
import type { AppDefinition } from "../types";

export const tasks: AppDefinition = {
  id: "tasks",
  name: "Tasks",
  icon: "tasks",
  summary: "Checklist with filters, reordering and undo",
  component: lazy(() => import("./TasksApp")),
  commands: [],
};
