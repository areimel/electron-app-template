import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { THEMES } from "../shared/theme";
import { accentIsHardToRead, normalizeHex, parseThemeTokens } from "../renderer/settings/themeTokens";

const css = (id: string) => readFileSync(new URL(`../renderer/theme/themes/${id}.css`, import.meta.url), "utf8");

describe("parseThemeTokens", () => {
  it("reads every semantic token for each theme and mode", () => {
    for (const t of THEMES) {
      for (const mode of ["light", "dark"]) {
        const tokens = parseThemeTokens(css(t.id), t.id, mode);
        for (const name of ["--bg", "--surface", "--text", "--text-muted", "--line", "--accent"]) {
          expect(tokens[name], `${t.id} ${mode} ${name}`).toMatch(/^#[0-9a-f]{6}$/i);
        }
      }
    }
  });
  it("keeps the two modes of a theme apart", () => {
    expect(parseThemeTokens(css("kraft"), "kraft", "light")["--bg"]).toBe("#efe6d6");
    expect(parseThemeTokens(css("kraft"), "kraft", "dark")["--bg"]).toBe("#2b2219");
  });
  it("is empty when the block is missing", () => {
    expect(parseThemeTokens(css("kraft"), "graphite", "light")).toEqual({});
    expect(parseThemeTokens("", "kraft", "light")).toEqual({});
  });
});

describe("normalizeHex", () => {
  it("accepts six and three digits, with or without #, in any case", () => {
    expect(normalizeHex("#3366CC")).toBe("#3366cc");
    expect(normalizeHex(" 3366cc ")).toBe("#3366cc");
    expect(normalizeHex("#36c")).toBe("#3366cc");
  });
  it("rejects everything else", () => {
    for (const bad of ["", "#", "#12", "#12345", "#1234567", "#gggggg", "red", "#33 66cc"]) expect(normalizeHex(bad)).toBeNull();
  });
});

describe("accentIsHardToRead", () => {
  it("warns below 4.5:1 on the surface", () => {
    expect(accentIsHardToRead("#ffff00", "#ffffff")).toBe(true);
    expect(accentIsHardToRead("#0b3d91", "#ffffff")).toBe(false);
  });
  it("does not warn on values it cannot read", () => {
    expect(accentIsHardToRead("nope", "#ffffff")).toBe(false);
    expect(accentIsHardToRead("#ffff00", "")).toBe(false);
  });
});
