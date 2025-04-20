
import { useCallback } from 'react';
import { QuizStep } from '@/types/quizBuilder';

export const useQuizPersistence = (
  steps: QuizStep[],
  currentStepIndex: number,
  setSteps: React.Dispatch<React.SetStateAction<QuizStep[]>>,
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const loadSavedState = useCallback(() => {
    try {
      const savedState = localStorage.getItem('quiz_builder_state');
      if (savedState) {
        const { steps: savedSteps, currentStepIndex: savedIndex } = JSON.parse(savedState);
        setSteps(savedSteps);
        setCurrentStepIndex(savedIndex);
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, [setSteps, setCurrentStepIndex]);

  const setStepsFromTemplate = useCallback((newSteps: QuizStep[]) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [setSteps, setCurrentStepIndex]);

  return {
    loadSavedState,
    setStepsFromTemplate
  };
};
