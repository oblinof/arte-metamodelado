export enum ViewState {
  HOME = 'HOME',
  LEARN = 'LEARN',
  WORKSHOP = 'WORKSHOP',
  CHAT = 'CHAT',
  QUIZ = 'QUIZ'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface Concept {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  glitchText: string;
  longContent?: string; // For the detailed text provided
}

export interface QuizQuestion {
  id: number;
  scenario: string; // Added for narrative context
  question: string;
  options: {
    text: string;
    points: number;
    feedback: string;
  }[];
}

export interface UserProgress {
  mutantPoints: number;
  completedModules: string[];
}

export type MutationFilter = 'GLITCH' | 'FRAGMENT' | 'SABOTAGE' | 'CODE';