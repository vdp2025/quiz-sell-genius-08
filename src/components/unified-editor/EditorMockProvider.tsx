import React, { createContext, useContext, useState, ReactNode } from 'react';
import { QuizStage, QuizComponentData, QuizComponentType } from '@/types/quizBuilder';
import { getDefaultData } from '@/utils/quizComponentDefaults';

// Modelo para demonstração
const DEMO_QUIZ = {
  stages: [
    {
      id: 'welcome',
      title: 'Bem-vindo ao Quiz',
      order: 0,
      type: 'cover' as const,
    },
    {
      id: 'q1',
      title: 'Escolha de Imagem',
      order: 1,
      type: 'question' as const,
    },
    {
      id: 'q2',
      title: 'Preferências',
      order: 2,
      type: 'question' as const,
    },
    {
      id: 'result',
      title: 'Resultado',
      order: 3,
      type: 'result' as const,
    }
  ] as QuizStage[],
  components: [
    {
      id: 'welcome-header',
      type: 'header' as QuizComponentType,
      order: 0,
      stageId: 'welcome',
      data: {
        title: 'Descubra seu Estilo Pessoal',
        subtitle: 'Responda algumas perguntas rápidas para descobrir seu estilo predominante'
      }
    },
    {
      id: 'q1-image',
      type: 'image' as QuizComponentType,
      order: 0,
      stageId: 'q1',
      data: {
        question: 'Qual dessas imagens mais combina com seu estilo?',
        displayType: 'image',
        multiSelect: 1
      }
    },
    {
      id: 'q2-text',
      type: 'singleChoice' as QuizComponentType,
      order: 0,
      stageId: 'q2',
      data: {
        question: 'Como você prefere se vestir no dia a dia?',
        options: ['Confortável e casual', 'Elegante e sofisticado', 'Moderno e arrojado'],
        multiSelect: 1
      }
    }
  ] as QuizComponentData[]
};

interface MockProviderProps {
  children: ReactNode;
}

interface MockEditorContextType {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId: string | null;
  initializeStages: (stages: QuizStage[]) => void;
  initializeComponents: (components: QuizComponentData[]) => void;
  setActiveStage: (id: string) => void;
  saveCurrentState: () => boolean;
  addComponent: (type: QuizComponentType, stageId?: string) => string;
  updateComponent: (id: string, updates: Partial<QuizComponentData>) => void;
  deleteComponent: (id: string) => void;
  updateStage: (id: string, updates: Partial<QuizStage>) => void;
}

const MockEditorContext = createContext<MockEditorContextType | null>(null);

export const useMockEditor = () => {
  const context = useContext(MockEditorContext);
  if (!context) {
    throw new Error('useMockEditor deve ser usado dentro de um EditorMockProvider');
  }
  return context;
};

export const EditorMockProvider: React.FC<MockProviderProps> = ({ children }) => {
  const [components, setComponents] = useState<QuizComponentData[]>(DEMO_QUIZ.components);
  const [stages, setStages] = useState<QuizStage[]>(DEMO_QUIZ.stages);
  const [activeStageId, setActiveStageId] = useState<string | null>(DEMO_QUIZ.stages[0].id);

  const initializeStages = (newStages: QuizStage[]) => {
    setStages(newStages);
  };

  const initializeComponents = (newComponents: QuizComponentData[]) => {
    setComponents(newComponents);
  };

  const setActiveStage = (id: string) => {
    setActiveStageId(id);
  };

  const saveCurrentState = () => {
    console.log('Estado salvo:', { components, stages });
    return true;
  };

  const addComponent = (type: QuizComponentType, stageId?: string): string => {
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type,
      order: components.filter(c => c.stageId === stageId).length,
      stageId: stageId,
      data: getDefaultData(type),
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: '0'
      }
    };

    setComponents(prev => [...prev, newComponent]);
    return newComponent.id;
  };

  const updateComponent = (id: string, updates: Partial<QuizComponentData>) => {
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
  };

  const deleteComponent = (id: string) => {
    setComponents(prev => prev.filter(component => component.id !== id));
  };

  const updateStage = (id: string, updates: Partial<QuizStage>) => {
    setStages(prev => 
      prev.map(stage => 
        stage.id === id 
          ? { ...stage, ...updates } 
          : stage
      )
    );
  };

  const contextValue: MockEditorContextType = {
    components,
    stages,
    activeStageId,
    initializeStages,
    initializeComponents,
    setActiveStage,
    saveCurrentState,
    addComponent,
    updateComponent,
    deleteComponent,
    updateStage
  };

  return (
    <MockEditorContext.Provider value={contextValue}>
      {children}
    </MockEditorContext.Provider>
  );
};

// Hook para substituir o useQuizBuilder
export const useQuizBuilder = () => {
  return useMockEditor();
};

export default EditorMockProvider; 