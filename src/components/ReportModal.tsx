import React, { useState, useEffect } from 'react';
import {
  X,
  AlertTriangle,
  Bug,
  Languages,
  MessageSquareWarning,
  Lightbulb,
  Send,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { feedbackService, ReportIssue } from '../services/feedbackService';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  targetComment?: {
    id: string;
    comment: string;
    userName: string;
  } | null;
}

export const ReportModal: React.FC<Props> = ({
  isOpen,
  onClose,
  targetComment,
}) => {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<ReportIssue['category']>(
    targetComment ? 'inappropriate_comment' : 'bug',
  );
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (targetComment) {
        setCategory('inappropriate_comment');
      }
      setDetails('');
      setErrorMsg('');
      setIsSuccess(false);
    }
  }, [isOpen, targetComment]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();

    const trimmed = details.trim();
    if (!trimmed) {
      setErrorMsg(t.reportEmptyError);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await feedbackService.submitReport({
        category,
        details: trimmed,
        targetCommentId: targetComment?.id,
        targetCommentSnippet: targetComment?.comment.substring(0, 100),
        lang,
      });

      if (res.success) {
        sound.playVictory();
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setErrorMsg(res.error || 'Failed to submit report');
      }
    } catch {
      setErrorMsg('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { id: 'bug' as const, label: t.catBug, icon: Bug },
    { id: 'translation' as const, label: t.catTranslation, icon: Languages },
    {
      id: 'inappropriate_comment' as const,
      label: t.catInappropriateComment,
      icon: MessageSquareWarning,
    },
    { id: 'suggestion' as const, label: t.catSuggestion, icon: Lightbulb },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-slate-900 border-2 border-pink-500/40 shadow-2xl shadow-purple-500/30 text-slate-100 overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-pink-950/60 to-purple-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/20 border border-pink-400/40 text-pink-300">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight">
                {t.reportModalTitle}
              </h2>
              <p className="text-xs text-pink-200">{t.reportModalSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-white">
                {t.reportSubmittedSuccess}
              </h3>
              <p className="text-xs text-slate-300 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-pink-400" />
                <span>รายงานของคุณได้รับการบันทึกเรียบร้อย</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Linked Comment Banner if reporting a comment */}
              {targetComment && (
                <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300">
                    <MessageSquareWarning className="w-4 h-4" />
                    <span>{t.reportLinkedCommentBanner}</span>
                    <span className="text-slate-300">({targetComment.userName})</span>
                  </div>
                  <p className="text-slate-200 italic line-clamp-2 bg-black/30 p-2 rounded-xl">
                    “{targetComment.comment}”
                  </p>
                </div>
              )}

              {/* Category Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-pink-200">
                  {t.reportCategoryLabel}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        type="button"
                        key={cat.id}
                        onClick={() => {
                          sound.playSelect();
                          setCategory(cat.id);
                        }}
                        className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer text-left ${
                          isSelected
                            ? 'bg-pink-600/30 border-pink-400 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-pink-300' : 'text-slate-400'
                          }`}
                        />
                        <span className="line-clamp-1">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Textarea details */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-bold text-pink-200">
                    รายละเอียด (Details):
                  </label>
                  <span className="text-slate-400 tabular-nums">
                    {details.length}/500
                  </span>
                </div>
                <textarea
                  value={details}
                  onChange={(e) => setDetails(e.target.value.slice(0, 500))}
                  placeholder={t.reportDetailsPlaceholder}
                  rows={4}
                  className="w-full rounded-2xl bg-slate-950 p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-white/15 focus:border-pink-500 outline-none transition resize-none"
                  required
                />
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-bold transition cursor-pointer"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !details.trim()}
                  className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? t.reportSubmitting : t.btnSubmitReport}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
