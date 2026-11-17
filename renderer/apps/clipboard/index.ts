import { lazy } from "react";
import type { AppDefinition } from "../types";

export const clipboard: AppDefinition = {
  id: "clipboard",
  name: "Clipboard",
  icon: "clipboard",
  summary: "System clipboard and saved snippets",
  component: lazy(() => import("./ClipboardApp")),
  commands: [],
};
