
import { QuizBuilderState } from '@/types/quizBuilder';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { resultPageStorage } from './resultPageStorage';

// Re-export types from quizBuilderTypes.ts
export { QuizQuestion, QuizAnswer } from '@/types/quizBuilderTypes';

// Re-export functions from quizBuilderCreator.ts
export { createBuilderStateFromQuiz, generateInitialStages } from './quizBuilderCreator';

// Re-export functions from quizResultIntegration.ts
export { createBuilderStateFromResultPage, loadQuizResultConfig } from './quizResultIntegration';

// Re-export stubs from quizServiceStubs.ts
export { 
  getQuizConfig, 
  saveQuizConfig, 
  getQuizResult, 
  saveQuizResult 
} from './quizServiceStubs';

// Export utility functions that were previously in this file
export const fixBooleanNumberIssues = () => {
  // This function is kept for compatibility but doesn't need to do anything anymore
  console.log('Boolean/number issues have been fixed in the refactored code');
};
