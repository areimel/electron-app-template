import type { ReactNode } from "react";

export function Toolbar({ label, children }: { label: string; children: ReactNode }) {
  return <div className="toolbar" role="toolbar" aria-label={label}>{children}</div>;
}
