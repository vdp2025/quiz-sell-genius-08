
import { useCallback } from 'react';
import { QuizStep } from '@/types/quizBuilder';
import { toast } from '@/hooks/use-toast';

export const useQuizSteps = (
  steps: QuizStep[],
  setSteps: React.Dispatch<React.SetStateAction<QuizStep[]>>,
  currentStepIndex: number,
  setCurrentStepIndex: React.Dispatch<React.SetStateAction<number>>
) => {
  const addStep = useCallback(() => {
    const newStep: QuizStep = {
      id: `step-${Date.now()}`,
      title: `Etapa ${steps.length + 1}`,
      components: []
    };
    
    setSteps(prev => [...prev, newStep]);
    setCurrentStepIndex(steps.length);
  }, [steps.length, setSteps, setCurrentStepIndex]);

  const updateStepTitle = useCallback((index: number, title: string) => {
    setSteps(prev => 
      prev.map((step, i) => 
        i === index ? { ...step, title } : step
      )
    );
    
    toast({
      title: "Etapa atualizada",
      description: `Nome da etapa alterado para "${title}"`,
    });
  }, [setSteps]);

  const deleteStep = useCallback((index: number) => {
    if (steps.length <= 1) {
      toast({
        title: "Não é possível excluir",
        description: "Um quiz precisa ter pelo menos uma etapa",
        variant: "destructive",
      });
      return;
    }
    
    setSteps(prev => prev.filter((_, i) => i !== index));
    
    if (currentStepIndex >= index && currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
    
    toast({
      title: "Etapa excluída",
      description: "A etapa foi removida com sucesso",
    });
  }, [currentStepIndex, steps.length, setSteps, setCurrentStepIndex]);

  const duplicateStep = useCallback((index: number) => {
    const stepToDuplicate = steps[index];
    if (!stepToDuplicate) return;
    
    const newStep: QuizStep = {
      id: `step-${Date.now()}`,
      title: `${stepToDuplicate.title} (cópia)`,
      components: stepToDuplicate.components.map(component => ({
        ...component,
        id: `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      }))
    };
    
    const newSteps = [...steps];
    newSteps.splice(index + 1, 0, newStep);
    setSteps(newSteps);
    setCurrentStepIndex(index + 1);
    
    toast({
      title: "Etapa duplicada",
      description: "Uma cópia da etapa foi criada",
    });
  }, [steps, setSteps, setCurrentStepIndex]);

  return {
    addStep,
    updateStepTitle,
    deleteStep,
    duplicateStep
  };
};
