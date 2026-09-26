import React, { useState } from 'react';
import { Download, Share, Smartphone, X, CheckCircle2 } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface Props {
  variant?: 'navbar' | 'prominent';
}

export const PWAInstallButton: React.FC<Props> = ({ variant = 'navbar' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already running in standalone PWA mode, don't show install button
  if (isInstalled) {
    return null;
  }

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => setInstallSuccess(false), 3000);
    }
  };

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'prominent') {
      return (
        <button
          onClick={handleInstall}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition cursor-pointer active:scale-95"
        >
          {installSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span>ติดตั้งเรียบร้อยแล้ว!</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>ติดตั้งแอปลงเครื่อง (เล่นแบบไม่ต้องเปิดเบราว์เซอร์)</span>
            </>
          )}
        </button>
      );
    }

    return (
      <button
        onClick={handleInstall}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
        title="ติดตั้งแอปลงหน้าจอหลัก"
      >
        <Download className="w-3.5 h-3.5 text-pink-400" />
        <span>ติดตั้งแอป</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        {variant === 'prominent' ? (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition cursor-pointer active:scale-95"
          >
            <Smartphone className="w-5 h-5" />
            <span>เพิ่มลงหน้าจอโฮม (iOS Safari)</span>
          </button>
        ) : (
          <button
            onClick={() => setShowIOSGuide(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 border border-pink-400/40 text-pink-200 text-xs font-semibold transition cursor-pointer shadow-sm active:scale-95"
            title="เพิ่มลงหน้าจอโฮมสำหรับ iPhone/iPad"
          >
            <Smartphone className="w-3.5 h-3.5 text-pink-400" />
            <span>ติดตั้งบน iOS</span>
          </button>
        )}

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl bg-slate-900 border border-pink-500/30 p-6 shadow-2xl text-slate-100 relative">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-pink-400">
                  <Smartphone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">ติดตั้งบน iPhone / iPad</h3>
                  <p className="text-xs text-slate-400">วิธีบันทึกเป็นแอปบนหน้าจอโฮม</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-300 bg-slate-950/60 p-4 rounded-2xl border border-white/5">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    แตะปุ่ม <strong className="text-pink-300">แชร์ (Share)</strong> <Share className="w-4 h-4 inline-block text-pink-400 -mt-0.5" /> ที่แถบเครื่องมือ Safari ด้านล่าง
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    เลื่อนลงแล้วแตะเลือก <strong className="text-yellow-300">"เพิ่มไปยังหน้าจอโฮม" (Add to Home Screen)</strong>
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-pink-500 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <span>
                    กด <strong className="text-emerald-400">"เพิ่ม" (Add)</strong> มุมขวาบน จะมีไอคอน Rainbow Quiz ปรากฏบนหน้าจอมือถือของคุณทันที!
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-3 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs sm:text-sm font-bold transition shadow-lg cursor-pointer"
              >
                เข้าใจแล้ว ปิดหน้าต่าง
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
