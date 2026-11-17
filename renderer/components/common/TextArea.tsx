import type { TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> & {
  label: string; hideLabel?: boolean; value: string; onChange(v: string): void; mono?: boolean;
};

/** Placeholder until builder C restyles it. */
export function TextArea({ label, hideLabel, value, onChange, mono, className, ...rest }: Props) {
  return (
    <label className="text-area-wrap">
      <span className={hideLabel ? "visually-hidden" : "text-field-label"}>{label}</span>
      <textarea {...rest} className={`text-area ${mono ? "is-mono" : ""} ${className ?? ""}`}
        value={value} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
