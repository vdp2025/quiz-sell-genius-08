
import { useState, useCallback } from 'react';
import { QuizComponentData, QuizComponentType } from '@/types/quizBuilder';
import { createComponent } from '@/utils/componentCreator';

export const useQuizComponents = () => {
  const [components, setComponents] = useState<QuizComponentData[]>([]);

  const initializeComponents = useCallback((initialComponents: QuizComponentData[]) => {
    setComponents(initialComponents);
  }, []);

  const addComponent = useCallback((type: string, stageId: string, initialData: Partial<QuizComponentData['data']> = {}) => {
    const order = components.filter(c => c.stageId === stageId).length;
    
    const componentTemplate = {
      type: type as QuizComponentType,
      data: initialData
    };
    
    const newComponent = createComponent(componentTemplate, stageId, order);
    
    setComponents(prev => [...prev, newComponent]);
    return newComponent.id;
  }, [components]);

  const updateComponent = useCallback((id: string, updates: Partial<QuizComponentData>) => {
    setComponents(prev => prev.map(component => 
      component.id === id
        ? { ...component, ...updates }
        : component
    ));
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setComponents(prev => {
      const componentToDelete = prev.find(c => c.id === id);
      if (!componentToDelete) return prev;
      
      const stageId = componentToDelete.stageId;
      const remainingComponents = prev.filter(c => c.id !== id);
      
      // Reorder remaining components in the same stage
      const updatedComponents = remainingComponents.map(component => {
        if (component.stageId === stageId && component.order > componentToDelete.order) {
          return {
            ...component,
            order: component.order - 1
          };
        }
        return component;
      });
      
      return updatedComponents;
    });
  }, []);

  const moveComponent = useCallback((draggedId: string, targetId: string) => {
    setComponents(prev => {
      const draggedIndex = prev.findIndex(c => c.id === draggedId);
      const targetIndex = prev.findIndex(c => c.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const draggedComponent = prev[draggedIndex];
      const targetComponent = prev[targetIndex];
      
      // Only allow reordering within the same stage
      if (draggedComponent.stageId !== targetComponent.stageId) return prev;
      
      const updatedComponents = [...prev];
      updatedComponents.splice(draggedIndex, 1);
      updatedComponents.splice(targetIndex, 0, draggedComponent);
      
      // Update orders
      const stageId = draggedComponent.stageId;
      return updatedComponents.map((component, index) => {
        if (component.stageId === stageId) {
          const stageComponents = updatedComponents.filter(c => c.stageId === stageId);
          const stageOrder = stageComponents.findIndex(c => c.id === component.id);
          return {
            ...component,
            order: stageOrder
          };
        }
        return component;
      });
    });
  }, []);

  return {
    components,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    initializeComponents
  };
};
