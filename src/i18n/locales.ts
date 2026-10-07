import { SupportedLang } from './types';
import { translations } from './translations';
import { questionsI18n, resultTiersI18n } from './quizData';

// Thai and English ship in the main bundle (most visitors). Other languages are
// fetched on demand so they don't slow down the first paint for everyone else.
const loaders: Partial<Record<SupportedLang, () => Promise<typeof import('./locales/zh')>>> = {
  zh: () => import('./locales/zh'),
  ja: () => import('./locales/ja'),
  ko: () => import('./locales/ko'),
  es: () => import('./locales/es'),
};

export function isLocaleLoaded(lang: SupportedLang): boolean {
  return !!translations[lang];
}

export async function loadLocale(lang: SupportedLang): Promise<void> {
  if (isLocaleLoaded(lang)) return;
  const load = loaders[lang];
  if (!load) return;
  const mod = await load();
  translations[lang] = mod.translation;
  questionsI18n[lang] = mod.questions;
  resultTiersI18n[lang] = mod.tiers;
}
