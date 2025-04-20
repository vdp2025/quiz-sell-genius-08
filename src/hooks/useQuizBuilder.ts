
import { useState, useEffect } from 'react';
import { QuizStep } from '@/types/quizBuilder';
import { useQuizComponents } from './quiz-builder/useQuizComponents';
import { useQuizSteps } from './quiz-builder/useQuizSteps';
import { useQuizPersistence } from './quiz-builder/useQuizPersistence';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';

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
    const savedState = localStorage.getItem('quiz_builder_state');
    if (savedState) {
      console.log('Found saved state, attempting to load');
      loadSavedState();
    } else {
      console.log('No saved state found, using default template');
      // If no saved state, use the default template
      setStepsFromTemplate(styleQuizTemplate);
    }
  }, [loadSavedState, setStepsFromTemplate]);

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
