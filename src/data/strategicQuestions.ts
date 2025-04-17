
import { QuizQuestion } from '../types/quiz';
import { selfPerceptionQuestions } from './questions/selfPerceptionQuestions';
import { styleExperienceQuestions } from './questions/styleExperienceQuestions';
import { purchaseIntentQuestions } from './questions/purchaseIntentQuestions';
import { desiredOutcomesQuestions } from './questions/desiredOutcomesQuestions';

export const strategicQuestions: QuizQuestion[] = [
  ...selfPerceptionQuestions,      // Questions 1-2
  ...styleExperienceQuestions,     // Questions 3-4
  ...purchaseIntentQuestions,      // Questions 5-6
  ...desiredOutcomesQuestions      // Question 7
];
