export type SupportedLang = 'th' | 'en' | 'zh' | 'ja' | 'ko' | 'es';

export interface LanguageInfo {
  code: SupportedLang;
  label: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'th', label: 'ไทย', nativeName: 'ภาษาไทย', flag: '🇹🇭' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'zh', label: '中文', nativeName: '简体中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ko', label: '한국어', nativeName: '한국어', flag: '🇰🇷' },
  { code: 'es', label: 'Español', nativeName: 'Español', flag: '🇪🇸' },
];

export const DEFAULT_LANGUAGE: SupportedLang = 'en';
