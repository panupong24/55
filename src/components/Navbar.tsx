import React, { useState } from 'react';
import { Volume2, VolumeX, RotateCcw, Sparkles } from 'lucide-react';
import { sound } from '../utils/audio';

interface Props {
  onReset: () => void;
  isPlaying: boolean;
}

export const Navbar: React.FC<Props> = ({ onReset, isPlaying }) => {
  const [muted, setMuted] = useState(sound.isMuted);

  const toggleSound = () => {
    sound.isMuted = !muted;
    setMuted(!muted);
    if (muted) {
      sound.playSelect();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/85 backdrop-blur-xl border-b border-pink-500/20 shadow-lg shadow-pink-500/5">
      {/* Pride Rainbow Ribbon at the top */}
      <div className="w-full h-1 rainbow-bg animate-rainbow" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={onReset}
          className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="text-2xl filter drop-shadow">🌈</span>
          <span className="font-black text-xl sm:text-2xl rainbow-text tracking-tight">
            Rainbow Vibe
          </span>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/40 text-pink-300 shadow-xs">
            Quiz ✨
          </span>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleSound}
            aria-label={muted ? 'เปิดเสียง' : 'ปิดเสียง'}
            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white transition-all border border-pink-500/30 text-xs font-medium flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            title={muted ? 'เปิดเสียงเอฟเฟกต์' : 'ปิดเสียงเอฟเฟกต์'}
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-pink-400" />
            )}
            <span className="hidden sm:inline text-xs font-semibold">
              {muted ? 'เปิดเสียง' : 'เสียงเปิด'}
            </span>
          </button>

          {isPlaying && (
            <button
              onClick={onReset}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 text-pink-200 hover:text-white transition-all border border-pink-500/40 text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-3.5 h-3.5 text-pink-400" />
              <span>เริ่มใหม่</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
