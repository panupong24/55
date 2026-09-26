import React, { useState, useEffect, useRef, useCallback } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Share2,
  Copy,
  Check,
  QrCode,
  Download,
  Sparkles,
  ExternalLink,
  RotateCw,
} from 'lucide-react';
import { QuizResultTier } from '../types';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  percentage?: number;
  tier?: QuizResultTier;
  initialTab?: 'social' | 'qr' | 'card';
}

// Robust text wrapping helper for canvas with Thai language word segmentation
function wrapThaiText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  let segments: string[];
  try {
    if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
      const segmenter = new (Intl as any).Segmenter('th', { granularity: 'word' });
      segments = Array.from(segmenter.segment(text), (s: any) => s.segment);
    } else {
      segments = text.includes(' ') ? text.split(' ') : text.split('');
    }
  } catch {
    segments = text.includes(' ') ? text.split(' ') : text.split('');
  }

  const lines: string[] = [];
  let currentLine = '';

  for (const seg of segments) {
    const testLine = currentLine + seg;
    if (ctx.measureText(testLine).width > maxWidth && currentLine) {
      lines.push(currentLine.trim());
      currentLine = seg;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }
  return lines;
}

export const ShareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  percentage,
  tier,
  initialTab = 'social',
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'social' | 'qr' | 'card'>(initialTab);
  const [generatingCard, setGeneratingCard] = useState(false);
  const [cardDataUrl, setCardDataUrl] = useState<string>('');
  const generatedKeyRef = useRef<string>('');

  // Update tab whenever initialTab or isOpen changes
  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return 'https://www.gaykub.online/';
  };

  const currentUrl = getShareUrl();

  const shareTitle =
    percentage !== undefined && tier
      ? `🌈 ฉันได้ผลลัพธ์ดีกรีตัวแม่ ${percentage}%: "${tier.title}" (${tier.badge}) | แบบทดสอบ Rainbow Vibe Quiz`
      : `🌈 Rainbow Vibe Quiz — แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ`;

  const shareDescription =
    tier?.quote || 'มาลองวัดเปอร์เซ็นต์ความตัวแม่สายรุ้งของคุณกัน!';

  // Generate QR Code
  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(currentUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error(err));
    }
  }, [isOpen, currentUrl]);

  // Generate Image Card for Social Stories using REAL result props
  const generateShareCard = useCallback(async () => {
    setGeneratingCard(true);

    try {
      // Ensure Google fonts (Prompt, Noto Sans Thai) are completely loaded
      if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920; // 9:16 Instagram Story / Phone Wallpaper aspect
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setGeneratingCard(false);
        return;
      }

      // 1. Deep Space Pride Background
      const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1920);
      bgGradient.addColorStop(0, '#090d16');
      bgGradient.addColorStop(0.25, '#170d2b');
      bgGradient.addColorStop(0.6, '#280840');
      bgGradient.addColorStop(1, '#030712');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Radial Glowing Orbs
      const drawOrb = (x: number, y: number, r: number, color: string) => {
        const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
        radGrad.addColorStop(0, color);
        radGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      };

      drawOrb(200, 260, 420, 'rgba(236, 72, 153, 0.35)');
      drawOrb(880, 480, 480, 'rgba(168, 85, 247, 0.35)');
      drawOrb(540, 1100, 520, 'rgba(59, 130, 246, 0.22)');
      drawOrb(540, 1680, 450, 'rgba(234, 179, 8, 0.2)');

      // 3. Rainbow Color Bar Gradient
      const rainbowGrad = ctx.createLinearGradient(120, 0, 960, 0);
      rainbowGrad.addColorStop(0, '#ff2a6d');
      rainbowGrad.addColorStop(0.2, '#ff6200');
      rainbowGrad.addColorStop(0.4, '#ffea00');
      rainbowGrad.addColorStop(0.6, '#00e676');
      rainbowGrad.addColorStop(0.8, '#00b0ff');
      rainbowGrad.addColorStop(1, '#d500f9');

      // 4. Main Card Container (Rounded Rectangle)
      const cardX = 60;
      const cardY = 70;
      const cardW = 960;
      const cardH = 1780;
      const radius = 56;

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX, cardY, cardW, cardH, radius);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.90)';
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(244, 114, 182, 0.65)';
      ctx.stroke();
      ctx.restore();

      // Subtle Rainbow Border Accent at Top
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX + 6, cardY + 6, cardW - 12, 16, [radius - 4, radius - 4, 0, 0]);
      ctx.fillStyle = rainbowGrad;
      ctx.fill();
      ctx.restore();

      // 5. App Branding Header
      ctx.textAlign = 'center';
      ctx.fillStyle = '#f472b6';
      ctx.font = 'bold 34px "Prompt", sans-serif';
      ctx.fillText('🌈 RAINBOW VIBE QUIZ 🏳️‍🌈', 540, 160);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '24px "Prompt", sans-serif';
      ctx.fillText('แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ', 540, 205);

      // 6. Score Badge Pill
      const badgeText = tier?.badge ? `🏳️‍🌈 ${tier.badge} 🏳️‍🌈` : '✨ RAINBOW VIBE ✨';
      ctx.save();
      ctx.font = 'bold 28px "Prompt", sans-serif';
      const textWidth = ctx.measureText(badgeText).width;
      const pillW = Math.max(textWidth + 70, 320);
      const pillH = 62;
      const pillX = 540 - pillW / 2;
      const pillY = 250;

      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillW, pillH, 31);
      ctx.fillStyle = 'rgba(236, 72, 153, 0.22)';
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f472b6';
      ctx.stroke();

      ctx.fillStyle = '#fce7f3';
      ctx.fillText(badgeText, 540, 292);
      ctx.restore();

      // 7. Large Percentage Display (Strictly uses actual player score)
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fb7185';
      ctx.font = 'bold 26px "Prompt", sans-serif';
      ctx.fillText('สรุปผลดีกรีความตัวแม่ของคุณ', 540, 360);

      ctx.save();
      ctx.font = '900 150px "Prompt", sans-serif';
      ctx.fillStyle = rainbowGrad;
      const displayScore = percentage !== undefined ? `${percentage}%` : '100%';
      ctx.fillText(displayScore, 540, 500);
      ctx.restore();

      // 8. Tier Title (Wrapped with Thai word segmentation)
      const tierTitle = tier?.title || 'ตัวแม่สายรุ้งตัวจริงเสียงจริง';
      ctx.font = 'bold 44px "Prompt", sans-serif';
      ctx.fillStyle = '#ffffff';
      const titleLines = wrapThaiText(ctx, tierTitle, 860);
      let currentY = 570;
      for (const line of titleLines.slice(0, 2)) {
        ctx.fillText(line, 540, currentY);
        currentY += 54;
      }

      // 9. Tagline
      if (tier?.tagline) {
        ctx.fillStyle = '#fbcfe8';
        ctx.font = '600 25px "Prompt", sans-serif';
        const taglineLines = wrapThaiText(ctx, `✨ ${tier.tagline}`, 860);
        for (const line of taglineLines.slice(0, 2)) {
          ctx.fillText(line, 540, currentY);
          currentY += 36;
        }
      }

      currentY += 10;

      // 10. Quote Box
      if (tier?.quote) {
        ctx.save();
        const quoteW = 860;
        const quoteX = 540 - quoteW / 2;
        ctx.font = 'italic 25px "Prompt", sans-serif';
        const quoteLines = wrapThaiText(ctx, `“${tier.quote}”`, quoteW - 60);
        const quoteH = Math.max(86, quoteLines.length * 36 + 32);

        ctx.beginPath();
        ctx.roundRect(quoteX, currentY, quoteW, quoteH, 22);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(253, 224, 71, 0.45)';
        ctx.stroke();

        ctx.fillStyle = '#fef08a';
        let qTextY = currentY + (quoteH - quoteLines.length * 34) / 2 + 24;
        for (const qLine of quoteLines) {
          ctx.fillText(qLine, 540, qTextY);
          qTextY += 34;
        }
        ctx.restore();
        currentY += quoteH + 20;
      }

      // 11. Description Box
      if (tier?.description) {
        ctx.save();
        const descW = 860;
        const descX = 540 - descW / 2;
        ctx.font = '22px "Prompt", sans-serif';
        const descLines = wrapThaiText(ctx, tier.description, descW - 50);
        const descH = Math.min(170, descLines.length * 32 + 30);

        ctx.beginPath();
        ctx.roundRect(descX, currentY, descW, descH, 22);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#e2e8f0';
        let dTextY = currentY + 34;
        for (const dLine of descLines.slice(0, 4)) {
          ctx.fillText(dLine, descX + 26, dTextY);
          dTextY += 32;
        }
        ctx.restore();
        currentY += descH + 20;
      }

      // 12. Traits Meters
      if (tier?.traits && tier.traits.length > 0) {
        ctx.textAlign = 'left';
        ctx.fillStyle = '#f472b6';
        ctx.font = 'bold 22px "Prompt", sans-serif';
        ctx.fillText('📊 ระดับทักษะความตัวแม่:', 110, currentY + 20);
        currentY += 32;

        const traitW = 860;
        const traitX = 540 - traitW / 2;
        tier.traits.slice(0, 4).forEach((trait) => {
          const itemH = 50;
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.beginPath();
          ctx.roundRect(traitX, currentY, traitW, itemH, 14);
          ctx.fill();

          ctx.textAlign = 'left';
          ctx.fillStyle = '#f1f5f9';
          ctx.font = 'bold 22px "Prompt", sans-serif';
          ctx.fillText(trait.label, traitX + 20, currentY + 33);

          ctx.textAlign = 'right';
          ctx.fillStyle = '#fde047';
          ctx.font = '900 22px monospace';
          ctx.fillText(trait.level, traitX + traitW - 20, currentY + 33);

          currentY += itemH + 10;
        });
        currentY += 10;
      }

      // 13. Advice Box
      if (tier?.advice) {
        ctx.save();
        const advW = 860;
        const advX = 540 - advW / 2;
        ctx.font = '22px "Prompt", sans-serif';
        const advLines = wrapThaiText(ctx, `💡 คำแนะนำประจำตัว: ${tier.advice}`, advW - 50);
        const advH = Math.min(130, advLines.length * 32 + 30);

        ctx.beginPath();
        ctx.roundRect(advX, currentY, advW, advH, 20);
        ctx.fillStyle = 'rgba(147, 51, 234, 0.18)';
        ctx.fill();
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(192, 132, 252, 0.4)';
        ctx.stroke();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#f3e8ff';
        let advTextY = currentY + 34;
        for (const aLine of advLines.slice(0, 3)) {
          ctx.fillText(aLine, advX + 26, advTextY);
          advTextY += 32;
        }
        ctx.restore();
      }

      // 14. Footer with Call to Action and URL
      const footerY = 1660;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 26px "Prompt", sans-serif';
      ctx.fillText('🔗 เล่นและแชร์ได้ที่: https://www.gaykub.online', 540, footerY);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '20px "Prompt", sans-serif';
      ctx.fillText('สแกนหรือคลิกเล่นเพื่อวัดดีกรีความตัวแม่ของคุณ!', 540, footerY + 36);

      const dataUrl = canvas.toDataURL('image/png');
      setCardDataUrl(dataUrl);
      generatedKeyRef.current = `${percentage ?? 'na'}_${tier?.title ?? 'na'}`;
    } catch (err) {
      console.error('Error generating card image:', err);
    } finally {
      setGeneratingCard(false);
    }
  }, [percentage, tier]);

  // Synchronize card data URL whenever props change or tab is switched to 'card'
  useEffect(() => {
    if (!isOpen) return;

    const currentKey = `${percentage ?? 'na'}_${tier?.title ?? 'na'}`;
    const needsRegen = generatedKeyRef.current !== currentKey;

    if (activeTab === 'card' && (needsRegen || !cardDataUrl)) {
      generateShareCard();
    }
  }, [isOpen, activeTab, percentage, tier, cardDataUrl, generateShareCard]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    sound.playSelect();
    const fullText = `${shareTitle}\n${shareDescription}\n${currentUrl}`;
    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    sound.playSelect();
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `${shareTitle}\n${shareDescription}`,
          url: currentUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleLineShare = () => {
    sound.playSelect();
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
      currentUrl,
    )}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  const handleFacebookShare = () => {
    sound.playSelect();
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  const handleTwitterShare = () => {
    sound.playSelect();
    const text = `${shareTitle}\n${shareDescription}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text,
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(url, '_blank', 'width=600,height=600');
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'rainbow-quiz-qr.png';
    a.click();
  };

  const handleDownloadCard = () => {
    if (!cardDataUrl) {
      generateShareCard();
      return;
    }
    const a = document.createElement('a');
    a.href = cardDataUrl;
    const scoreStr = percentage !== undefined ? `${percentage}` : 'card';
    a.download = `rainbow-quiz-result-${scoreStr}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-pink-500/40 shadow-2xl shadow-purple-500/30 text-slate-100 overflow-hidden relative flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-pink-950/60 to-purple-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/20 border border-pink-400/40 text-pink-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                เผยแพร่ & แชร์ผลลัพธ์
              </h2>
              <p className="text-xs text-pink-200">
                {percentage !== undefined ? `ผลลัพธ์ของคุณ: ${percentage}%` : 'ส่งต่อความสนุกให้เพื่อนมาเล่น'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="ปิดหน้าต่าง"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-slate-950/50 p-1.5 gap-1.5 shrink-0">
          <button
            onClick={() => setActiveTab('social')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'social'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>แชร์โซเชียล</span>
          </button>

          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'qr'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>QR Code</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('card');
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'card'
                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Download className="w-4 h-4 text-yellow-300" />
            <span>การ์ดรูปภาพ</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: SOCIAL SHARE */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              {percentage !== undefined && tier && (
                <div className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-400/30 flex items-center gap-3">
                  <div className="text-2xl font-black text-yellow-300 font-display tabular-nums">
                    {percentage}%
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-pink-300 font-semibold">{tier.badge}</p>
                    <p className="text-xs font-bold text-white truncate">{tier.title}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleNativeShare}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20 transition cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>แชร์ไปยังแอปต่างๆ (Share)</span>
                </button>

                <button
                  onClick={handleLineShare}
                  className="py-3 px-4 rounded-2xl bg-[#06c755] hover:bg-[#05b34c] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>แชร์ไปยัง LINE</span>
                </button>

                <button
                  onClick={handleFacebookShare}
                  className="py-3 px-4 rounded-2xl bg-[#1877f2] hover:bg-[#166fe5] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>แชร์ลง Facebook</span>
                </button>

                <button
                  onClick={handleTwitterShare}
                  className="py-3 px-4 rounded-2xl bg-black hover:bg-slate-800 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <span>โพสต์ลง X (Twitter)</span>
                </button>
              </div>

              {/* URL Box */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-slate-300">
                  คัดลอกลิงก์สำหรับแชร์:
                </label>
                <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-2xl border border-white/10">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="flex-1 bg-transparent px-2 text-xs font-mono text-slate-300 outline-none select-all truncate"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>คัดลอกแล้ว!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>คัดลอก</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: QR CODE */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="p-4 bg-white rounded-3xl shadow-xl border-4 border-pink-400">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Quiz QR Code"
                    className="w-56 h-56 object-contain rounded-xl"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center text-slate-400">
                    กำลังสร้าง QR Code...
                  </div>
                )}
              </div>

              <div className="text-xs text-slate-300 max-w-sm">
                <p className="font-semibold text-white mb-1">
                  สแกนด้วยกล้องมือถือเพื่อเข้าเล่นได้ทันที!
                </p>
                <p className="text-slate-400">
                  เหมาะสำหรับเปิดบนหน้าจอ ปาร์ตี้ สื่อสิ่งพิมพ์ หรือป้ายยาเพื่อนๆ ในกลุ่ม
                </p>
              </div>

              <button
                onClick={handleDownloadQR}
                className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-pink-400" />
                <span>บันทึกรูป QR Code ลงเครื่อง</span>
              </button>
            </div>
          )}

          {/* TAB 3: IMAGE CARD FOR STORY / SAVE IMAGE */}
          {activeTab === 'card' && (
            <div className="flex flex-col items-center text-center space-y-4">
              {/* Status Header displaying real props */}
              <div className="w-full flex items-center justify-between text-xs px-1">
                <span className="text-pink-300 font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                  <span>
                    การ์ดผลลัพธ์จริง: <strong className="text-white font-black">{percentage !== undefined ? `${percentage}%` : 'แบบทดสอบ'}</strong>
                    {tier?.badge ? ` (${tier.badge})` : ''}
                  </span>
                </span>

                <button
                  onClick={() => generateShareCard()}
                  disabled={generatingCard}
                  className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer transition disabled:opacity-50"
                  title="เรนเดอร์ภาพใหม่"
                >
                  <RotateCw className={`w-3.5 h-3.5 ${generatingCard ? 'animate-spin text-pink-400' : ''}`} />
                  <span>โหลดใหม่</span>
                </button>
              </div>

              {generatingCard ? (
                <div className="w-full max-w-xs aspect-[9/16] bg-slate-950/80 rounded-2xl border-2 border-pink-500/40 flex flex-col items-center justify-center p-6 space-y-3">
                  <div className="w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-bold text-pink-300 animate-pulse">
                    กำลังเรนเดอร์การ์ดรูปภาพของคุณ ({percentage !== undefined ? `${percentage}%` : ''})...
                  </p>
                </div>
              ) : cardDataUrl ? (
                <div className="relative group max-w-xs rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-500/40 bg-slate-950">
                  <img
                    src={cardDataUrl}
                    alt={`ผลลัพธ์ ${percentage || '100'}%`}
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              ) : (
                <button
                  onClick={() => generateShareCard()}
                  className="py-3 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-pink-300 text-sm font-bold border border-pink-400/40 cursor-pointer"
                >
                  คลิกเพื่อสร้างการ์ดรูปภาพ ({percentage !== undefined ? `${percentage}%` : ''})
                </button>
              )}

              <div className="text-xs text-slate-400 max-w-sm leading-relaxed">
                บันทึกภาพขนาด 9:16 โพสต์ลง Instagram Story, Facebook Story หรือส่งเข้าแชทเพื่อนได้ทันที
              </div>

              <button
                onClick={handleDownloadCard}
                disabled={generatingCard || !cardDataUrl}
                className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-pink-500/30 transition cursor-pointer active:scale-95 disabled:opacity-50"
              >
                <Download className="w-5 h-5 text-yellow-300" />
                <span>บันทึกการ์ดลงเครื่อง (Save Image {percentage !== undefined ? `${percentage}%` : ''})</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-950/80 border-t border-white/10 text-center text-[11px] text-slate-400 shrink-0">
          ✨ เว็บไซต์พร้อมใช้งานและรองรับทุกแพลตฟอร์ม (Mobile, Desktop, iOS, Android)
        </div>
      </div>
    </div>
  );
};
