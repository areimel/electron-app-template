import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Button } from "../components/common/Button";
import { Dialog } from "../components/common/Dialog";
import type { ConfirmOptions } from "./ShellContext";

interface Pending { options: ConfirmOptions; resolve(ok: boolean): void }

/** A promise-based confirm dialog. `node` goes into the tree once; a second call cancels the first. */
export function useConfirm(): { confirm(o: ConfirmOptions): Promise<boolean>; open: boolean; node: ReactNode } {
  const [pending, setPending] = useState<Pending | null>(null);
  const current = useRef<Pending | null>(null);

  const settle = useCallback((ok: boolean) => {
    const p = current.current;
    current.current = null;
    setPending(null);
    p?.resolve(ok);
  }, []);

  const confirm = useCallback((options: ConfirmOptions) => new Promise<boolean>((resolve) => {
    current.current?.resolve(false);
    const p = { options, resolve };
    current.current = p;
    setPending(p);
  }), []);

  useEffect(() => () => current.current?.resolve(false), []);

  const o = pending?.options;
  const node = o && (
    <Dialog
      title={o.title} size="sm" onClose={() => settle(false)}
      footer={(
        <>
          <Button variant="quiet" onClick={() => settle(false)}>{o.cancelLabel ?? "Cancel"}</Button>
          <Button variant={o.danger ? "danger" : "primary"} onClick={() => settle(true)}>{o.confirmLabel}</Button>
        </>
      )}
    >
      {o.body && <p className="confirm-body">{o.body}</p>}
    </Dialog>
  );
  return { confirm, open: !!pending, node };
}
