import { SupportedLang, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './types';

const STORAGE_LANG_KEY = 'rainbow_quiz_lang_v1';

export function detectUserLanguage(): SupportedLang {
  // 1. Check user choice in localStorage first
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const saved = localStorage.getItem(STORAGE_LANG_KEY) as SupportedLang | null;
      if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
        return saved;
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // 2. Check navigator.language / navigator.languages
  if (typeof navigator !== 'undefined') {
    const browserLangs = navigator.languages || [navigator.language || ''];
    for (const bLang of browserLangs) {
      if (!bLang) continue;
      const lower = bLang.toLowerCase();

      if (lower.startsWith('th')) return 'th';
      if (lower.startsWith('zh')) return 'zh';
      if (lower.startsWith('ja')) return 'ja';
      if (lower.startsWith('ko')) return 'ko';
      if (lower.startsWith('es')) return 'es';
      if (lower.startsWith('en')) return 'en';
    }
  }

  // 3. Fallback to English if user's language is not supported
  return DEFAULT_LANGUAGE;
}

export function saveUserLanguage(lang: SupportedLang): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // Ignore localStorage errors
    }
  }
}
