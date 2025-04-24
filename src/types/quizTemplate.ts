
import { QuizQuestion } from "./quiz";

export interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
  version: number;
  updatedAt: string;
  createdBy?: string;
  isPublished?: boolean;
}
