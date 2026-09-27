import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLang } from '../i18n/types';
import { sound } from '../utils/audio';

export const LanguageSelector: React.FC = () => {
  const { lang, setLang, supportedLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLangObj =
    supportedLanguages.find((l) => l.code === lang) || supportedLanguages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLang = (code: SupportedLang) => {
    sound.playSelect();
    setLang(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => {
          sound.playSelect();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-full bg-white/10 hover:bg-white/15 border border-pink-400/30 text-white text-xs sm:text-sm font-semibold transition cursor-pointer active:scale-95 shadow-sm"
        aria-label={t.switchLanguage}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="text-sm leading-none">{currentLangObj.flag}</span>
        <span className="hidden xs:inline">{currentLangObj.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-pink-300 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-pink-500/40 shadow-2xl shadow-purple-950/60 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-pink-300/80 border-b border-white/10 flex items-center gap-1.5">
            <Globe className="w-3 h-3 text-pink-400" />
            <span>{t.switchLanguage}</span>
          </div>

          <div className="py-1">
            {supportedLanguages.map((item) => {
              const isSelected = item.code === lang;
              return (
                <button
                  key={item.code}
                  onClick={() => handleSelectLang(item.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs sm:text-sm transition cursor-pointer text-left ${
                    isSelected
                      ? 'bg-pink-600/25 text-pink-200 font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span>{item.nativeName}</span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-pink-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
