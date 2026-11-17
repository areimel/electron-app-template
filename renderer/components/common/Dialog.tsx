import type { ReactNode } from "react";

/** Placeholder: builder C adds focus trap, focus return and useDismiss. */
export function Dialog(p: { title: string; onClose(): void; children: ReactNode; footer?: ReactNode; size?: "sm" | "md" | "lg" }) {
  return (
    <div className="dialog-backdrop">
      <div className={`dialog dialog-${p.size ?? "md"}`} role="dialog" aria-modal="true" aria-label={p.title}>
        <div className="dialog-head">{p.title}</div>
        <div className="dialog-body">{p.children}</div>
        {p.footer && <div className="dialog-foot">{p.footer}</div>}
      </div>
    </div>
  );
}
