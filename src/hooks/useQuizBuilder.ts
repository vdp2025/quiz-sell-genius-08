
import { useState, useCallback } from 'react';
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder';

export const useQuizBuilder = () => {
  const [components, setComponents] = useState<QuizComponentData[]>([]);

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
        return { question: 'Sua pergunta aqui?', options: ['Opção 1', 'Opção 2', 'Opção 3'] };
      case 'singleChoice':
        return { question: 'Sua pergunta aqui?', options: ['Opção 1', 'Opção 2', 'Opção 3'] };
      case 'scale':
        return { question: 'Em uma escala de 1 a 5, como você avalia...?', min: 1, max: 5, minLabel: 'Discordo Totalmente', maxLabel: 'Concordo Totalmente' };
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

    setComponents(prev => [...prev, newComponent]);
    return newComponent.id;
  }, [components]);

  const updateComponent = useCallback((id: string, updates: Partial<QuizComponentData>) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === id 
          ? { 
              ...component, 
              ...updates,
              data: updates.data ? { ...component.data, ...updates.data } : component.data,
              style: updates.style ? { ...component.style, ...updates.style } : component.style
            } 
          : component
      )
    );
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setComponents(prev => 
      prev.filter(component => component.id !== id)
        .map((component, index) => ({ ...component, order: index }))
    );
  }, []);

  const moveComponent = useCallback((draggedId: string, targetId: string) => {
    setComponents(prev => {
      const draggedIndex = prev.findIndex(c => c.id === draggedId);
      const targetIndex = prev.findIndex(c => c.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newComponents = [...prev];
      const [draggedComponent] = newComponents.splice(draggedIndex, 1);
      newComponents.splice(targetIndex, 0, draggedComponent);
      
      return newComponents.map((component, index) => ({
        ...component,
        order: index
      }));
    });
  }, []);

  return {
    components,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent
  };
};
