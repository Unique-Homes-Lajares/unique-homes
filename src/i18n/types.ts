export type Language = "es" | "en" | "fr" | "de" | "it" | "ru";

export interface LanguageInfo {
  code: Language;
  label: string;
  nativeLabel: string;
  /** If true, this language shows English content */
  fallbackToEnglish?: boolean;
}

// All languages shown in UI selectors
// ES and EN have full translations, others show English content
export const LANGUAGES: LanguageInfo[] = [
  { code: "es", label: "Spanish", nativeLabel: "ES" },
  { code: "en", label: "English", nativeLabel: "EN" },
  { code: "fr", label: "French", nativeLabel: "FR", fallbackToEnglish: true },
  { code: "de", label: "German", nativeLabel: "DE", fallbackToEnglish: true },
  { code: "it", label: "Italian", nativeLabel: "IT", fallbackToEnglish: true },
  { code: "ru", label: "Russian", nativeLabel: "RU", fallbackToEnglish: true },
];

// Languages that fall back to English
const FALLBACK_TO_ENGLISH: string[] = ["fr", "de", "it", "ru"];

export const DEFAULT_LANGUAGE: Language = "es";

// Detect browser language and return supported language or default
// French, German, Italian, Russian browsers will see English version
export function detectBrowserLanguage(): Language {
  const browserLang = navigator.language.split("-")[0].toLowerCase();

  // If browser is FR/DE/IT/RU, show English
  if (FALLBACK_TO_ENGLISH.includes(browserLang)) {
    return "en";
  }

  const supported = LANGUAGES.find((l) => l.code === browserLang);
  return supported ? supported.code : DEFAULT_LANGUAGE;
}
