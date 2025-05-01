import { useState, useCallback, useEffect } from 'react';
import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';
import { useQuizStages } from './useQuizStages';
import { useQuizComponents } from './useQuizComponents';
import { 
  generateInitialStages, 
  createBuilderStateFromQuiz,
  loadQuizResultConfig,
  createBuilderStateFromResultPage
} from '@/services/quizBuilderService';

const STORAGE_KEY = 'typeform_quiz_builder_data';

export const useTypeformQuizBuilder = (
  initialData?: QuizBuilderState
) => {
  const [loading, setLoading] = useState(true);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [history, setHistory] = useState<QuizBuilderState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const {
    stages,
    activeStageId,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    initializeStages
  } = useQuizStages();
  
  const {
    components,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    initializeComponents
  } = useQuizComponents();

  // Add a state to history when it changes
  const addToHistory = useCallback((state: QuizBuilderState) => {
    setHistory(prev => {
      // If we're not at the end of the history, truncate it
      const newHistory = prev.slice(0, historyIndex + 1);
      return [...newHistory, state];
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  // Load data from localStorage or initialData on initialization
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      try {
        if (initialData) {
          // Use the provided initial data if available
          initializeStages(initialData.stages);
          initializeComponents(initialData.components);
          
          if (initialData.stages && initialData.stages.length > 0) {
            setActiveStage(initialData.stages[0].id);
          }
          
          // Initialize history with the initial state
          const initialState = { 
            components: initialData.components, 
            stages: initialData.stages,
            activeStageId: initialData.stages[0]?.id || null
          };
          setHistory([initialState]);
          setHistoryIndex(0);
        } else {
          // Try to load from localStorage
          const savedData = localStorage.getItem(STORAGE_KEY);
          if (savedData) {
            const parsedData = JSON.parse(savedData);
            initializeStages(parsedData.stages);
            initializeComponents(parsedData.components);
            
            if (parsedData.stages && parsedData.stages.length > 0) {
              setActiveStage(parsedData.stages[0].id);
            }
            
            // Initialize history with the loaded state
            const loadedState = { 
              components: parsedData.components, 
              stages: parsedData.stages,
              activeStageId: parsedData.stages[0]?.id || null
            };
            setHistory([loadedState]);
            setHistoryIndex(0);
          } else {
            // Initialize with generated stages if no data is found
            const { stages: initialStages, components: initialComponents } = generateInitialStages();
            initializeStages(initialStages);
            initializeComponents(initialComponents);
            if (initialStages.length > 0) {
              setActiveStage(initialStages[0].id);
            }
            
            // Initialize history with the generated state
            const generatedState = { 
              components: initialComponents, 
              stages: initialStages,
              activeStageId: initialStages[0]?.id || null
            };
            setHistory([generatedState]);
            setHistoryIndex(0);
          }
        }
      } catch (error) {
        console.error('Error loading quiz data:', error);
        // Fallback to generated stages if there's an error
        const { stages: initialStages, components: initialComponents } = generateInitialStages();
        initializeStages(initialStages);
        initializeComponents(initialComponents);
        if (initialStages.length > 0) {
          setActiveStage(initialStages[0].id);
        }
        
        // Initialize history with the fallback state
        const fallbackState = { 
          components: initialComponents, 
          stages: initialStages,
          activeStageId: initialStages[0]?.id || null
        };
        setHistory([fallbackState]);
        setHistoryIndex(0);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [initializeComponents, initializeStages, setActiveStage, initialData]);

  // Reset selected component when active stage changes
  useEffect(() => {
    setSelectedComponentId(null);
  }, [activeStageId]);

  // Save data to localStorage on changes
  useEffect(() => {
    if (!loading) {
      try {
        const currentState = {
          components,
          stages,
          activeStageId
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          components,
          stages
        }));
        
        // Only add to history if there are actual changes
        if (
          history.length === 0 || 
          JSON.stringify(currentState.components) !== JSON.stringify(history[historyIndex]?.components) ||
          JSON.stringify(currentState.stages) !== JSON.stringify(history[historyIndex]?.stages)
        ) {
          addToHistory(currentState);
        }
      } catch (error) {
        console.error('Error saving quiz data:', error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar as alterações do quiz.",
          variant: "destructive",
        });
      }
    }
  }, [components, stages, loading, history, historyIndex, activeStageId, addToHistory]);

  // Enhanced addComponent function with better defaults based on stage type
  const handleAddComponent = useCallback((type: string, stageId: string) => {
    const stage = stages.find(s => s.id === stageId);
    
    // Initialize with specialized defaults based on component and stage type
    let initialData: Partial<QuizComponentData['data']> = {};
    
    // Set defaults based on component type
    if (type === 'stageCover') {
      initialData = {
        title: 'Descubra Seu Estilo',
        subtitle: 'Responda algumas perguntas e descubra seu estilo predominante',
        buttonText: 'Iniciar Quiz',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: '32',
        paddingX: '16'
      };
    } else if (type === 'stageQuestion') {
      initialData = {
        question: 'Qual opção melhor descreve seu estilo?',
        options: ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'],
        optionImages: ['', '', '', ''],
        optionStyleCategories: ['', '', '', ''],
        optionScores: [0, 0, 0, 0],
        displayType: 'text',
        multiSelect: 0,
        required: true,
        autoAdvance: false,
        layout: { columns: 1, direction: 'vertical' },
        selectionIndicator: 'border',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: '24',
        paddingX: '16'
      };
    } else if (type === 'stageResult') {
      initialData = {
        title: 'Seu Resultado de Estilo',
        primaryStyleTitle: 'Seu Estilo Predominante',
        secondaryStylesTitle: 'Estilos Complementares',
        showPercentages: true,
        showDescriptions: true,
        callToActionText: 'Ver Recomendações',
        accentColor: '#B89B7A',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        paddingY: '32',
        paddingX: '16'
      };
    } else if (type === 'text') {
      initialData = {
        title: '',
        text: 'Insira seu texto aqui...',
        paddingY: '16',
        paddingX: '16'
      };
    } else if (type === 'image') {
      initialData = {
        imageUrl: '',
        alt: '',
        title: '',
        imageSize: 'medium',
        paddingY: '16',
        paddingX: '16'
      };
    }
    
    // Check if this type of component already exists in the stage
    const existingComponent = components.find(c => 
      c.stageId === stageId && 
      (c.type === 'stageCover' || c.type === 'stageQuestion' || c.type === 'stageResult') &&
      c.type === type
    );
    
    // Don't allow multiple main components per stage
    if (existingComponent && (type === 'stageCover' || type === 'stageQuestion' || type === 'stageResult')) {
      toast({
        title: "Componente já existe",
        description: `Esta etapa já possui um componente do tipo ${type}`,
        variant: "destructive"
      });
      return;
    }
    
    const componentId = addComponent(type, stageId, initialData);
    setSelectedComponentId(componentId);
    
    return componentId;
  }, [addComponent, components, stages, setSelectedComponentId, toast]);

  const saveCurrentState = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        components,
        stages
      }));
      
      toast({
        title: "Alterações salvas",
        description: "Todas as alterações foram salvas com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving quiz data:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações do quiz.",
        variant: "destructive",
      });
      return false;
    }
  }, [components, stages]);
  
  // Handle component updates with enhanced styling options
  const handleUpdateComponent = useCallback((id: string, updates: Partial<QuizComponentData['data']>) => {
    updateComponent(id, { data: updates });
  }, [updateComponent]);
  
  // Undo functionality
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const previousState = history[historyIndex - 1];
      initializeStages(previousState.stages);
      initializeComponents(previousState.components);
      
      if (previousState.activeStageId) {
        setActiveStage(previousState.activeStageId);
      }
      
      setHistoryIndex(historyIndex - 1);
      
      toast({
        title: "Desfazer",
        description: "Última alteração desfeita",
      });
    }
  }, [history, historyIndex, initializeStages, initializeComponents, setActiveStage]);
  
  // Redo functionality
  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      initializeStages(nextState.stages);
      initializeComponents(nextState.components);
      
      if (nextState.activeStageId) {
        setActiveStage(nextState.activeStageId);
      }
      
      setHistoryIndex(historyIndex + 1);
      
      toast({
        title: "Refazer",
        description: "Alteração refeita",
      });
    }
  }, [history, historyIndex, initializeStages, initializeComponents, setActiveStage]);
  
  // Export quiz data to be used by other components
  const exportQuizData = useCallback(() => {
    return {
      components,
      stages
    };
  }, [components, stages]);
  
  // Import quiz data
  const importQuizData = useCallback((data: QuizBuilderState) => {
    try {
      initializeStages(data.stages);
      initializeComponents(data.components);
      
      if (data.stages && data.stages.length > 0) {
        setActiveStage(data.stages[0].id);
      }
      
      toast({
        title: "Quiz importado",
        description: "Os dados do quiz foram importados com sucesso.",
      });
      
      return true;
    } catch (error) {
      console.error('Error importing quiz data:', error);
      toast({
        title: "Erro ao importar",
        description: "Não foi possível importar os dados do quiz.",
        variant: "destructive",
      });
      return false;
    }
  }, [initializeStages, initializeComponents, setActiveStage]);

  return {
    components,
    stages,
    activeStageId,
    selectedComponentId,
    addComponent: handleAddComponent,
    updateComponent: handleUpdateComponent,
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    setSelectedComponentId,
    saveCurrentState,
    exportQuizData,
    importQuizData,
    undo,
    redo,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    loading
  };
};
