import { describe, it, expect } from "vitest";
import { detectBrowserLanguage } from "./types";

function setNavigatorLanguage(lang: string) {
  Object.defineProperty(window.navigator, "language", {
    value: lang,
    configurable: true,
    writable: true,
  });
}

describe("detectBrowserLanguage", () => {
  it('returns "es" for navigator.language "es"', () => {
    setNavigatorLanguage("es");
    expect(detectBrowserLanguage()).toBe("es");
  });

  it('returns "es" for navigator.language "es-ES"', () => {
    setNavigatorLanguage("es-ES");
    expect(detectBrowserLanguage()).toBe("es");
  });

  it('returns "en" for navigator.language "en"', () => {
    setNavigatorLanguage("en");
    expect(detectBrowserLanguage()).toBe("en");
  });

  it('returns "en" for navigator.language "en-GB"', () => {
    setNavigatorLanguage("en-GB");
    expect(detectBrowserLanguage()).toBe("en");
  });

  it('returns "en" for fr (fallback to English)', () => {
    setNavigatorLanguage("fr");
    expect(detectBrowserLanguage()).toBe("en");
  });

  it('returns "en" for de (fallback to English)', () => {
    setNavigatorLanguage("de");
    expect(detectBrowserLanguage()).toBe("en");
  });

  it('returns "en" for it (fallback to English)', () => {
    setNavigatorLanguage("it");
    expect(detectBrowserLanguage()).toBe("en");
  });

  it('returns "en" for ru (fallback to English)', () => {
    setNavigatorLanguage("ru");
    expect(detectBrowserLanguage()).toBe("en");
  });

  it('returns "es" (default) for unsupported language "ja"', () => {
    setNavigatorLanguage("ja");
    expect(detectBrowserLanguage()).toBe("es");
  });

  it('returns "es" (default) for unsupported language "zh"', () => {
    setNavigatorLanguage("zh");
    expect(detectBrowserLanguage()).toBe("es");
  });
});
