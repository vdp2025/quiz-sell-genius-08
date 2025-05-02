
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { QuizComponentType, QuizStage } from '@/types/quizBuilder';
import ComponentRenderer from '@/components/quiz-builder/preview/ComponentRenderer';
import PropertiesPanel from '@/components/editor/properties/PropertiesPanel';

interface QuizEditorPanelProps {
  isPreviewing: boolean;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing }) => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
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
  } = useQuizBuilder();

  // Find active stage
  const activeStage = activeStageId 
    ? stages.find(s => s.id === activeStageId) 
    : null;
    
  // Filter components for the active stage
  const stageComponents = activeStageId 
    ? components.filter(c => c.stageId === activeStageId).sort((a, b) => a.order - b.order) 
    : [];

  const handleComponentSelect = (type: string) => {
    if (!activeStageId) return;
    const newComponentId = addComponent(type as QuizComponentType, activeStageId);
    setSelectedComponentId(newComponentId);
  };

  const handleMoveComponent = (draggedId: string, targetId: string) => {
    moveComponent(draggedId, targetId);
  };

  const handleUpdateComponent = (content: any) => {
    if (selectedComponentId) {
      updateComponent(selectedComponentId, { data: content });
    }
  };
  
  const handleDeleteComponent = () => {
    if (selectedComponentId) {
      deleteComponent(selectedComponentId);
      setSelectedComponentId(null);
    }
  };

  const renderStageSelector = () => {
    return (
      <div className="border-b p-2 bg-white">
        <div className="flex flex-wrap gap-2">
          {stages.map((stage) => (
            <Button
              key={stage.id}
              variant={stage.id === activeStageId ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveStage(stage.id)}
            >
              {stage.title || `Etapa ${stage.order + 1}`}
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => addStage('question')}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {renderStageSelector()}
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <UnifiedComponentsSidebar
            activeTab="quiz"
            onComponentSelect={handleComponentSelect}
            activeStageType={activeStage?.type || null}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={55}>
          <div className="h-full bg-[#F9F5F1] flex flex-col">
            <ScrollArea className="flex-1 p-4">
              <div className="min-h-full w-full max-w-4xl mx-auto">
                {stageComponents.length === 0 ? (
                  <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-gray-500 mb-2">
                      {activeStage 
                        ? 'Adicione componentes para esta etapa usando o painel lateral.' 
                        : 'Selecione uma etapa para adicionar componentes.'}
                    </p>
                    {activeStage && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {}}
                        className="text-gray-500"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Adicionar Componente
                      </Button>
                    )}
                  </div>
                ) : (
                  stageComponents.map((component) => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      isSelected={component.id === selectedComponentId}
                      onSelect={() => setSelectedComponentId(component.id)}
                      onMove={handleMoveComponent}
                      isPreviewing={isPreviewing}
                    />
                  ))
                )}
              </div>
            </ScrollArea>
          </div>
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <div className="h-full border-l border-[#B89B7A]/20 bg-white overflow-y-auto">
            <PropertiesPanel
              selectedComponentId={selectedComponentId}
              onClose={() => setSelectedComponentId(null)}
              blocks={[]}
              onUpdate={handleUpdateComponent}
              onDelete={handleDeleteComponent}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default QuizEditorPanel;
