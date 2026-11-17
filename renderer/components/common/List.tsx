import type { HTMLAttributes, ReactNode } from "react";

export function List({ label, className, ...rest }: HTMLAttributes<HTMLUListElement> & { label: string }) {
  return <ul {...rest} className={`list ${className ?? ""}`} aria-label={label} />;
}

export function ListRow(p: {
  selected?: boolean; onSelect?(): void; leading?: ReactNode; title: ReactNode; meta?: ReactNode; trailing?: ReactNode;
}) {
  return (
    <li className={`list-row ${p.selected ? "is-selected" : ""}`} aria-current={p.selected || undefined}>
      {p.leading && <span className="list-row-leading">{p.leading}</span>}
      <button type="button" className="list-row-title" onClick={p.onSelect}>{p.title}</button>
      {p.meta && <span className="list-row-meta">{p.meta}</span>}
      {p.trailing && <span className="list-row-trailing">{p.trailing}</span>}
    </li>
  );
}
