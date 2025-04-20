
import { useState, useCallback, useEffect } from 'react';
import { QuizComponentType, QuizComponentData, QuizStep } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';

export const useQuizBuilder = () => {
  const [steps, setSteps] = useState<QuizStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Get current step and components
  const currentStep = steps[currentStepIndex] || null;
  const components = currentStep?.components || [];

  const getDefaultData = (type: QuizComponentType): any => {
    switch (type) {
      case 'header':
        return { title: 'Título do Quiz', subtitle: 'Responda às perguntas e descubra seu resultado' };
      case 'headline':
        return { title: 'Título da Seção', subtitle: 'Subtítulo opcional' };
      case 'text':
        return { text: 'Insira seu texto aqui...' };
      case 'image':
        return { imageUrl: '', alt: 'Descrição da imagem' };
      case 'multipleChoice':
        return { 
          question: 'Sua pergunta aqui?', 
          options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
          multiSelect: 3
        };
      case 'singleChoice':
        return { question: 'Sua pergunta aqui?', options: ['Opção 1', 'Opção 2', 'Opção 3'] };
      case 'scale':
        return { question: 'Em uma escala de 1 a 5, como você avalia...?', min: 1, max: 5, minLabel: 'Discordo Totalmente', maxLabel: 'Concordo Totalmente' };
      default:
        return {};
    }
  };

  const addComponent = useCallback((type: QuizComponentType): string => {
    if (!currentStep) return '';
    
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type,
      order: components.length,
      data: getDefaultData(type),
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: 0
      }
    };

    setSteps(prev => prev.map((step, index) => 
      index === currentStepIndex
        ? { ...step, components: [...step.components, newComponent] }
        : step
    ));
    
    return newComponent.id;
  }, [currentStep, currentStepIndex, components.length]);

  const updateComponent = useCallback((id: string, updates: Partial<QuizComponentData>) => {
    setSteps(prev => 
      prev.map((step, stepIndex) => 
        stepIndex === currentStepIndex
          ? {
              ...step,
              components: step.components.map(component => 
                component.id === id 
                  ? { 
                      ...component, 
                      ...updates,
                      data: updates.data ? { ...component.data, ...updates.data } : component.data,
                      style: updates.style ? { ...component.style, ...updates.style } : component.style
                    } 
                  : component
              )
            }
          : step
      )
    );
  }, [currentStepIndex]);

  const deleteComponent = useCallback((id: string) => {
    setSteps(prev => 
      prev.map((step, stepIndex) => 
        stepIndex === currentStepIndex
          ? {
              ...step,
              components: step.components
                .filter(component => component.id !== id)
                .map((component, index) => ({ ...component, order: index }))
            }
          : step
      )
    );
  }, [currentStepIndex]);

  const moveComponent = useCallback((draggedId: string, targetId: string) => {
    setSteps(prev => {
      const updatedSteps = [...prev];
      const currentStep = updatedSteps[currentStepIndex];
      if (!currentStep) return prev;

      const components = [...currentStep.components];
      const draggedIndex = components.findIndex(c => c.id === draggedId);
      const targetIndex = components.findIndex(c => c.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const [draggedComponent] = components.splice(draggedIndex, 1);
      components.splice(targetIndex, 0, draggedComponent);
      
      // Update orders
      const updatedComponents = components.map((component, index) => ({
        ...component,
        order: index
      }));
      
      updatedSteps[currentStepIndex] = {
        ...currentStep,
        components: updatedComponents
      };
      
      return updatedSteps;
    });
  }, [currentStepIndex]);

  // Step management functions
  const addStep = useCallback(() => {
    const newStep: QuizStep = {
      id: `step-${Date.now()}`,
      title: `Etapa ${steps.length + 1}`,
      components: []
    };
    
    setSteps(prev => [...prev, newStep]);
    setCurrentStepIndex(steps.length);
  }, [steps.length]);

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
  }, []);

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
  }, [currentStepIndex, steps.length]);

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
  }, [steps]);

  const setStepsFromTemplate = useCallback((newSteps: QuizStep[]) => {
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, []);

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
  }, []);

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
    setStepsFromTemplate,
    saveCurrentState,
    loadSavedState
  };
};
