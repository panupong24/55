import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'motion/react';
import { RotateCcw, Share2, Sparkles, Check, Trophy, Quote, QrCode, Copy } from 'lucide-react';
import { QuizResultTier } from '../types';
import { sound } from '../utils/audio';

interface Props {
  percentage: number;
  tier: QuizResultTier;
  onRestart: () => void;
  onOpenShare?: () => void;
}

export const ResultScreen: React.FC<Props> = ({
  percentage,
  tier,
  onRestart,
  onOpenShare,
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Play celebratory sound & rainbow confetti on mount
    sound.playVictory();

    try {
      // Fire double rainbow confetti burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ff2a6d', '#ff6200', '#ffea00', '#00e676', '#00b0ff', '#d500f9'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff2a6d', '#ff6200', '#ffea00', '#00e676', '#00b0ff', '#d500f9'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff2a6d', '#ff6200', '#ffea00', '#00e676', '#00b0ff', '#d500f9'],
        });
      }, 350);
    } catch {
      // Confetti fallback
    }

    // Number counting animation
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animateNumber = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(start + (percentage - start) * easeProgress);
      setAnimatedScore(currentVal);

      if (progress < 1) {
        requestAnimationFrame(animateNumber);
      }
    };

    requestAnimationFrame(animateNumber);
  }, [percentage]);

  const handleCopyShare = async () => {
    sound.playSelect();
    const currentUrl = typeof window !== 'undefined' ? window.location.origin + window.location.pathname : '';
    const shareText = `🌈 ฉันได้ผลลัพธ์ดีกรีตัวแม่ ${percentage}%: "${tier.title}"\n${tier.quote}\nมาลองวัดเปอร์เซ็นต์ความปังของคุณกัน! 👉 ${currentUrl}`;
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 sm:space-y-8"
      >
        {/* Main Result Card */}
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 bg-gradient-to-b from-purple-950/80 via-slate-900/90 to-slate-950 border-2 border-pink-500/40 shadow-2xl shadow-purple-500/25 text-center">
          {/* Subtle colorful rainbow background glows */}
          <div className="absolute -top-24 left-1/4 w-72 h-72 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-24 right-1/4 w-72 h-72 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none" />

          {/* Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-400/50 text-pink-200 text-xs sm:text-sm font-black mb-4 shadow-md">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="tracking-wide">🏳️‍🌈 {tier.badge}</span>
          </div>

          {/* Animated Percentage Display */}
          <div className="relative z-10 my-4 sm:my-6">
            <p className="text-xs uppercase tracking-widest text-pink-300 mb-1 font-bold">
              สรุปผลดีกรีความตัวแม่ของคุณ
            </p>
            <div className="flex items-baseline justify-center">
              <span className="text-6xl sm:text-8xl font-black rainbow-text font-display tabular-nums filter drop-shadow-[0_4px_12px_rgba(236,72,153,0.3)]">
                {animatedScore}
              </span>
              <span className="text-3xl sm:text-5xl font-extrabold text-yellow-300 ml-1 drop-shadow">
                %
              </span>
            </div>
          </div>

          {/* Tier Title */}
          <div className="relative z-10 max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-balance leading-tight">
              {tier.title}
            </h2>
            <p className="text-sm sm:text-base text-pink-200 font-semibold">
              ✨ {tier.tagline}
            </p>
          </div>

          {/* Quote Pill */}
          <div className="relative z-10 my-6 max-w-lg mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-400/30 text-slate-100 text-sm sm:text-base italic font-medium flex items-center justify-center gap-3 shadow-md">
            <Quote className="w-5 h-5 text-yellow-300 shrink-0" />
            <span>{tier.quote}</span>
          </div>

          {/* Detailed Description */}
          <div className="relative z-10 max-w-xl mx-auto text-xs sm:text-sm text-slate-200 leading-relaxed text-left bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-white/10 shadow-inner">
            <p>{tier.description}</p>
          </div>

          {/* Traits Meters with colorful badges */}
          <div className="relative z-10 mt-6 pt-6 border-t border-pink-500/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {tier.traits.map((trait, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-pink-500/40 transition-colors flex items-center justify-between"
              >
                <span className="text-xs text-slate-200 font-bold">{trait.label}</span>
                <span className="text-xs font-black text-yellow-300 font-mono bg-white/10 px-2 py-0.5 rounded-md border border-white/10">
                  {trait.level}
                </span>
              </div>
            ))}
          </div>

          {/* Friendly Advice */}
          <div className="relative z-10 mt-4 p-4 rounded-2xl bg-gradient-to-r from-purple-950/60 to-pink-950/60 border border-purple-400/30 text-xs sm:text-sm text-purple-200 text-left flex items-start gap-3 shadow-md">
            <Sparkles className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
            <p>
              <strong className="text-white font-bold">คำแนะนำประจำตัว:</strong> {tier.advice}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onOpenShare ? (
              <button
                onClick={() => {
                  sound.playSelect();
                  onOpenShare();
                }}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-pink-500/30 transition-all cursor-pointer active:scale-95 animate-rainbow"
              >
                <Share2 className="w-5 h-5" />
                <span>แชร์ผลลัพธ์ & เซฟการ์ดรูปภาพ 🌈</span>
              </button>
            ) : (
              <button
                onClick={handleCopyShare}
                className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-pink-500/30 transition-all cursor-pointer active:scale-95 animate-rainbow"
              >
                {copied ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                <span>{copied ? 'คัดลอกผลลัพธ์แล้ว! ส่งให้เพื่อนเลย 💖' : 'แชร์ผลลัพธ์ให้เพื่อนดู 🌈'}</span>
              </button>
            )}

            <button
              onClick={handleCopyShare}
              className="py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/15 border border-pink-400/30 text-slate-100 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
              title="คัดลอกข้อความสรุปผล"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">คัดลอกแล้ว!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-pink-400" />
                  <span>คัดลอกข้อความ</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                sound.playSelect();
                onRestart();
              }}
              className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-pink-400/30 text-slate-100 hover:text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shrink-0"
            >
              <RotateCcw className="w-4 h-4 text-pink-400" />
              <span>เล่นใหม่อีกครั้ง</span>
            </button>
          </div>
        </div>

        {/* Reassuring Friendly Disclaimer Reminder */}
        <div className="text-center text-xs text-slate-400 max-w-md mx-auto pt-2">
          <p>
            💖 ควิซนี้ทำขึ้นเพื่อความบันเทิงและรอยยิ้มระหว่างเพื่อนฝูงเท่านั้น ทุกคนมีความน่ารักและเป็นตัวเองในแบบที่ดีที่สุด! 🏳️‍🌈✨
          </p>
        </div>
      </motion.div>
    </div>
  );
};

