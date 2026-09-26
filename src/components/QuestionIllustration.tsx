import React, { useState, useEffect } from 'react';
import { Question } from '../types';
import { ChevronLeft, Info, Camera, Image, Mic, ThumbsUp } from 'lucide-react';

interface Props {
  question: Question;
}

export const QuestionIllustration: React.FC<Props> = ({ question }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [retrySrc, setRetrySrc] = useState<string | null>(null);

  // Reset image state whenever question changes
  useEffect(() => {
    setImageFailed(false);
    setRetrySrc(null);
  }, [question.id, question.image]);

  // Dedicated pixel-perfect Thai Facebook Messenger Mockup for Question 9 (Matches uploaded screenshot exactly)
  if (question.id === 9) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden bg-white text-slate-800 border border-white/20 shadow-2xl flex flex-col font-sans select-none max-w-md mx-auto aspect-[9/12] sm:aspect-[4/3] sm:h-[340px]">
        {/* iOS / TRUE-H Status bar */}
        <div className="bg-[#f0f2f5] px-4 py-1 flex items-center justify-between text-[11px] font-medium text-slate-600 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="flex gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            </span>
            <span className="font-semibold text-slate-700 tracking-tight">TRUE-H</span>
          </div>
          <span className="font-bold text-slate-800 text-xs">11:51</span>
          <div className="flex items-center gap-1 text-[10px]">
            <span>20%</span>
            <div className="w-4 h-2 border border-slate-600 rounded-sm p-0.5 flex items-center">
              <div className="w-1/4 h-full bg-red-500 rounded-2xs" />
            </div>
          </div>
        </div>

        {/* Messenger Header */}
        <div className="bg-white/95 px-3 py-2 flex items-center justify-between border-b border-slate-200 shrink-0 shadow-xs">
          <div className="flex items-center gap-1 text-sky-500 font-medium text-xs sm:text-sm">
            <ChevronLeft className="w-5 h-5 -ml-1" />
            <span>ย้อนกลับ</span>
          </div>
          <div className="text-center">
            <div className="w-20 h-2 bg-slate-800 rounded-full mx-auto mb-0.5" />
            <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>ใช้งานอยู่ในขณะนี้</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sky-500">
            <Info className="w-4 h-4" />
          </div>
        </div>

        {/* Chat Conversation Stream */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2 bg-[#f8f9fa] text-xs sm:text-[13px] leading-relaxed">
          {/* Sent 1 */}
          <div className="flex justify-end">
            <div className="bg-sky-500 text-white px-3.5 py-1.5 rounded-2xl rounded-tr-xs shadow-xs max-w-[78%]">
              เหมือนกัน
            </div>
          </div>

          {/* Sent 2 */}
          <div className="flex justify-end">
            <div className="bg-sky-500 text-white px-3.5 py-1.5 rounded-2xl rounded-tr-xs shadow-xs max-w-[78%]">
              กำลังโสดละ 5555
            </div>
          </div>

          {/* Received 1 */}
          <div className="flex items-end gap-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-[10px] text-white">
              👤
            </div>
            <div className="bg-[#e4e6eb] text-slate-900 px-3.5 py-1.5 rounded-2xl rounded-tl-xs shadow-xs max-w-[78%]">
              บอกพี่นั่นแหละ
            </div>
          </div>

          {/* Sent 3 */}
          <div className="flex justify-end">
            <div className="bg-sky-500 text-white px-3.5 py-1.5 rounded-2xl rounded-tr-xs shadow-xs max-w-[78%]">
              ทำไมอะ
            </div>
          </div>

          {/* Sent 4 */}
          <div className="flex justify-end">
            <div className="bg-sky-500 text-white px-3.5 py-1.5 rounded-2xl rounded-tr-xs shadow-xs max-w-[78%]">
              ว่ามา
            </div>
          </div>

          {/* Received 2 */}
          <div className="flex items-end gap-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-[10px] text-white">
              👤
            </div>
            <div className="bg-[#e4e6eb] text-slate-900 px-3.5 py-2 rounded-2xl rounded-tl-xs shadow-xs max-w-[78%]">
              มีพี่ที่ทำงานอ่ะ คุยๆ กันยุ ขอเบอร์ไรเงี้ยอ่ะ และกำลังจะบอกเลิกพี่ แค่นี้แหละ
            </div>
          </div>

          {/* Received 3 */}
          <div className="flex items-end gap-1.5">
            <div className="w-6 h-6 shrink-0" />
            <div className="bg-[#e4e6eb] text-slate-900 px-3.5 py-1.5 rounded-2xl shadow-xs max-w-[78%]">
              ทำใจไว้นะ
            </div>
          </div>

          {/* Received 4 */}
          <div className="flex items-end gap-1.5">
            <div className="w-6 h-6 shrink-0" />
            <div className="bg-[#e4e6eb] text-slate-900 px-3.5 py-1.5 rounded-2xl shadow-xs max-w-[78%]">
              จุ๊ๆ ด้วยเรื่องนี้
            </div>
          </div>

          {/* Received 5 - The Punchline */}
          <div className="flex items-end gap-1.5">
            <div className="w-6 h-6 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-[10px] text-white">
              👤
            </div>
            <div className="bg-[#e4e6eb] text-slate-900 px-3.5 py-1.5 rounded-2xl rounded-tl-xs shadow-xs max-w-[78%] font-semibold text-pink-600">
              หล่อนะ ✨
            </div>
          </div>
        </div>

        {/* Messenger Footer Input */}
        <div className="bg-white px-3 py-2 border-t border-slate-200 flex items-center gap-2 text-slate-400 shrink-0">
          <span className="text-xs text-slate-600 font-bold px-1">Aa</span>
          <Camera className="w-4 h-4 text-slate-400" />
          <Image className="w-4 h-4 text-slate-400" />
          <Mic className="w-4 h-4 text-slate-400" />
          <div className="flex-1 bg-slate-100 rounded-full px-3 py-1 text-slate-400 text-xs">
            พิมพ์ข้อความ...
          </div>
          <ThumbsUp className="w-4 h-4 text-sky-500 fill-sky-500 shrink-0" />
        </div>
      </div>
    );
  }

  // If question has a specific image (Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q10, Q11, Q12, Q13, Q14, Q15)
  if (question.image && !imageFailed) {
    const currentSrc = retrySrc || question.image;

    return (
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-xl group">
        <img
          key={currentSrc}
          src={currentSrc}
          alt={question.title}
          referrerPolicy="no-referrer"
          onError={() => {
            if (!retrySrc && question.image) {
              const filename = question.image.split('/').pop()?.split('?')[0];
              if (filename) {
                setRetrySrc(`${import.meta.env.BASE_URL}images/${filename}`);
                return;
              }
            }
            setImageFailed(true);
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Specific overlay for Q12 matching the famous TikTok meme caption */}
        {question.id === 12 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
            <div className="bg-black/60 backdrop-blur-xs px-4 py-2 rounded-xl border border-yellow-400/40 shadow-2xl transform -rotate-1">
              <span className="text-xl sm:text-3xl font-extrabold text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide">
                LGBTQ+ 31 พฤษภา :
              </span>
            </div>
          </div>
        )}

        {/* Gradient shadow scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Bottom category badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
          <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-pink-300 font-medium">
            {question.category}
          </span>
          <span className="text-[11px] text-slate-400 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
            ข้อ {question.id} จาก 15
          </span>
        </div>
      </div>
    );
  }

  // Fallback vector illustration
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950/60 to-purple-950/70 border border-white/10 shadow-xl flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-2">
        <span className="text-5xl">🌈</span>
        <p className="text-sm font-semibold text-pink-300">{question.category}</p>
      </div>
    </div>
  );
};
