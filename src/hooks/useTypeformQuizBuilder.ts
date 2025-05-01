
import { useState, useCallback, useEffect } from 'react';
import { QuizBuilderState, QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';
import { useQuizStages } from './useQuizStages';
import { useQuizComponents } from './useQuizComponents';
import { 
  generateInitialStages, 
  createBuilderStateFromQuiz 
} from '@/services/quizBuilderService';

const STORAGE_KEY = 'typeform_quiz_builder_data';

export const useTypeformQuizBuilder = (
  initialData?: QuizBuilderState
) => {
  const [loading, setLoading] = useState(true);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
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
          } else {
            // Initialize with generated stages if no data is found
            const { stages: initialStages, components: initialComponents } = generateInitialStages();
            initializeStages(initialStages);
            initializeComponents(initialComponents);
            if (initialStages.length > 0) {
              setActiveStage(initialStages[0].id);
            }
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
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          components,
          stages
        }));
      } catch (error) {
        console.error('Error saving quiz data:', error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar as alterações do quiz.",
          variant: "destructive",
        });
      }
    }
  }, [components, stages, loading]);

  const saveCurrentState = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        components,
        stages
      }));
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
  
  // Export quiz data to be used by other components
  const exportQuizData = useCallback(() => {
    return {
      components,
      stages
    };
  }, [components, stages]);

  return {
    components,
    stages,
    activeStageId,
    selectedComponentId,
    addComponent,
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
    loading
  };
};
