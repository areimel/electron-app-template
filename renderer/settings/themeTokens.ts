import { contrastRatio, isHex } from "../theme/color";

/** Pure helpers for the Appearance section: reading a theme's tokens from its CSS, and checking an accent. */

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The custom properties declared for one theme and mode in a theme stylesheet
 * (`:root[data-theme="x"][data-mode="y"] { --bg: ...; }`). Empty when the block is not there.
 */
export function parseThemeTokens(css: string, theme: string, mode: string): Record<string, string> {
  const block = new RegExp(`:root\\[data-theme="${escape(theme)}"\\]\\[data-mode="${escape(mode)}"\\]\\s*\\{([^}]*)\\}`).exec(css);
  const out: Record<string, string> = {};
  if (!block) return out;
  for (const m of block[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) out[m[1]] = m[2].trim();
  return out;
}

/** "#3366CC", "3366cc" and "#36c" all give "#3366cc"; anything else gives null. */
export function normalizeHex(input: string): string | null {
  const t = input.trim().replace(/^#/, "");
  if (!/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(t)) return null;
  const full = t.length === 3 ? [...t].map((c) => c + c).join("") : t;
  return `#${full.toLowerCase()}`;
}

export const MIN_ACCENT_CONTRAST = 4.5;

/** True when the accent would be hard to read as text on the surface. False when either colour is not a hex. */
export function accentIsHardToRead(accent: string, surface: string): boolean {
  return isHex(accent) && isHex(surface) && contrastRatio(accent, surface) < MIN_ACCENT_CONTRAST;
}
