import type { TitleBlockModel } from "./shellModel";

/** The drawing title block: the one bold element, at the right end of the footer on every screen. */
export function TitleBlock({ model }: { model: TitleBlockModel }) {
  return (
    <aside className="title-block" aria-label="Sheet details">
      <span className="title-block-name">{model.name}</span>
      <span className="title-block-sheet">{model.sheet}</span>
      {model.count && <span className="title-block-count">{model.count}</span>}
      {model.state && (
        <span className={`title-block-state is-${model.state.tone}`} role="status">{model.state.label}</span>
      )}
    </aside>
  );
}
