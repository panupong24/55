import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  HeartHandshake,
  Eye,
  Flame,
  ShieldAlert,
  Share2,
  Play,
  RotateCcw,
} from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/audio';
import { PWAInstallButton } from './PWAInstallButton';
import { useLanguage } from '../i18n/LanguageContext';
import heroImage from '../assets/images/hero_rainbow_quiz_1790434208133.jpg';

interface Props {
  onStart: () => void;
  onOpenShare?: () => void;
  hasSavedProgress?: boolean;
  savedQuestionNumber?: number;
  onResume?: () => void;
  onReset?: () => void;
}

export const IntroScreen: React.FC<Props> = ({
  onStart,
  onOpenShare,
  hasSavedProgress,
  savedQuestionNumber = 1,
  onResume,
  onReset,
}) => {
  const { t } = useLanguage();
  const [heroFailed, setHeroFailed] = useState(false);

  const handleStart = () => {
    sound.playSelect();
    onStart();
  };

  const handleResume = () => {
    sound.playSelect();
    if (onResume) onResume();
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Hero Visual Asset */}
        <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border-2 border-pink-500/30 shadow-2xl shadow-purple-500/20 bg-slate-900 group">
          {!heroFailed ? (
            <img
              src={heroImage}
              alt="Rainbow Vibe Quiz Hero"
              referrerPolicy="no-referrer"
              onError={() => setHeroFailed(true)}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-pink-600 via-purple-600 to-indigo-700 flex items-center justify-center p-6 text-center">
              <div className="space-y-2">
                <span className="text-5xl">🌈✨</span>
                <p className="text-white font-bold text-2xl">{t.introTitle}</p>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xs font-bold shadow-md shadow-pink-500/30">
                <Sparkles className="w-3.5 h-3.5" /> {t.prideEdition} 🏳️‍🌈
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-yellow-300 text-xs font-bold">
                ✨ {t.introBadge}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight text-balance">
              {t.appName} 🌈
            </h1>
          </div>
        </div>

        {/* Introduction Prose */}
        <div className="space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed p-5 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20 backdrop-blur-md">
          <p>{t.introSubtitle}</p>
        </div>

        {/* Mandatory Friendly Disclaimer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border-2 border-amber-400/40 backdrop-blur-sm relative overflow-hidden shadow-lg shadow-amber-500/5">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black shrink-0 mt-0.5 shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <h3 className="font-bold text-amber-300 text-sm sm:text-base flex items-center gap-2">
                <span>Friendly Notice 💖</span>
              </h3>
              <p className="text-slate-200 leading-normal">
                {t.introDisclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-500/15 to-purple-600/10 border border-pink-500/30 flex items-center gap-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-pink-500 text-white shrink-0 shadow-md">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">{t.introQuestionCount}</p>
              <p className="text-pink-300 text-xs">{t.introEstimatedTime}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/15 to-indigo-600/10 border border-purple-500/30 flex items-center gap-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-purple-500 text-white shrink-0 shadow-md">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">{t.introFeaturePrivacy}</p>
              <p className="text-purple-300 text-xs">{t.introFeaturePrivacyDesc}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 to-teal-600/10 border border-emerald-500/30 flex items-center gap-3 shadow-sm">
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white shrink-0 shadow-md">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-white">{t.introInstantResult}</p>
              <p className="text-emerald-300 text-xs">{t.introFeatureStory}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Start Quiz + Share & QR + Install */}
        <div className="space-y-3 pt-2">
          {hasSavedProgress && onResume && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-pink-900/35 to-indigo-900/40 border-2 border-pink-400/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-400/40 flex items-center justify-center shrink-0 text-xl">
                  💾
                </div>
                <div>
                  <p className="font-black text-white text-sm sm:text-base">
                    {t.introSavedNotice}{' '}
                    <span className="font-bold text-yellow-300">{savedQuestionNumber}</span> / 15
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleResume}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 animate-rainbow"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>{t.introResumeBtn}</span>
                </button>
                {onReset && (
                  <button
                    onClick={() => {
                      sound.playSelect();
                      onReset();
                    }}
                    className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer active:scale-95"
                    title={t.restartQuiz}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.restartQuiz}</span>
                  </button>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleStart}
            className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 via-amber-400 to-purple-600 hover:opacity-95 text-white font-black text-base sm:text-xl shadow-xl shadow-pink-500/30 flex items-center justify-center gap-3 transition-all transform active:scale-98 cursor-pointer animate-rainbow"
          >
            <span>{t.introStartBtn}</span>
            <ArrowRight className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            {onOpenShare && (
              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenShare();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-pink-400/30 text-pink-200 hover:text-white text-xs sm:text-sm font-bold transition cursor-pointer active:scale-95"
              >
                <Share2 className="w-4 h-4 text-pink-400" />
                <span>{t.shareQuiz}</span>
              </button>
            )}

            <PWAInstallButton variant="prominent" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
