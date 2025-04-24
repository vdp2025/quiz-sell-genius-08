
import React, { useState } from 'react';
import { QuizComponentType, QuizComponentData, QuizStage } from '@/types/quizBuilder/componentTypes';
import { useToast } from '@/components/ui/use-toast';
import BuilderLayout from './layout/BuilderLayout';

export const QuizBuilderContainer: React.FC = () => {
  const [components, setComponents] = useState<QuizComponentData[]>([]);
  const [stages, setStages] = useState<QuizStage[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { toast } = useToast();

  const handleAddStage = (type: QuizStage['type']) => {
    const newStage: QuizStage = {
      id: `stage-${Date.now()}`,
      title: `Nova ${type === 'cover' ? 'Capa' : type === 'question' ? 'Questão' : 'Resultado'}`,
      order: stages.length,
      type
    };
    setStages([...stages, newStage]);
    setActiveStageId(newStage.id);
    
    toast({
      title: "Etapa adicionada",
      description: `Uma nova etapa de ${type === 'cover' ? 'capa' : type === 'question' ? 'questão' : 'resultado'} foi adicionada.`
    });
  };

  const handleUpdateStage = (id: string, updates: Partial<QuizStage>) => {
    setStages(stages.map(stage => stage.id === id ? { ...stage, ...updates } : stage));
  };

  const handleDeleteStage = (id: string) => {
    // Delete all components associated with this stage
    setComponents(components.filter(comp => comp.stageId !== id));
    
    // Delete the stage
    setStages(stages.filter(stage => stage.id !== id));
    
    // If the deleted stage was active, set no active stage
    if (activeStageId === id) {
      setActiveStageId(null);
    }
    
    toast({
      title: "Etapa removida",
      description: "A etapa e todos os seus componentes foram removidos."
    });
  };
  
  const handleAddComponent = (type: string) => {
    if (!activeStageId) return;
    
    // Create a new component with default layout and style
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type: type as QuizComponentType,
      order: components.filter(c => c.stageId === activeStageId).length,
      stageId: activeStageId,
      layout: {
        columns: 1,
        spacing: 'medium',
        alignment: 'left',
        direction: 'vertical',
        containerWidth: 'full'
      },
      style: {
        padding: 'medium',
        margin: 'none',
        shadow: 'none'
      },
      content: {}
    };

    setComponents([...components, newComponent]);
    setSelectedComponentId(newComponent.id);
    
    toast({
      title: "Componente adicionado",
      description: `Um novo componente do tipo ${type} foi adicionado.`
    });
  };

  const handleUpdateComponent = (id: string, updates: Partial<QuizComponentData>) => {
    setComponents(components.map(comp => comp.id === id ? { ...comp, ...updates } : comp));
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(comp => comp.id !== id));
    
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
    
    toast({
      title: "Componente removido",
      description: "O componente foi removido."
    });
  };

  const handleMoveComponent = (draggedId: string, targetId: string) => {
    const draggedComp = components.find(c => c.id === draggedId);
    const targetComp = components.find(c => c.id === targetId);
    
    if (!draggedComp || !targetComp || draggedComp.stageId !== targetComp.stageId) {
      return;
    }
    
    // Reorder components
    const stageComponents = components.filter(c => c.stageId === draggedComp.stageId);
    const draggedIndex = stageComponents.findIndex(c => c.id === draggedId);
    const targetIndex = stageComponents.findIndex(c => c.id === targetId);
    
    const newOrder = [...stageComponents];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    
    const updatedComponents = components.map(comp => {
      if (comp.stageId === draggedComp.stageId) {
        const index = newOrder.findIndex(c => c.id === comp.id);
        return { ...comp, order: index };
      }
      return comp;
    });
    
    setComponents(updatedComponents);
  };

  const handleMoveStage = (draggedId: string, targetId: string) => {
    const draggedIndex = stages.findIndex(s => s.id === draggedId);
    const targetIndex = stages.findIndex(s => s.id === targetId);
    
    if (draggedIndex === -1 || targetIndex === -1) {
      return;
    }
    
    const newOrder = [...stages];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    
    const updatedStages = newOrder.map((stage, index) => ({
      ...stage,
      order: index
    }));
    
    setStages(updatedStages);
  };

  const activeStage = activeStageId ? stages.find(s => s.id === activeStageId) || null : null;

  return (
    <BuilderLayout
      components={components}
      stages={stages}
      activeStageId={activeStageId}
      selectedComponentId={selectedComponentId}
      activeStage={activeStage}
      isPreviewing={isPreviewing}
      onComponentSelect={handleAddComponent}
      onStageAdd={handleAddStage}
      onStageSelect={setActiveStageId}
      onComponentMove={handleMoveComponent}
      onStageMove={handleMoveStage}
      onStageUpdate={handleUpdateStage}
      onStageDelete={handleDeleteStage}
      onComponentUpdate={handleUpdateComponent}
      onComponentDelete={handleDeleteComponent}
      onSelectComponent={setSelectedComponentId}
    />
  );
};

export default QuizBuilderContainer;
