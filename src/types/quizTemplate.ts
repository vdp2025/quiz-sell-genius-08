
import { QuizQuestion } from './quiz';
import { QuizBuilderState } from './quizBuilder';

export interface QuizTemplate {
  id: string;
  name: string;
  description: string;
  questions: QuizQuestion[];
  builderState: QuizBuilderState;
  createdAt: string;
  updatedAt: string;
}
