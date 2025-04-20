
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
        
        if (Array.isArray(savedSteps) && savedSteps.length > 0) {
          console.log('Loading saved quiz state:', savedSteps.length, 'steps');
          setSteps(savedSteps);
          setCurrentStepIndex(savedIndex || 0);
        } else {
          console.warn('Saved steps were empty or invalid');
        }
      } else {
        console.log('No saved quiz state found');
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, [setSteps, setCurrentStepIndex]);

  const setStepsFromTemplate = useCallback((newSteps: QuizStep[]) => {
    if (Array.isArray(newSteps) && newSteps.length > 0) {
      console.log('Setting steps from template:', newSteps.length, 'steps');
      setSteps(newSteps);
      setCurrentStepIndex(0);
    } else {
      console.error('Attempted to set empty or invalid template steps');
    }
  }, [setSteps, setCurrentStepIndex]);

  return {
    loadSavedState,
    setStepsFromTemplate
  };
};
