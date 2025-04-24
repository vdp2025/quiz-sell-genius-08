
import { QuizQuestion } from '../types/quiz';
import { selfPerceptionQuestions } from './questions/selfPerceptionQuestions';
import { styleExperienceQuestions } from './questions/styleExperienceQuestions';
import { purchaseIntentQuestions } from './questions/purchaseIntentQuestions';
import { desiredOutcomesQuestions } from './questions/desiredOutcomesQuestions';

// Combine all strategic questions in the correct order
export const strategicQuestions: QuizQuestion[] = [
  ...selfPerceptionQuestions,
  ...styleExperienceQuestions,
  ...purchaseIntentQuestions,
  ...desiredOutcomesQuestions
];

// Log the number of questions loaded for debugging
console.info(`Strategic questions loaded: ${strategicQuestions.length}`);
