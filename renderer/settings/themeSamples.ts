import type { ResolvedMode, ThemeId } from "../../shared/theme";
import blueprint from "../theme/themes/blueprint.css?raw";
import graphite from "../theme/themes/graphite.css?raw";
import kraft from "../theme/themes/kraft.css?raw";
import { parseThemeTokens } from "./themeTokens";

const SOURCES: Record<ThemeId, string> = { blueprint, graphite, kraft };

/**
 * A theme's own token values, read from its stylesheet. The theme CSS is scoped to `<html>`, so a sample
 * inside the page cannot pick it up by attribute alone; setting these as inline custom properties makes
 * the sample render in that theme's real colours whichever theme is active.
 */
export function sampleTokens(theme: ThemeId, mode: ResolvedMode): Record<string, string> {
  return parseThemeTokens(SOURCES[theme], theme, mode);
}
