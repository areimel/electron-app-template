import { useCallback, useRef, useState } from "react";
import { ShortcutHelp } from "./components/ShortcutHelp";
import { ToastHost, useToasts } from "./components/common/Toast";
import { useFullscreen } from "./hooks/useFullscreen";
import { useMenuCommands, useShortcuts } from "./hooks/useShortcuts";

export function App() {
  const { items } = useToasts();
  const rootRef = useRef<HTMLDivElement>(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const fs = useFullscreen(rootRef);
  const commands = {
    fullscreen: fs.toggle,
    shortcuts: useCallback(() => setHelpOpen((v) => !v), []),
  };
  useShortcuts(true, commands);
  useMenuCommands(commands);

  return (
    <div ref={rootRef} className="app">
      <h1 className="placeholder">App template</h1>
      {helpOpen && <ShortcutHelp onClose={() => setHelpOpen(false)} />}
      <ToastHost items={items} />
    </div>
  );
}
