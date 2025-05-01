
import { useState, useCallback } from 'react';
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder';
import { getDefaultData } from '@/utils/quizComponentDefaults';

// Template presets for components
const componentPresets = {
  'stageQuestion': {
    'image-grid': {
      displayType: 'both',
      layout: { columns: 2, direction: 'vertical' },
      imageSize: 'medium',
      selectionIndicator: 'border',
      optionStyle: 'card',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
      optionImages: [
        'https://placehold.co/400x300?text=Opção+1',
        'https://placehold.co/400x300?text=Opção+2',
        'https://placehold.co/400x300?text=Opção+3',
        'https://placehold.co/400x300?text=Opção+4'
      ]
    },
    'modern-cards': {
      displayType: 'both',
      layout: { columns: 2, direction: 'vertical' },
      imageSize: 'small',
      selectionIndicator: 'checkbox',
      optionStyle: 'modern',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
      backgroundColorQuestion: '#F9F5F1'
    },
    'list-style': {
      displayType: 'text',
      layout: { columns: 1, direction: 'vertical' },
      selectionIndicator: 'highlight',
      optionStyle: 'minimal',
      options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']
    }
  },
  'stageCover': {
    'modern': {
      title: 'Descubra seu estilo',
      subtitle: 'Responda algumas perguntas para descobrir seu estilo único',
      buttonText: 'Começar agora',
      imageUrl: 'https://placehold.co/800x400?text=Imagem+de+Capa',
      backgroundColor: '#FFFAF0',
      textColor: '#432818'
    },
    'minimal': {
      title: 'Quiz de Estilo',
      subtitle: 'Descubra seu estilo em apenas alguns minutos',
      buttonText: 'Iniciar',
      backgroundColor: '#FFFFFF',
      textColor: '#1A1818'
    },
    'video': {
      title: 'Quiz Interativo',
      subtitle: 'Assista o vídeo e descubra seu estilo único',
      buttonText: 'Começar Quiz',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      backgroundColor: '#F9F5F1',
      textColor: '#432818'
    }
  },
  'stageResult': {
    'modern': {
      resultTitle: 'Seu Estilo Predominante',
      resultDescription: 'Baseado nas suas respostas, identificamos seu estilo principal',
      showPercentages: true,
      showDescriptions: true,
      callToActionText: 'Ver recomendações',
      accentColor: '#B89B7A'
    },
    'chart': {
      resultTitle: 'Análise Detalhada',
      resultDescription: 'Veja a distribuição dos seus estilos',
      showChart: true,
      showPercentages: true, 
      chartType: 'radar',
      accentColor: '#B89B7A'
    }
  },
  'benefitsList': {
    'checkmarks': {
      title: 'Benefícios',
      benefits: [
        'Descubra seu estilo único',
        'Receba recomendações personalizadas',
        'Aprenda a valorizar suas características',
        'Economize tempo e dinheiro com escolhas acertadas'
      ],
      iconType: 'checkmark',
      layout: { columns: 1, direction: 'vertical' }
    }
  },
  'callToAction': {
    'highlight': {
      title: 'Pronto para transformar seu estilo?',
      subtitle: 'Acesse agora as recomendações exclusivas para o seu perfil',
      ctaText: 'Acessar recomendações',
      ctaUrl: '#',
      backgroundColor: '#B89B7A',
      textColor: '#FFFFFF'
    }
  },
  'testimonial': {
    'card': {
      authorName: 'Maria Silva',
      authorRole: 'Cliente satisfeita',
      authorImageUrl: 'https://placehold.co/100x100?text=Maria',
      testimonialText: 'O quiz mudou minha vida! Agora sei exatamente qual é meu estilo e como valorizá-lo.',
      rating: 5
    }
  },
  'countdownTimer': {
    'simple': {
      title: 'Oferta por tempo limitado',
      subtitle: 'Esta oferta expira em:',
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      showDays: true,
      showHours: true,
      showMinutes: true,
      showSeconds: true
    }
  }
};

// Helper function to get preset data for a component type and preset name
const getPresetData = (type: QuizComponentType, preset?: string) => {
  if (!preset || !componentPresets[type]) {
    return getDefaultData(type);
  }
  
  const presetData = componentPresets[type][preset];
  if (!presetData) {
    return getDefaultData(type);
  }
  
  return { ...getDefaultData(type), ...presetData };
};

export const useQuizComponents = () => {
  const [components, setComponents] = useState<QuizComponentData[]>([]);

  const initializeComponents = useCallback((initialComponents: QuizComponentData[]) => {
    setComponents(initialComponents);
  }, []);

  const addComponent = useCallback((type: QuizComponentType, stageId?: string, preset?: string): string => {
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type,
      order: components.filter(c => c.stageId === stageId).length,
      stageId: stageId,
      data: getPresetData(type, preset),
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: '8' // Changed from number to string to match the interface
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
    setComponents(prev => {
      const filteredComponents = prev.filter(component => component.id !== id);
      
      const stageId = prev.find(c => c.id === id)?.stageId;
      
      if (stageId) {
        return filteredComponents.map(component => {
          if (component.stageId === stageId) {
            const stageComponents = filteredComponents.filter(c => c.stageId === stageId);
            const index = stageComponents.indexOf(component);
            return { ...component, order: index };
          }
          return component;
        });
      }
      
      return filteredComponents;
    });
  }, []);

  const moveComponent = useCallback((draggedId: string, targetId: string) => {
    setComponents(prev => {
      const draggedComponent = prev.find(c => c.id === draggedId);
      const targetComponent = prev.find(c => c.id === targetId);
      
      if (!draggedComponent || !targetComponent || draggedComponent.stageId !== targetComponent.stageId) {
        return prev;
      }
      
      const stageComponents = prev.filter(c => c.stageId === draggedComponent.stageId);
      const draggedIndex = stageComponents.findIndex(c => c.id === draggedId);
      const targetIndex = stageComponents.findIndex(c => c.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newStageComponents = [...stageComponents];
      const [removedComponent] = newStageComponents.splice(draggedIndex, 1);
      newStageComponents.splice(targetIndex, 0, removedComponent);
      
      const updatedStageComponents = newStageComponents.map((component, index) => ({
        ...component,
        order: index
      }));
      
      return prev.map(component => {
        if (component.stageId === draggedComponent.stageId) {
          const updatedComponent = updatedStageComponents.find(c => c.id === component.id);
          return updatedComponent || component;
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
