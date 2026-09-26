import React, { useState, useEffect, useCallback } from 'react';
import { questions } from './data/questions';
import { calculateQuizResult } from './data/results';
import { Option } from './types';
import { Navbar } from './components/Navbar';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';
import { ShareModal } from './components/ShareModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { quizStorage, QuizProgress } from './utils/quizStorage';

type AppStep = 'INTRO' | 'QUIZ' | 'RESULT';

export default function App() {
  // Synchronously load saved state from localStorage so page reload immediately restores where player left off
  const [initialProgress] = useState<QuizProgress | null>(() => quizStorage.loadProgress());

  const [step, setStep] = useState<AppStep>(() => {
    if (initialProgress?.step === 'QUIZ' || initialProgress?.step === 'RESULT') {
      return initialProgress.step;
    }
    return 'INTRO';
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(() => {
    if (initialProgress && typeof initialProgress.currentQuestionIndex === 'number') {
      return Math.min(Math.max(0, initialProgress.currentQuestionIndex), questions.length - 1);
    }
    return 0;
  });

  const [answers, setAnswers] = useState<Record<number, { optionId: string; score: number }>>(() => {
    return initialProgress?.answers || {};
  });

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = answers[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const hasSavedProgress = answeredCount > 0;

  // Start fresh from question 1
  const handleStart = () => {
    const emptyAnswers: Record<number, { optionId: string; score: number }> = {};
    setAnswers(emptyAnswers);
    setCurrentQuestionIndex(0);
    setStep('QUIZ');
    quizStorage.saveProgress('QUIZ', 0, emptyAnswers);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resume directly from current question
  const handleResume = () => {
    setStep('QUIZ');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select an option: Persist answers and current state immediately
  const handleSelectOption = useCallback(
    (option: Option) => {
      setAnswers((prev) => {
        const nextAnswers = {
          ...prev,
          [currentQuestionIndex]: {
            optionId: option.id,
            score: option.score,
          },
        };
        quizStorage.saveProgress('QUIZ', currentQuestionIndex, nextAnswers);
        return nextAnswers;
      });
    },
    [currentQuestionIndex],
  );

  // Navigate to Next question or Finish Quiz
  const handleNext = useCallback(() => {
    if (!answers[currentQuestionIndex]) return;

    if (currentQuestionIndex < questions.length - 1) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      quizStorage.saveProgress('QUIZ', nextIndex, answers);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setStep('RESULT');
      quizStorage.saveProgress('RESULT', currentQuestionIndex, answers);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [answers, currentQuestionIndex]);

  // Navigate to Previous question
  const handlePrev = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);
      quizStorage.saveProgress('QUIZ', prevIndex, answers);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex, answers]);

  // Trigger reset dialog (or direct reset if on result screen or no answers yet)
  const handleRequestReset = () => {
    if (step === 'QUIZ' && answeredCount > 0) {
      setIsResetModalOpen(true);
    } else {
      handleConfirmReset();
    }
  };

  // Explicit confirmation: Clears progress ONLY when user explicitly confirms
  const handleConfirmReset = () => {
    quizStorage.clearProgress();
    setAnswers({});
    setCurrentQuestionIndex(0);
    setStep('INTRO');
    setIsResetModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation for power users (a, b, c, d or 1, 2, 3, 4, Enter, ArrowLeft)
  useEffect(() => {
    if (step !== 'QUIZ' || isResetModalOpen || isShareOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const optionMap: Record<string, 'a' | 'b' | 'c' | 'd'> = {
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        '1': 'a',
        '2': 'b',
        '3': 'c',
        '4': 'd',
      };

      if (optionMap[key]) {
        const targetOption = currentQuestion.options.find(
          (opt) => opt.id === optionMap[key],
        );
        if (targetOption) {
          handleSelectOption(targetOption);
        }
      } else if (e.key === 'Enter' && selectedAnswer) {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [step, currentQuestion, selectedAnswer, handleSelectOption, handleNext, handlePrev, isResetModalOpen, isShareOpen]);

  // Calculate percentage and tier strictly internally (Hidden from players)
  const scoreList = Object.values(answers).map((a) => a.score);
  const result = calculateQuizResult(scoreList);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-pink-500 selection:text-white relative overflow-x-hidden">
      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Dynamic Ambient LGBTQ+ Colorful Pride Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute top-2/3 -left-32 w-96 h-96 bg-cyan-500/15 rounded-full blur-[130px]" />
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-amber-500/12 rounded-full blur-[120px]" />
      </div>

      {/* Top Bar Header */}
      <Navbar
        onReset={handleRequestReset}
        isPlaying={step === 'QUIZ' || step === 'RESULT'}
        onOpenShare={() => setIsShareOpen(true)}
      />

      {/* Main Content View */}
      <main className="flex-1 flex flex-col justify-center relative z-10">
        {step === 'INTRO' && (
          <IntroScreen
            onStart={handleStart}
            onOpenShare={() => setIsShareOpen(true)}
            hasSavedProgress={hasSavedProgress}
            savedQuestionNumber={currentQuestionIndex + 1}
            onResume={handleResume}
            onReset={handleConfirmReset}
          />
        )}

        {step === 'QUIZ' && (
          <QuestionScreen
            question={currentQuestion}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            selectedOptionId={selectedAnswer?.optionId}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            onReset={handleRequestReset}
          />
        )}

        {step === 'RESULT' && (
          <ResultScreen
            percentage={result.percentage}
            tier={result.tier}
            onRestart={handleConfirmReset}
            onOpenShare={() => setIsShareOpen(true)}
          />
        )}
      </main>

      {/* Share / Publish Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        percentage={step === 'RESULT' ? result.percentage : undefined}
        tier={step === 'RESULT' ? result.tier : undefined}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
      />

      {/* Festive Pride Footer */}
      <footer className="py-5 border-t border-pink-500/20 text-center text-xs text-slate-400 relative z-10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">🌈 Remix Rainbow Vibe Quiz</span>
            <span className="text-slate-600">·</span>
            <span className="text-pink-300">Pride Edition</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareOpen(true)}
              className="text-pink-300 hover:text-pink-200 underline font-medium cursor-pointer"
            >
              แชร์เว็บ & QR Code
            </button>
            <span className="text-slate-600">·</span>
            <span className="text-slate-500">15 ข้อจัดเต็ม · สรุปผล % ทันที</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
