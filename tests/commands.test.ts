import { describe, expect, it } from "vitest";
import { COMMAND_ID, SHELL_COMMANDS, formatKey, goCommands, hint, keysOf, parseKey, toAccelerator } from "../shared/commands";

describe("commands table", () => {
  it("has unique ids that match COMMAND_ID", () => {
    const ids = SHELL_COMMANDS.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).toMatch(COMMAND_ID);
  });
  it("every key and accelerator parses and formats", () => {
    for (const c of SHELL_COMMANDS) {
      for (const k of keysOf(c)) {
        expect(parseKey(k).key.length).toBeGreaterThan(0);
        expect(formatKey(k, false)).not.toBe("");
        expect(toAccelerator(k)).toBeTruthy();
      }
    }
  });
});

describe("formatKey", () => {
  it("formats non-mac", () => {
    expect(formatKey("CmdOrCtrl+O", false)).toBe("Ctrl+O");
    expect(formatKey(" ", false)).toBe("Space");
    expect(formatKey("ArrowLeft", false)).toBe("←");
    expect(formatKey("Shift+E", false)).toBe("Shift+E");
    expect(formatKey("?", false)).toBe("?");
  });
  it("formats mac", () => {
    expect(formatKey("CmdOrCtrl+O", true)).toBe("⌘O");
    expect(formatKey("CmdOrCtrl+Shift+S", true)).toBe("⌘⇧S");
  });
});

describe("helpers", () => {
  it("hint prefers key then accelerator", () => {
    expect(hint({ id: "x.a", label: "Shortcuts", group: "G", keys: ["?"] }, false)).toBe("Shortcuts (?)");
    expect(hint({ id: "x.b", label: "Palette", group: "G", accelerator: "CmdOrCtrl+K" }, false)).toBe("Palette (Ctrl+K)");
  });
  it("goCommands numbers apps from 1", () => {
    const go = goCommands([{ id: "notes", name: "Notes" }, { id: "tasks", name: "Tasks" }]);
    expect(go.map((c) => c.id)).toEqual(["go.notes", "go.tasks"]);
    expect(go[1].accelerator).toBe("CmdOrCtrl+2");
  });
});
