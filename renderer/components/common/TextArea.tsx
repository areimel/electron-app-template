import type { TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  label: string; hideLabel?: boolean; value: string; onChange(v: string): void; mono?: boolean;
};

/** A multi-line input with its label. `mono` is for the Editor only. */
export function TextArea({ label, hideLabel, value, onChange, mono, className, ...rest }: Props) {
  return (
    <label className="text-field text-area-wrap">
      <span className={hideLabel ? "visually-hidden" : "text-field-label"}>{label}</span>
      <textarea {...rest} className={`text-area ${mono ? "is-mono" : ""} ${className ?? ""}`.trim()}
        value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
