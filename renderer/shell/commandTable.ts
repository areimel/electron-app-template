import type { CommandSpec } from "../../shared/commands";
import type { AppDefinition } from "../apps/types";

/** Pure: shell + go + active app commands. Feeds useShortcuts, the palette and ShortcutHelp. */
export function activeCommands(_app: AppDefinition | null, _apps: readonly AppDefinition[]): CommandSpec[] { throw new Error("todo"); }
