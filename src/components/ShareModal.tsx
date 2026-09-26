import React, { useState, useEffect, useRef } from 'react';
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
} from 'lucide-react';
import { QuizResultTier } from '../types';
import { sound } from '../utils/audio';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  percentage?: number;
  tier?: QuizResultTier;
}

export const ShareModal: React.FC<Props> = ({
  isOpen,
  onClose,
  percentage,
  tier,
}) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'social' | 'qr' | 'card'>('social');
  const [generatingCard, setGeneratingCard] = useState(false);
  const [cardDataUrl, setCardDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.origin + window.location.pathname;
    }
    return 'https://www.gaykub.online/';
  };

  const currentUrl = getShareUrl();

  const shareTitle =
    percentage !== undefined && tier
      ? `🌈 ฉันได้ผลลัพธ์ดีกรีตัวแม่ ${percentage}%: "${tier.title}" (${tier.badge}) | แบบทดสอบ Remix Rainbow Vibe Quiz`
      : `🌈 Remix Rainbow Vibe Quiz — แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ`;

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

  // Generate Image Card for Social Stories
  const generateShareCard = () => {
    setGeneratingCard(true);
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920; // 9:16 Instagram Story / Phone Wallpaper aspect
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Dark Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 1080, 1920);
    bgGradient.addColorStop(0, '#0f172a');
    bgGradient.addColorStop(0.3, '#1e113a');
    bgGradient.addColorStop(0.7, '#2a0845');
    bgGradient.addColorStop(1, '#020617');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Decorative Glowing Orbs
    const drawOrb = (x: number, y: number, r: number, color: string) => {
      const radGrad = ctx.createRadialGradient(x, y, 0, x, y, r);
      radGrad.addColorStop(0, color);
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    drawOrb(200, 300, 450, 'rgba(236, 72, 153, 0.28)');
    drawOrb(880, 500, 500, 'rgba(168, 85, 247, 0.3)');
    drawOrb(540, 1400, 600, 'rgba(6, 182, 212, 0.25)');

    // Rainbow Header Bar
    const rainbowGrad = ctx.createLinearGradient(140, 0, 940, 0);
    rainbowGrad.addColorStop(0, '#ff2a6d');
    rainbowGrad.addColorStop(0.2, '#ff6200');
    rainbowGrad.addColorStop(0.4, '#ffea00');
    rainbowGrad.addColorStop(0.6, '#00e676');
    rainbowGrad.addColorStop(0.8, '#00b0ff');
    rainbowGrad.addColorStop(1, '#d500f9');

    // Card Container (Rounded Rectangle)
    const cardX = 90;
    const cardY = 160;
    const cardW = 900;
    const cardH = 1600;
    const radius = 64;

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, radius);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(244, 114, 182, 0.6)';
    ctx.stroke();
    ctx.restore();

    // App Branding Header
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f472b6';
    ctx.font = 'bold 36px "Prompt", sans-serif';
    ctx.fillText('🌈 REMIX RAINBOW VIBE QUIZ 🏳️‍🌈', 540, 270);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '28px "Prompt", sans-serif';
    ctx.fillText('แบบทดสอบวัดดีกรีตัวแม่สายรุ้งสุดฮา 15 ข้อ', 540, 320);

    // Score Badge Pill
    const badgeText = tier ? `✨ ${tier.badge} ✨` : '✨ RAINBOW VIBE ✨';
    ctx.save();
    ctx.font = 'bold 34px "Prompt", sans-serif';
    const textWidth = ctx.measureText(badgeText).width;
    const pillW = textWidth + 80;
    const pillH = 70;
    const pillX = 540 - pillW / 2;
    const pillY = 400;

    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 35);
    ctx.fillStyle = 'rgba(236, 72, 153, 0.2)';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#f472b6';
    ctx.stroke();

    ctx.fillStyle = '#fce7f3';
    ctx.fillText(badgeText, 540, 448);
    ctx.restore();

    // Large Percentage
    ctx.save();
    ctx.font = '900 180px "Prompt", sans-serif';
    ctx.fillStyle = rainbowGrad;
    const displayScore = percentage !== undefined ? `${percentage}%` : '100%';
    ctx.fillText(displayScore, 540, 680);
    ctx.restore();

    // Subtitle
    ctx.fillStyle = '#fb7185';
    ctx.font = 'bold 32px "Prompt", sans-serif';
    ctx.fillText('สรุปผลระดับความตัวแม่', 540, 750);

    // Tier Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 54px "Prompt", sans-serif';
    const tierTitle = tier ? tier.title : 'ตัวแม่สายรุ้งตัวจริงเสียงจริง';
    ctx.fillText(tierTitle, 540, 840);

    // Quote
    if (tier?.quote) {
      ctx.save();
      const quoteW = 760;
      const quoteH = 120;
      ctx.beginPath();
      ctx.roundRect(540 - quoteW / 2, 910, quoteW, quoteH, 28);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.4)';
      ctx.stroke();

      ctx.fillStyle = '#fef08a';
      ctx.font = 'italic 32px "Prompt", sans-serif';
      ctx.fillText(`“${tier.quote}”`, 540, 982);
      ctx.restore();
    }

    // Traits (if available)
    if (tier?.traits) {
      const startY = 1100;
      tier.traits.slice(0, 4).forEach((trait, i) => {
        const itemY = startY + i * 80;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.beginPath();
        ctx.roundRect(170, itemY, 740, 64, 18);
        ctx.fill();

        ctx.textAlign = 'left';
        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 30px "Prompt", sans-serif';
        ctx.fillText(trait.label, 200, itemY + 44);

        ctx.textAlign = 'right';
        ctx.fillStyle = '#fde047';
        ctx.font = '900 28px monospace';
        ctx.fillText(trait.level, 880, itemY + 44);
      });
    }

    // Footer with Call to Action and URL
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 32px "Prompt", sans-serif';
    ctx.fillText('🔗 สแกนหรือคลิกเล่นได้เลยที่', 540, 1530);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '26px monospace';
    const displayUrl = currentUrl.replace(/^https?:\/\//, '');
    ctx.fillText(
      displayUrl.length > 38 ? displayUrl.substring(0, 38) + '...' : displayUrl,
      540,
      1580,
    );

    const dataUrl = canvas.toDataURL('image/png');
    setCardDataUrl(dataUrl);
    setGeneratingCard(false);
  };

  useEffect(() => {
    if (isOpen && activeTab === 'card' && !cardDataUrl) {
      generateShareCard();
    }
  }, [isOpen, activeTab, cardDataUrl]);

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
    if (!cardDataUrl) return;
    const a = document.createElement('a');
    a.href = cardDataUrl;
    a.download = `rainbow-quiz-result-${percentage || '100'}.png`;
    a.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl bg-slate-900 border-2 border-pink-500/40 shadow-2xl shadow-purple-500/30 text-slate-100 overflow-hidden relative flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-pink-950/60 to-purple-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-pink-500/20 border border-pink-400/40 text-pink-300">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                เผยแพร่ & แชร์แบบทดสอบ
              </h2>
              <p className="text-xs text-pink-200">ส่งต่อความสนุกและป้ายยาเพื่อนให้มาเล่น</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-slate-950/50 p-1.5 gap-1.5">
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
              if (!cardDataUrl) generateShareCard();
            }}
            className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'card'
                ? 'bg-pink-600 text-white shadow'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>การ์ดรูปภาพ</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* TAB 1: SOCIAL SHARE */}
          {activeTab === 'social' && (
            <div className="space-y-4">
              {/* Native Mobile Share Button */}
              <button
                onClick={handleNativeShare}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-pink-500/25 transition cursor-pointer active:scale-95 animate-rainbow"
              >
                <Share2 className="w-5 h-5" />
                <span>แชร์ไปยังแอปต่างๆ (LINE, IG, Messages...)</span>
              </button>

              {/* Direct Social Channels Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                {/* LINE */}
                <button
                  onClick={handleLineShare}
                  className="py-3 px-2 rounded-2xl bg-[#06C755]/15 hover:bg-[#06C755]/25 border border-[#06C755]/40 text-[#06C755] hover:text-white flex flex-col items-center justify-center gap-1.5 font-bold text-xs transition cursor-pointer group"
                >
                  <span className="w-9 h-9 rounded-full bg-[#06C755] text-white flex items-center justify-center font-black text-sm shadow group-hover:scale-105 transition-transform">
                    L
                  </span>
                  <span>แชร์ลง LINE</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={handleFacebookShare}
                  className="py-3 px-2 rounded-2xl bg-[#1877F2]/15 hover:bg-[#1877F2]/25 border border-[#1877F2]/40 text-[#1877F2] hover:text-white flex flex-col items-center justify-center gap-1.5 font-bold text-xs transition cursor-pointer group"
                >
                  <span className="w-9 h-9 rounded-full bg-[#1877F2] text-white flex items-center justify-center font-black text-sm shadow group-hover:scale-105 transition-transform">
                    f
                  </span>
                  <span>Facebook</span>
                </button>

                {/* X (Twitter) */}
                <button
                  onClick={handleTwitterShare}
                  className="py-3 px-2 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex flex-col items-center justify-center gap-1.5 font-bold text-xs transition cursor-pointer group"
                >
                  <span className="w-9 h-9 rounded-full bg-slate-900 border border-white/20 text-white flex items-center justify-center font-black text-xs shadow group-hover:scale-105 transition-transform">
                    𝕏
                  </span>
                  <span>X (Twitter)</span>
                </button>
              </div>

              {/* Copy URL Bar */}
              <div className="pt-2">
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  ลิงก์เว็บไซต์สำหรับแชร์:
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
                className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-pink-400" />
                <span>บันทึกรูป QR Code ลงเครื่อง</span>
              </button>
            </div>
          )}

          {/* TAB 3: IMAGE CARD FOR STORY */}
          {activeTab === 'card' && (
            <div className="flex flex-col items-center text-center space-y-4">
              {generatingCard ? (
                <div className="p-12 text-sm text-pink-300 animate-pulse">
                  กำลังเรนเดอร์การ์ดรูปภาพสวยๆ...
                </div>
              ) : cardDataUrl ? (
                <div className="relative group max-w-xs rounded-2xl overflow-hidden shadow-2xl border-2 border-pink-500/40">
                  <img
                    src={cardDataUrl}
                    alt="Result Story Card"
                    className="w-full h-auto object-cover rounded-xl"
                  />
                </div>
              ) : null}

              <div className="text-xs text-slate-400 max-w-sm">
                บันทึกภาพขนาด 9:16 โพสต์ลง Instagram Story, Facebook Story หรือ TikTok ได้ทันที!
              </div>

              <button
                onClick={handleDownloadCard}
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-95 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-pink-500/25 transition cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>บันทึกการ์ดลงเครื่อง (Save Image)</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-slate-950/80 border-t border-white/10 text-center text-[11px] text-slate-400">
          ✨ เว็บไซต์พร้อมใช้งานและรองรับทุกแพลตฟอร์ม (Mobile, Desktop, iOS, Android)
        </div>
      </div>
    </div>
  );
};
