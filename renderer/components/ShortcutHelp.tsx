import { useEffect, useRef } from "react";
import { SHELL_COMMANDS, SHELL_GROUPS, keysOf } from "../../shared/commands";
import { Kbd } from "./common/Kbd";
import { Panel, PanelHeader } from "./common/Panel";
import { Button } from "./common/Button";

/** Modal overlay listing every command with keys, generated from SHELL_COMMANDS. */
export function ShortcutHelp({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.querySelector<HTMLElement>(".shortcut-help")?.focus(); }, []);

  const groups = SHELL_GROUPS
    .map((g) => ({ name: g as string, rows: SHELL_COMMANDS.filter((c) => c.group === g).map((c) => ({ label: c.label, keys: keysOf(c) })).filter((r) => r.keys.length) }))
    .filter((g) => g.rows.length);

  return (
    <div className="help-backdrop" ref={ref}>
      <Panel className="shortcut-help" role="dialog" aria-modal="true" aria-label="Keyboard shortcuts"
        tabIndex={-1} onDismiss={onClose} dismissOutside>
        <PanelHeader title="Keyboard shortcuts">
          <Button variant="link" onClick={onClose}>Close</Button>
        </PanelHeader>
        <div className="help-grid">
          {groups.map((g) => (
            <section key={g.name} className="help-group">
              <h3>{g.name}</h3>
              <ul>
                {g.rows.map((r) => (
                  <li key={r.label}><span>{r.label}</span><span className="help-keys">{r.keys.map((k) => <Kbd key={k} k={k} />)}</span></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Panel>
    </div>
  );
}
