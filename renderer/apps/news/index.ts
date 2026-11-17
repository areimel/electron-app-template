import { lazy } from "react";
import type { AppDefinition } from "../types";

export const news: AppDefinition = {
  id: "news",
  name: "News",
  icon: "news",
  summary: "Network fetch through main with cache and offline states",
  component: lazy(() => import("./NewsApp")),
  commands: [],
};
