import esTranslations from './translations/es.json';
import enTranslations from './translations/en.json';
import { Language } from './types';

// Type is derived from es.json - includes all translation keys
export type TranslationKeys = typeof esTranslations;

// All languages that fallback to English use enTranslations directly
const translations: Record<Language, TranslationKeys> = {
  es: esTranslations,
  en: enTranslations,
  fr: enTranslations,
  de: enTranslations,
  it: enTranslations,
  ru: enTranslations,
};

export function getTranslation(language: Language): TranslationKeys {
  // FR/DE/IT/RU fallback to English translations
  if (language === 'fr' || language === 'de' || language === 'it' || language === 'ru') {
    return translations.en;
  }
  return translations[language] || translations.es;
}

export { LANGUAGES, DEFAULT_LANGUAGE, detectBrowserLanguage } from './types';
export type { Language, LanguageInfo } from './types';
