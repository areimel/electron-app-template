import type { InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string; hideLabel?: boolean; value: string; onChange(v: string): void; onEnter?(): void;
  type?: "text" | "search" | "number";
};

/** A single-line input with its label. `hideLabel` keeps the label for assistive tech only. */
export function TextField({ label, hideLabel, value, onChange, onEnter, className, ...rest }: Props) {
  return (
    <label className={`text-field ${className ?? ""}`.trim()}>
      <span className={hideLabel ? "visually-hidden" : "text-field-label"}>{label}</span>
      <input {...rest} value={value} onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => { rest.onKeyDown?.(e); if (e.key === "Enter") onEnter?.(); }} />
    </label>
  );
}
