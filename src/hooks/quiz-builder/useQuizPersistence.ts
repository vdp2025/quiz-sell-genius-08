
import { useCallback } from 'react';
import { QuizStep } from '@/types/quizBuilder';
import { toast } from '@/hooks/use-toast';

export const useQuizPersistence = (
  steps: QuizStep[],
  currentStepIndex: number,
  setSteps: React.Dispatch<React.SetStateAction<QuizStep[]>>,
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const saveCurrentState = useCallback(async () => {
    try {
      localStorage.setItem('quiz_builder_state', JSON.stringify({
        steps,
        currentStepIndex
      }));
      
      toast({
        title: "Alterações salvas",
        description: "Suas alterações foram salvas com sucesso",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving quiz state:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas alterações",
        variant: "destructive",
      });
      return false;
    }
  }, [steps, currentStepIndex]);

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
    saveCurrentState,
    loadSavedState,
    setStepsFromTemplate
  };
};
