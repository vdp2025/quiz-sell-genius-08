
import { QuizQuestion } from './quiz';

export interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
  createdAt: string;
  updatedAt: string;
  isDefault?: boolean;
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
