import { useCallback, useRef, useState } from "react";
import { ShortcutHelp } from "./components/ShortcutHelp";
import { ToastHost, useToasts } from "./components/common/Toast";
import { useFullscreen } from "./hooks/useFullscreen";
import { useShortcuts } from "./hooks/useShortcuts";
import { SHELL_COMMANDS } from "../shared/commands";
import { brand } from "../shared/brand";

// Placeholder: builder D replaces this with the shell (renderer/shell/*).
export function App() {
  const { items, dismiss } = useToasts();
  const rootRef = useRef<HTMLDivElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const fs = useFullscreen(rootRef);
  useShortcuts(SHELL_COMMANDS, {
    "shell.fullscreen": fs.toggle,
    "shell.shortcuts": useCallback(() => setHelpOpen((v) => !v), []),
  }, true);

  return (
    <div ref={rootRef} className="app">
      <h1 className="placeholder">{brand.name}</h1>
      {helpOpen && <ShortcutHelp onClose={() => setHelpOpen(false)} />}
      <ToastHost items={items} onDismiss={dismiss} />
    </div>
  );
}
