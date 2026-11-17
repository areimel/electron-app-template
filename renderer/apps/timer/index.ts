import { lazy } from "react";
import type { AppDefinition } from "../types";

export const timer: AppDefinition = {
  id: "timer",
  name: "Timer",
  icon: "timer",
  summary: "Main-process timer with notifications and tray status",
  component: lazy(() => import("./TimerApp")),
  commands: [],
};
