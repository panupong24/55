export interface Option {
  id: 'a' | 'b' | 'c' | 'd';
  text: string;
  score: number; // Hidden internally, never displayed to the user
}

export interface Question {
  id: number;
  title: string;
  category: string;
  hint: string;
  image?: string;
  illustrationType:
    | 'tiktok'
    | 'music'
    | 'bl_series'
    | 'pride'
    | 'ig_story'
    | 'radar_gaze'
    | 'fanfic'
    | 'icons'
    | 'chat_judge'
    | 'pageant'
    | 'kpop'
    | 'slang_meme'
    | 'tarot'
    | 'stylist'
    | 'spectrum';
  options: Option[];
}

export interface QuizResultTier {
  minPercent: number;
  maxPercent: number;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  quote: string;
  traits: {
    label: string;
    level: string;
  }[];
  advice: string;
}
