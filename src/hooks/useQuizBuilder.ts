
import { useState, useEffect } from 'react';
import { QuizStep } from '@/types/quizBuilder';
import { useQuizComponents } from './quiz-builder/useQuizComponents';
import { useQuizSteps } from './quiz-builder/useQuizSteps';
import { useQuizPersistence } from './quiz-builder/useQuizPersistence';

export const useQuizBuilder = () => {
  const [steps, setSteps] = useState<QuizStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex] || null;
  const components = currentStep?.components || [];

  const { 
    addComponent, 
    updateComponent, 
    deleteComponent, 
    moveComponent 
  } = useQuizComponents(currentStepIndex, setSteps, components);

  const {
    addStep,
    updateStepTitle,
    deleteStep,
    duplicateStep
  } = useQuizSteps(steps, setSteps, currentStepIndex, setCurrentStepIndex);

  const {
    loadSavedState,
    setStepsFromTemplate
  } = useQuizPersistence(steps, currentStepIndex, setSteps, setCurrentStepIndex);

  // Load saved state on mount
  useEffect(() => {
    loadSavedState();
  }, [loadSavedState]);

  return {
    steps,
    currentStepIndex,
    setCurrentStepIndex,
    currentStep,
    components,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    addStep,
    updateStepTitle,
    deleteStep,
    duplicateStep,
    setStepsFromTemplate
  };
};
