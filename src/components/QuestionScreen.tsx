import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, RotateCcw, Save } from 'lucide-react';
import { Question, Option } from '../types';
import { QuestionIllustration } from './QuestionIllustration';
import { sound } from '../utils/audio';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (option: Option) => void;
  onNext: () => void;
  onPrev: () => void;
  onReset?: () => void;
}

export const QuestionScreen: React.FC<Props> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onNext,
  onPrev,
  onReset,
}) => {
  const { t } = useLanguage();
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === totalQuestions - 1;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleOptionClick = (option: Option) => {
    sound.playSelect();
    onSelectOption(option);
  };

  const handleNextClick = () => {
    sound.playNext();
    onNext();
  };

  const handlePrevClick = () => {
    sound.playSelect();
    onPrev();
  };

  // Option pill colors for a playful LGBTQ+ palette
  const optionColors = {
    a: {
      badge: 'bg-rose-500 text-white',
      border: 'hover:border-rose-400',
      selected: 'bg-gradient-to-r from-rose-500/25 via-pink-500/20 to-purple-500/15 border-rose-500 shadow-rose-500/20',
    },
    b: {
      badge: 'bg-amber-500 text-slate-950 font-black',
      border: 'hover:border-amber-400',
      selected: 'bg-gradient-to-r from-amber-500/25 via-orange-500/20 to-pink-500/15 border-amber-500 shadow-amber-500/20',
    },
    c: {
      badge: 'bg-emerald-500 text-white',
      border: 'hover:border-emerald-400',
      selected: 'bg-gradient-to-r from-emerald-500/25 via-teal-500/20 to-cyan-500/15 border-emerald-500 shadow-emerald-500/20',
    },
    d: {
      badge: 'bg-violet-600 text-white',
      border: 'hover:border-violet-400',
      selected: 'bg-gradient-to-r from-violet-500/25 via-purple-500/20 to-pink-500/15 border-violet-500 shadow-violet-500/20',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
      {/* Top Progress & Stepper */}
      <div className="mb-4 sm:mb-6">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-300 to-cyan-300 flex items-center gap-1.5 text-sm sm:text-base">
            <span>
              {t.questionProgress} {currentIndex + 1} / {totalQuestions}
            </span>
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </span>
          <span className="font-mono font-bold tabular-nums text-pink-300 bg-pink-500/20 border border-pink-400/40 px-2.5 py-0.5 rounded-full">
            {progressPercent}%
          </span>
        </div>

        {/* Rainbow Progress Bar */}
        <div className="w-full h-3 rounded-full bg-slate-800/80 p-0.5 border border-white/10 overflow-hidden shadow-inner">
          <motion.div
            className="h-full rounded-full rainbow-bg animate-rainbow shadow-lg shadow-pink-500/50"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="space-y-3 sm:space-y-4"
        >
          <div className="grid gap-3 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">
            <div className="space-y-3">
              {/* Question Title Card */}
              <div className="space-y-1 p-2.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-900/30 via-pink-900/25 to-indigo-900/30 border border-pink-500/30 backdrop-blur-md shadow-lg">
                <h2 className="text-lg sm:text-xl font-black text-white leading-snug text-balance line-clamp-1 sm:line-clamp-none">
                  {question.title}
                </h2>
                <p className="hidden sm:flex text-xs sm:text-sm text-pink-200/90 items-center gap-1.5 font-medium">
                  <span className="text-yellow-300">💡</span> {question.hint}
                </p>
              </div>

              {/* Keep the visual as context without pushing answers below the fold. */}
              <div className="rounded-2xl md:overflow-visible">
                <QuestionIllustration question={question} />
              </div>
            </div>

            {/* Options Grid (4 Choices - STRICTLY NO SCORES DISPLAYED!) */}
            <div className="space-y-2 pt-0 md:pt-1">
            {question.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const style = optionColors[option.id];

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-2xl transition-all duration-200 border-2 cursor-pointer flex items-center justify-between gap-3 group relative overflow-hidden shadow-md active:scale-99 ${
                    isSelected
                      ? `${style.selected} shadow-lg ring-2 ring-pink-400/50`
                      : `bg-slate-900/70 hover:bg-slate-800/80 border-white/10 ${style.border} text-slate-100`
                  }`}
                  aria-pressed={isSelected}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Letter badge: a, b, c, d */}
                    <div
                      className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-black text-sm uppercase shrink-0 transition-transform group-hover:scale-105 shadow-md ${style.badge}`}
                    >
                      {option.id}
                    </div>

                    {/* Option Text strictly without any scores */}
                    <span className="text-sm sm:text-base leading-snug break-words font-semibold text-slate-100">
                      {option.text}
                    </span>
                  </div>

                  {/* Selected Indicator */}
                  <div className="shrink-0 pl-2">
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6 text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-white/20 group-hover:border-pink-400/60 transition-colors" />
                    )}
                  </div>
                </button>
              );
            })}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 sm:pt-3 -mt-2 sm:-mt-3 border-t border-pink-500/20">
            <div className="flex items-center justify-between w-full sm:w-auto gap-2">
              <button
                onClick={handlePrevClick}
                disabled={isFirst}
                className={`px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                  isFirst
                    ? 'opacity-30 border-white/5 text-slate-600 cursor-not-allowed'
                    : 'bg-white/10 hover:bg-white/15 border-white/20 text-slate-200 hover:text-white cursor-pointer active:scale-95'
                }`}
                aria-label={t.btnPrev}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.btnPrev}</span>
              </button>

              {onReset && (
                <button
                  onClick={() => {
                    sound.playSelect();
                    onReset();
                  }}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  title={t.restartQuiz}
                  aria-label={t.restartQuiz}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
                  <span>{t.restartQuiz}</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleNextClick}
                disabled={!selectedOptionId}
                className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-xs sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${
                  selectedOptionId
                    ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white cursor-pointer shadow-pink-500/30 active:scale-95 animate-rainbow'
                    : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
                }`}
                aria-label={isLast ? t.btnFinish : t.btnNext}
              >
                <span>{isLast ? t.btnFinish : t.btnNext}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
