import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SupportedLang, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './types';
import { detectUserLanguage, saveUserLanguage } from './detect';
import { translations, TranslationDictionary } from './translations';
import { getLocalizedQuestions, getLocalizedResultTier } from './quizData';
import { loadLocale } from './locales';
import { Question, QuizResultTier } from '../types';

interface LanguageContextValue {
  lang: SupportedLang;
  setLang: (newLang: SupportedLang) => void;
  t: TranslationDictionary;
  questions: Question[];
  getResultTier: (percentage: number) => QuizResultTier;
  supportedLanguages: typeof SUPPORTED_LANGUAGES;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<SupportedLang>(() => detectUserLanguage());

  const setLang = (newLang: SupportedLang) => {
    saveUserLanguage(newLang);
    // zh/ja/ko/es are fetched on demand; switch once the text has arrived
    loadLocale(newLang)
      .catch((err) => console.warn('Failed to load language', newLang, err))
      .finally(() => {
        setLangState(newLang);
        if (typeof document !== 'undefined') {
          document.documentElement.lang = newLang;
        }
      });
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = useMemo(() => {
    return (translations[lang] || translations[DEFAULT_LANGUAGE])!;
  }, [lang]);

  const questions = useMemo(() => {
    return getLocalizedQuestions(lang);
  }, [lang]);

  const getResultTier = (percentage: number) => {
    return getLocalizedResultTier(percentage, lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t,
        questions,
        getResultTier,
        supportedLanguages: SUPPORTED_LANGUAGES,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
};
