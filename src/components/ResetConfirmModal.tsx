import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, X, Play } from 'lucide-react';
import { sound } from '../utils/audio';
import { useLanguage } from '../i18n/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  answeredCount: number;
  totalQuestions: number;
}

export const ResetConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  answeredCount,
  totalQuestions,
}) => {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md rounded-3xl bg-slate-900 border-2 border-pink-500/40 p-6 sm:p-7 shadow-2xl shadow-purple-500/20 text-slate-100 z-10 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500/20 to-purple-500/20 border border-pink-400/40 flex items-center justify-center mb-4 text-pink-400 shadow-md">
            <RotateCcw className="w-7 h-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white mb-2">
            {t.resetModalTitle}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {t.resetModalDesc}
          </p>

          {answeredCount > 0 && (
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-6 text-xs text-pink-200">
              {answeredCount}/{totalQuestions}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                sound.playSelect();
                onConfirm();
              }}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{t.resetModalConfirmBtn}</span>
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                onClose();
              }}
              className="w-full sm:flex-1 py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Play className="w-4 h-4 fill-slate-300" />
              <span>{t.resetModalCancelBtn}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
