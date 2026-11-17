import type { HTMLAttributes, ReactNode } from "react";

export function List({ label, className, ...rest }: HTMLAttributes<HTMLUListElement> & { label: string }) {
  return <ul {...rest} className={`list ${className ?? ""}`.trim()} aria-label={label} />;
}

/** One row. The title is the button that selects it; leading, meta and trailing sit around it. */
export function ListRow(p: {
  selected?: boolean; onSelect?(): void; leading?: ReactNode; title: ReactNode; meta?: ReactNode; trailing?: ReactNode;
}) {
  return (
    <li className={`list-row ${p.selected ? "is-selected" : ""}`.trim()}>
      {p.leading && <span className="list-row-leading">{p.leading}</span>}
      <button type="button" className="list-row-title" aria-current={p.selected || undefined} onClick={p.onSelect}>
        <span className="list-row-text">{p.title}</span>
      </button>
      {p.meta && <span className="list-row-meta">{p.meta}</span>}
      {p.trailing && <span className="list-row-trailing">{p.trailing}</span>}
    </li>
  );
}
