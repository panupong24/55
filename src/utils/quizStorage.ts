export interface QuizProgress {
  step: 'INTRO' | 'QUIZ' | 'RESULT';
  currentQuestionIndex: number;
  answers: Record<number, { optionId: string; score: number }>;
  savedAt: number;
}

const STORAGE_KEY = 'rainbow_quiz_progress_v1';

export const quizStorage = {
  loadProgress: (): QuizProgress | null => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;

      const parsed = JSON.parse(raw) as QuizProgress;
      if (!parsed || typeof parsed !== 'object') return null;

      // Validate step
      if (!['INTRO', 'QUIZ', 'RESULT'].includes(parsed.step)) {
        return null;
      }

      // Validate currentQuestionIndex
      const currentQuestionIndex =
        typeof parsed.currentQuestionIndex === 'number' &&
        !isNaN(parsed.currentQuestionIndex)
          ? Math.max(0, parsed.currentQuestionIndex)
          : 0;

      // Validate answers
      const answers =
        parsed.answers && typeof parsed.answers === 'object'
          ? parsed.answers
          : {};

      return {
        step: parsed.step,
        currentQuestionIndex,
        answers,
        savedAt: parsed.savedAt || Date.now(),
      };
    } catch (err) {
      console.warn('Failed to load quiz progress from localStorage:', err);
      return null;
    }
  },

  saveProgress: (
    step: 'INTRO' | 'QUIZ' | 'RESULT',
    currentQuestionIndex: number,
    answers: Record<number, { optionId: string; score: number }>,
  ) => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return;
      }
      const data: QuizProgress = {
        step,
        currentQuestionIndex,
        answers,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.warn('Failed to save quiz progress to localStorage:', err);
    }
  },

  clearProgress: () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Failed to clear quiz progress from localStorage:', err);
    }
  },
};
