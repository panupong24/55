import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { Option } from './types';
import { Navbar } from './components/Navbar';
import { IntroScreen } from './components/IntroScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';
import { ShareModal } from './components/ShareModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { ReportModal } from './components/ReportModal';
import { quizStorage, QuizProgress } from './utils/quizStorage';
import { useLanguage } from './i18n/LanguageContext';
import { AlertTriangle } from 'lucide-react';

// Admin panel is only needed on /admin, so keep it out of the main bundle
const AdminPage = lazy(() =>
  import('./pages/AdminPage').then((m) => ({ default: m.AdminPage })),
);

type AppStep = 'INTRO' | 'QUIZ' | 'RESULT';

export default function App() {
  const { t, questions, getResultTier } = useLanguage();

  // Route state supporting /admin navigation, direct URL loading, and GitHub Pages fallback redirect
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search && search.startsWith('?/')) {
        const decoded = search
          .slice(1)
          .split('&')
          .map((s) => s.replace(/~and~/g, '&'));
        const target = decoded[0];
        const query = decoded.slice(1).length ? '?' + decoded.slice(1).join('&') : '';
        const cleanPath = target.startsWith('/') ? target : '/' + target;
        const cleanUrl = cleanPath + query + window.location.hash;
        window.history.replaceState(null, '', cleanUrl);
        return cleanPath;
      }
      return window.location.pathname;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      return Math.min(Math.max(0, initialProgress.currentQuestionIndex), 14);
    }
    return 0;
  });

  const [answers, setAnswers] = useState<Record<number, { optionId: string; score: number }>>(() => {
    return initialProgress?.answers || {};
  });

  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTargetComment, setReportTargetComment] = useState<{
    id: string;
    comment: string;
    userName: string;
  } | null>(null);

  const [shareConfig, setShareConfig] = useState<{
    percentage?: number;
    tier?: any;
    initialTab?: 'social' | 'qr' | 'card';
  }>({});

  const currentQuestion = questions[currentQuestionIndex] || questions[0];
  const selectedAnswer = answers[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const hasSavedProgress = answeredCount > 0;

  // Calculate percentage and tier dynamically using localized tier text
  const result = useMemo(() => {
    const scoreList = Object.values(answers).map((a) => a.score);
    const totalScore = scoreList.reduce((sum, current) => sum + current, 0);
    const rawPercentage = 25 + (totalScore / 45) * 75;
    const percentage = Math.min(100, Math.max(25, Math.round(rawPercentage)));
    const tier = getResultTier(percentage);
    return { percentage, tier };
  }, [answers, getResultTier]);

  // Handler to open ShareModal with real, latest result props guaranteed
  const handleOpenShare = useCallback(
    (config?: {
      percentage?: number;
      tier?: any;
      initialTab?: 'social' | 'qr' | 'card';
    }) => {
      const activePercentage =
        config?.percentage !== undefined
          ? config.percentage
          : step === 'RESULT' || answeredCount > 0
            ? result.percentage
            : undefined;

      const activeTier =
        config?.tier !== undefined
          ? config.tier
          : step === 'RESULT' || answeredCount > 0
            ? result.tier
            : undefined;

      setShareConfig({
        percentage: activePercentage,
        tier: activeTier,
        initialTab: config?.initialTab || 'social',
      });
      setIsShareOpen(true);
    },
    [answeredCount, result, step],
  );

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
  }, [answers, currentQuestionIndex, questions.length]);

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

  const handleOpenReportModal = (commentTarget?: {
    id: string;
    comment: string;
    userName: string;
  }) => {
    setReportTargetComment(commentTarget || null);
    setIsReportModalOpen(true);
  };

  // Keyboard navigation for power users (a, b, c, d or 1, 2, 3, 4, Enter, ArrowLeft)
  useEffect(() => {
    if (
      currentPath.toLowerCase().startsWith('/admin') ||
      step !== 'QUIZ' ||
      isResetModalOpen ||
      isShareOpen ||
      isReportModalOpen
    ) {
      return;
    }

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
  }, [
    currentPath,
    step,
    currentQuestion,
    selectedAnswer,
    handleSelectOption,
    handleNext,
    handlePrev,
    isResetModalOpen,
    isShareOpen,
    isReportModalOpen,
  ]);

  // Route /admin renders the dedicated full-page AdminPage
  if (currentPath.toLowerCase().startsWith('/admin')) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
        <AdminPage onNavigateHome={() => navigate('/')} />
      </Suspense>
    );
  }

  // Main Public Quiz View (Zero Admin buttons, triggers, or modals)
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
        onOpenShare={() => handleOpenShare({ initialTab: 'social' })}
      />

      {/* Main Content View */}
      <main className="flex-1 flex flex-col justify-center relative z-10">
        {step === 'INTRO' && (
          <IntroScreen
            onStart={handleStart}
            onOpenShare={() => handleOpenShare({ initialTab: 'social' })}
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
            onOpenShare={(data) =>
              handleOpenShare(
                data || {
                  percentage: result.percentage,
                  tier: result.tier,
                  initialTab: 'card',
                },
              )
            }
            onOpenReportModal={handleOpenReportModal}
          />
        )}
      </main>

      {/* Share / Publish Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        percentage={shareConfig.percentage}
        tier={shareConfig.tier}
        initialTab={shareConfig.initialTab}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={handleConfirmReset}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
      />

      {/* Report / Feedback Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => {
          setIsReportModalOpen(false);
          setReportTargetComment(null);
        }}
        targetComment={reportTargetComment}
      />

      {/* Clean Public Footer (Strictly NO Admin button, login link, or email) */}
      <footer className="py-5 border-t border-pink-500/20 text-center text-xs text-slate-400 relative z-10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">🌈 {t.appName}</span>
            <span className="text-slate-600">·</span>
            <span className="text-pink-300">{t.prideEdition}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenShare({ initialTab: 'social' })}
              className="text-pink-300 hover:text-pink-200 underline font-medium cursor-pointer"
            >
              {t.shareQuiz}
            </button>
            <span className="text-slate-600">·</span>
            <button
              onClick={() => handleOpenReportModal()}
              className="text-slate-300 hover:text-pink-300 flex items-center gap-1 font-medium cursor-pointer transition"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.btnOpenFeedback}</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
