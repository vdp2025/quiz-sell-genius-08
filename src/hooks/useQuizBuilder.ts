import { useState, useCallback, useEffect } from 'react';
import { QuizComponentType, QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';

// Chave para armazenamento no localStorage
const STORAGE_KEY = 'quiz_builder_data';

export const useQuizBuilder = () => {
  const [components, setComponents] = useState<QuizComponentData[]>([]);
  const [stages, setStages] = useState<QuizStage[]>([]);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setComponents(parsedData.components || []);
          setStages(parsedData.stages || []);
          
          // Set active stage to first stage if available
          if (parsedData.stages && parsedData.stages.length > 0) {
            setActiveStageId(parsedData.stages[0].id);
          }
        } else {
          // Se não houver dados salvos, criar um estágio de capa padrão
          const defaultStageId = `stage-${Date.now()}`;
          const defaultStage: QuizStage = {
            id: defaultStageId,
            title: 'Capa do Quiz',
            order: 0,
            type: 'cover'
          };
          
          const defaultHeader: QuizComponentData = {
            id: `component-${Date.now()}`,
            type: 'header',
            order: 0,
            stageId: defaultStageId,
            data: { 
              title: 'Descubra Seu Estilo Pessoal', 
              subtitle: 'Responda às perguntas e descubra qual estilo combina mais com você' 
            },
            style: {
              paddingY: '32',
              paddingX: '16',
              backgroundColor: '',
              textColor: '',
              borderRadius: 0
            }
          };
          
          setStages([defaultStage]);
          setComponents([defaultHeader]);
          setActiveStageId(defaultStageId);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do quiz:', error);
        // Iniciar com arrays vazios em caso de erro
        setComponents([]);
        setStages([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Salvar dados no localStorage sempre que houver mudanças
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          components,
          stages
        }));
      } catch (error) {
        console.error('Erro ao salvar dados do quiz:', error);
        toast({
          title: "Erro ao salvar",
          description: "Não foi possível salvar as alterações do quiz.",
          variant: "destructive",
        });
      }
    }
  }, [components, stages, loading]);

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
          options: ['Opção 1', 'Opção 2', 'Opção 3'],
          required: true,
          multiSelect: 1 
        };
      case 'singleChoice':
        return { 
          question: 'Sua pergunta aqui?', 
          options: ['Opção 1', 'Opção 2', 'Opção 3'],
          required: true
        };
      case 'scale':
        return { 
          question: 'Em uma escala de 1 a 5, como você avalia...?', 
          min: 1, 
          max: 5, 
          minLabel: 'Discordo Totalmente', 
          maxLabel: 'Concordo Totalmente',
          required: true
        };
      case 'stageCover':
        return {
          title: 'Descubra Seu Estilo Pessoal',
          subtitle: 'Responda às perguntas e descubra qual estilo combina mais com você',
          backgroundImage: '',
          logoImage: ''
        };
      case 'stageQuestion':
        return {
          question: 'Sua pergunta aqui?',
          description: 'Descrição ou instrução opcional',
          options: [
            { text: 'Opção 1', imageUrl: '', styleCategory: 'Natural' },
            { text: 'Opção 2', imageUrl: '', styleCategory: 'Clássico' },
            { text: 'Opção 3', imageUrl: '', styleCategory: 'Contemporâneo' }
          ],
          multiSelect: 3,
          required: true,
          layout: 'grid'
        };
      case 'stageResult':
        return {
          title: 'Seu Resultado',
          description: 'Descrição do resultado',
          showPrimaryStyle: true,
          showSecondaryStyles: true,
          showOfferSection: true
        };
      default:
        return {};
    }
  };

  const addComponent = useCallback((type: QuizComponentType, stageId?: string): string => {
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type,
      order: components.filter(c => c.stageId === stageId).length,
      stageId: stageId || activeStageId || undefined,
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
  }, [components, activeStageId]);

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
      
      // Reorder components within the same stage
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
      
      // Update order for components in this stage
      const updatedStageComponents = newStageComponents.map((component, index) => ({
        ...component,
        order: index
      }));
      
      // Replace just the components for this stage, keeping others untouched
      return prev.map(component => {
        if (component.stageId === draggedComponent.stageId) {
          const updatedComponent = updatedStageComponents.find(c => c.id === component.id);
          return updatedComponent || component;
        }
        return component;
      });
    });
  }, []);

  const addStage = useCallback((type: QuizStage['type']): string => {
    const stageNumber = stages.length + 1;
    let stageTitle = '';
    
    switch (type) {
      case 'cover':
        stageTitle = 'Etapa 1: Capa do Quiz';
        break;
      case 'question':
        stageTitle = `Etapa ${stageNumber}: Questão ${stages.filter(s => s.type === 'question').length + 1}`;
        break;
      case 'result':
        stageTitle = `Etapa ${stageNumber}: Página de Resultado`;
        break;
    }
    
    const newStage: QuizStage = {
      id: `stage-${Date.now()}`,
      title: stageTitle,
      order: stages.length,
      type
    };
    
    setStages(prev => [...prev, newStage]);
    
    // Add default component based on stage type
    let componentType: QuizComponentType;
    
    switch (type) {
      case 'cover':
        componentType = 'header';
        break;
      case 'question':
        componentType = 'multipleChoice';
        break;
      case 'result':
        componentType = 'quizResult';
        break;
      default:
        componentType = 'text';
    }
    
    const componentId = `component-${Date.now() + 1}`;
    const newComponent: QuizComponentData = {
      id: componentId,
      type: componentType,
      order: 0,
      stageId: newStage.id,
      data: getDefaultData(componentType),
      style: {
        paddingY: '16',
        paddingX: '16',
        backgroundColor: '',
        textColor: '',
        borderRadius: 0
      }
    };
    
    setComponents(prev => [...prev, newComponent]);
    
    // Update the stage with the component ID
    const updatedStage = { ...newStage, componentId };
    setStages(prev => prev.map(s => s.id === newStage.id ? updatedStage : s));
    
    return newStage.id;
  }, [stages, getDefaultData]);

  const updateStage = useCallback((id: string, updates: Partial<QuizStage>) => {
    setStages(prev => 
      prev.map(stage => 
        stage.id === id ? { ...stage, ...updates } : stage
      )
    );
  }, []);

  const deleteStage = useCallback((id: string) => {
    // Delete all components associated with this stage
    setComponents(prev => prev.filter(component => component.stageId !== id));
    
    setStages(prev => {
      const filteredStages = prev.filter(stage => stage.id !== id);
      // Reorder remaining stages
      return filteredStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
    });
    
    // If we're deleting the active stage, set another one as active
    if (id === activeStageId) {
      setActiveStageId(prev => {
        const remainingStages = stages.filter(stage => stage.id !== id);
        return remainingStages.length > 0 ? remainingStages[0].id : null;
      });
    }
  }, [stages, activeStageId]);

  const moveStage = useCallback((draggedId: string, targetId: string) => {
    setStages(prev => {
      const draggedIndex = prev.findIndex(s => s.id === draggedId);
      const targetIndex = prev.findIndex(s => s.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newStages = [...prev];
      const [draggedStage] = newStages.splice(draggedIndex, 1);
      newStages.splice(targetIndex, 0, draggedStage);
      
      return newStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
    });
  }, []);

  const setActiveStage = useCallback((stageId: string | null) => {
    setActiveStageId(stageId);
  }, []);

  return {
    components,
    stages,
    activeStageId,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    loading
  };
};
