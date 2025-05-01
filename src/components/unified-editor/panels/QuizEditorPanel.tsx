
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/quiz-builder/components/ComponentsSidebar';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ComponentPreviewPanel } from '@/components/quiz-builder/preview/ComponentPreviewPanel';
import { PropertyPanel } from '@/components/quiz-builder/components/PropertyPanel';
import { StageList } from '@/components/quiz-builder/components/StageList';

interface QuizEditorPanelProps {
  isPreviewing: boolean;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing }) => {
  const {
    components,
    stages,
    activeStageId,
    selectedComponentId,
    addComponent,
    updateComponent,
    deleteComponent,
    moveComponent,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage,
    setSelectedComponentId,
    loading
  } = useQuizBuilder();

  const activeStage = activeStageId
    ? stages.find(s => s.id === activeStageId)
    : null;

  const stageComponents = activeStageId
    ? components.filter(c => c.stageId === activeStageId)
    : [];

  const handleComponentSelect = (type) => {
    if (activeStageId) {
      addComponent(type, activeStageId);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>Carregando editor de quiz...</p>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left Sidebar - Stages & Components */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full flex flex-col border-r border-[#B89B7A]/20">
          {/* Stages List */}
          <div className="p-4 border-b border-[#B89B7A]/20">
            <h3 className="font-medium text-[#432818] mb-2">Etapas do Quiz</h3>
            <StageList 
              stages={stages}
              activeStageId={activeStageId}
              onStageAdd={addStage}
              onStageSelect={setActiveStage}
              onStageUpdate={updateStage}
              onStageDelete={deleteStage}
              onStageMove={moveStage}
            />
          </div>
          
          {/* Components Library */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-4">
                <h3 className="font-medium text-[#432818] mb-2">Componentes</h3>
                {activeStageId ? (
                  <ComponentsSidebar
                    onComponentSelect={handleComponentSelect}
                    activeStage={activeStage}
                  />
                ) : (
                  <div className="text-center p-4 border border-dashed border-[#B89B7A]/40 rounded">
                    <p className="text-[#8F7A6A]">Selecione uma etapa para adicionar componentes</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Middle Panel - Preview */}
      <ResizablePanel defaultSize={55}>
        <ComponentPreviewPanel
          components={stageComponents}
          selectedComponentId={selectedComponentId}
          onSelectComponent={setSelectedComponentId}
          onMoveComponent={moveComponent}
          activeStage={activeStage}
          isPreviewing={isPreviewing}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Right Panel - Properties */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full bg-white border-l border-[#B89B7A]/20 overflow-y-auto">
          <PropertyPanel 
            selectedComponentId={selectedComponentId}
            components={components}
            onUpdate={updateComponent}
            onDelete={deleteComponent}
            onClose={() => setSelectedComponentId(null)}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default QuizEditorPanel;
