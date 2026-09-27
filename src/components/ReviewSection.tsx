import React, { useState, useEffect } from 'react';
import {
  Star,
  Send,
  MessageSquare,
  ShieldAlert,
  Sparkles,
  Check,
  User,
  HeartHandshake,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { feedbackService, Review } from '../services/feedbackService';
import { sound } from '../utils/audio';

interface Props {
  percentage: number;
  tierBadge?: string;
  onOpenReportModal: (commentTarget?: {
    id: string;
    comment: string;
    userName: string;
  }) => void;
}

export const ReviewSection: React.FC<Props> = ({
  percentage,
  tierBadge,
  onOpenReportModal,
}) => {
  const { t } = useLanguage();
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [userName, setUserName] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  useEffect(() => {
    // Subscribe to live reviews
    const unsubscribe = feedbackService.subscribeReviews((list) => {
      setReviews(list);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sound.playSelect();

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      setErrorMsg(t.reviewEmptyError);
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await feedbackService.submitReview({
        rating,
        comment: trimmedComment,
        userName: userName.trim() || t.defaultUserName,
        percentage,
        tierBadge,
      });

      if (res.success) {
        sound.playVictory();
        setComment('');
        setSuccessMsg(t.reviewSubmittedSuccess);
        setTimeout(() => setSuccessMsg(''), 4000);
      } else {
        setErrorMsg(res.error || t.reviewCooldownError);
      }
    } catch {
      setErrorMsg('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatRelativeTime = (timestamp: number) => {
    const elapsedSec = Math.floor((Date.now() - timestamp) / 1000);
    if (elapsedSec < 60) return 'เมื่อสักครู่ (Just now)';
    const elapsedMin = Math.floor(elapsedSec / 60);
    if (elapsedMin < 60) return `${elapsedMin}m ago`;
    const elapsedHour = Math.floor(elapsedMin / 60);
    if (elapsedHour < 24) return `${elapsedHour}h ago`;
    const elapsedDays = Math.floor(elapsedHour / 24);
    return `${elapsedDays}d ago`;
  };

  return (
    <div className="relative rounded-3xl overflow-hidden p-6 sm:p-8 bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-950 border-2 border-pink-500/30 shadow-2xl text-left space-y-6">
      {/* Glow backgrounds */}
      <div className="absolute top-0 right-1/4 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pink-500/20 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/40 text-pink-300 text-xs font-bold mb-2">
            <MessageSquare className="w-3.5 h-3.5 text-yellow-300" />
            <span>Community Vibe</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>{t.reviewSectionTitle}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {t.reviewSectionSubtitle}
          </p>
        </div>

        {reviews.length > 0 && (
          <div className="px-3.5 py-1.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-pink-300 font-bold shrink-0">
            {reviews.length} รีวิว
          </div>
        )}
      </div>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-white/10">
        {/* Star Rating Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-pink-200 block">
            {t.reviewRatingPrompt}
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => {
                  sound.playSelect();
                  setRating(star);
                }}
                className="p-1 rounded-lg hover:scale-110 active:scale-95 transition cursor-pointer"
                aria-label={`${star} star`}
              >
                <Star
                  className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                    (hoverRating || rating) >= star
                      ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]'
                      : 'text-slate-600 hover:text-slate-500'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-bold text-yellow-300 ml-2 font-mono">
              {rating}/5
            </span>
          </div>
        </div>

        {/* User Name Input (Optional) */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-pink-400" />
              <span>{t.reviewNamePlaceholder}</span>
            </label>
            <span className="text-slate-500 text-[11px]">
              {t.reviewNameOptional}
            </span>
          </div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value.slice(0, 30))}
            placeholder={t.defaultUserName}
            className="w-full rounded-xl bg-slate-900 px-3 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-white/10 focus:border-pink-500 outline-none transition"
          />
        </div>

        {/* Comment Textarea */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <label className="font-bold text-slate-300">
              ข้อความรีวิว:
            </label>
            <span className="text-slate-400 tabular-nums text-[11px]">
              {comment.length}/280 {t.reviewCommentLimit}
            </span>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 280))}
            placeholder={t.reviewCommentPlaceholder}
            rows={3}
            className="w-full rounded-xl bg-slate-900 p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 border border-white/10 focus:border-pink-500 outline-none transition resize-none"
            required
          />
        </div>

        {errorMsg && (
          <p className="text-xs text-rose-400 font-semibold">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>{successMsg}</span>
          </p>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-300" />
            <span>แสดงคะแนนของคุณ ({percentage}%) ในรีวิว</span>
          </span>

          <button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-500/25 transition cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? t.reviewSubmitting : t.btnSubmitReview}</span>
          </button>
        </div>
      </form>

      {/* Review List Section */}
      <div className="space-y-3 pt-2">
        <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
          <span>{t.reviewListTitle}</span>
        </h4>

        {reviews.length === 0 ? (
          <div className="text-center py-8 px-4 rounded-2xl bg-white/5 border border-dashed border-white/15 space-y-2">
            <HeartHandshake className="w-10 h-10 text-pink-400 mx-auto opacity-70" />
            <p className="text-xs sm:text-sm text-slate-300 font-semibold">
              {t.reviewEmptyList}
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-pink-500/30 transition text-left space-y-2"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-bold text-xs sm:text-sm text-white truncate">
                      {rev.userName}
                    </span>
                    {rev.percentage !== undefined && (
                      <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-[10px] font-black text-pink-300 font-mono">
                        {rev.percentage}%
                      </span>
                    )}
                    {rev.tierBadge && (
                      <span className="text-[10px] text-slate-400 hidden sm:inline">
                        · {rev.tierBadge}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-500 shrink-0">
                    {formatRelativeTime(rev.createdAt)}
                  </span>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-3.5 h-3.5 ${
                        s <= rev.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Comment Text */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed break-words">
                  {rev.comment}
                </p>

                {/* Report Comment Action */}
                <div className="flex items-center justify-end pt-1">
                  {rev.reported ? (
                    <span className="text-[11px] text-amber-400 font-semibold">
                      {t.commentReportedTag}
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        onOpenReportModal({
                          id: rev.id,
                          comment: rev.comment,
                          userName: rev.userName,
                        })
                      }
                      className="text-[11px] text-slate-400 hover:text-rose-400 flex items-center gap-1 transition cursor-pointer"
                      title={t.btnReportComment}
                    >
                      <ShieldAlert className="w-3 h-3" />
                      <span>{t.btnReportComment}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
