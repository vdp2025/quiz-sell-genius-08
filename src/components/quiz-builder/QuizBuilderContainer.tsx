
import React, { useState } from 'react';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizStage, QuizComponentType } from '@/types/quizBuilder';
import BuilderLayout from './layout/BuilderLayout';
import BuilderToolbar from './toolbar/BuilderToolbar';
import QuizPreview from './preview/QuizPreview';
import { toast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

export const QuizBuilderContainer: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [isPreviewing, setIsPreviewing] = useState(false);
  
  const { 
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
    saveCurrentState,
    loading
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    if (!activeStageId) {
      toast({
        title: "Nenhuma etapa selecionada",
        description: "Selecione uma etapa antes de adicionar componentes.",
      });
      return;
    }
    
    const newComponentId = addComponent(type, activeStageId);
    setSelectedComponentId(newComponentId);
  };

  const handleSave = () => {
    const success = saveCurrentState();
    if (success) {
      toast({
        title: "Quiz salvo",
        description: "Todas as alterações foram salvas com sucesso.",
      });
    }
  };

  const activeStage = activeStageId
    ? stages.find(s => s.id === activeStageId)
    : null;

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#1A1F2C]">
        <Loader2 className="h-12 w-12 text-[#9b87f5] animate-spin mb-4" />
        <p className="text-white text-lg">Carregando construtor de quiz...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1A1F2C]">
      <BuilderToolbar
        activeView={activeView}
        isPreviewing={isPreviewing}
        onViewChange={setActiveView}
        onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
        onSave={handleSave}
      />
      
      <div className="flex-1 overflow-hidden">
        {activeView === 'editor' ? (
          <BuilderLayout
            components={components}
            stages={stages}
            activeStageId={activeStageId}
            selectedComponentId={selectedComponentId}
            activeStage={activeStage}
            isPreviewing={isPreviewing}
            onComponentSelect={handleComponentSelect}
            onStageAdd={addStage}
            onStageSelect={setActiveStage}
            onComponentMove={moveComponent}
            onStageMove={moveStage}
            onStageUpdate={updateStage}
            onStageDelete={deleteStage}
            onComponentUpdate={updateComponent}
            onComponentDelete={deleteComponent}
            onSelectComponent={setSelectedComponentId}
          />
        ) : (
          <QuizPreview 
            stages={stages}
            components={components}
          />
        )}
      </div>
    </div>
  );
};

export default QuizBuilderContainer;
