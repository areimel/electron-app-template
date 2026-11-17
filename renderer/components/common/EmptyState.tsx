import type { ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function EmptyState({ icon, title, body, action }: { icon?: IconName; title: string; body?: string; action?: ReactNode }) {
  return (
    <div className="empty-state">
      {icon && <Icon name={icon} size={32} />}
      <h2 className="empty-state-title">{title}</h2>
      {body && <p className="empty-state-body">{body}</p>}
      {action}
    </div>
  );
}
