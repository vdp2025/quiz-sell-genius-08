
import { useCallback } from 'react';
import { QuizComponentType, QuizComponentData, QuizStep } from '@/types/quizBuilder';

export const useQuizComponents = (
  currentStepIndex: number,
  setSteps: React.Dispatch<React.SetStateAction<QuizStep[]>>,
  components: QuizComponentData[]
) => {
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
        return { 
          question: 'Em uma escala de 1 a 5, como você avalia...?', 
          min: 1, 
          max: 5, 
          minLabel: 'Discordo Totalmente', 
          maxLabel: 'Concordo Totalmente' 
        };
      default:
        return {};
    }
  };

  const addComponent = useCallback((type: QuizComponentType): string => {
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
  }, [currentStepIndex, components.length, setSteps]);

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
  }, [currentStepIndex, setSteps]);

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
  }, [currentStepIndex, setSteps]);

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
  }, [currentStepIndex, setSteps]);

  return {
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent
  };
};
