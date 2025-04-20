
import { QuizQuestion } from './quiz';

export interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
  settings?: {
    allowBack?: boolean;
    shuffleQuestions?: boolean;
    theme?: {
      primaryColor?: string;
      secondaryColor?: string;
      fontFamily?: string;
    }
  };
}

export interface QuizTemplatePreview {
  id: string;
  name: string;
  description: string;
  questionCount: number;
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
}
