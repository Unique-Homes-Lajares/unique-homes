import { describe, it, expect } from "vitest";
import { getTranslation } from "./index";
import type { Language } from "./types";

describe("getTranslation", () => {
  it("returns object with same keys as es for each Language", () => {
    const languages: Language[] = ["es", "en", "fr", "de", "it", "ru"];
    const es = getTranslation("es");
    const esKeys = Object.keys(es).sort();

    for (const lang of languages) {
      const t = getTranslation(lang);
      expect(Object.keys(t).sort()).toEqual(esKeys);
    }
  });

  it("returns English content for fr, de, it, ru (fallback)", () => {
    const en = getTranslation("en");
    expect(getTranslation("fr")).toEqual(en);
    expect(getTranslation("de")).toEqual(en);
    expect(getTranslation("it")).toEqual(en);
    expect(getTranslation("ru")).toEqual(en);
  });

  it("returns Spanish for es and English for en with content", () => {
    const es = getTranslation("es");
    const en = getTranslation("en");
    expect(es).toBeDefined();
    expect(en).toBeDefined();
    expect(Object.keys(es).length).toBeGreaterThan(0);
  });
});
