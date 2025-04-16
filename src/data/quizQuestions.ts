
import { QuizQuestion } from '../types/quiz';
import { clothingQuestions } from './questions/clothingQuestions';
import { personalityQuestions } from './questions/personalityQuestions';
import { accessoriesQuestions } from './questions/accessoriesQuestions';
import { stylePreferencesQuestions } from './questions/stylePreferencesQuestions';
import { outerwearQuestions } from './questions/outerwearQuestions';

export const quizQuestions: QuizQuestion[] = [
  ...clothingQuestions,
  ...personalityQuestions,
  ...stylePreferencesQuestions,
  ...outerwearQuestions,
  ...accessoriesQuestions,
];
