
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '../ComponentsSidebar';
import { PropertiesPanel } from '../PropertiesPanel';
import { PreviewPanel } from '../PreviewPanel';
import { StagesPanel } from '../StagesPanel';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';

interface BuilderLayoutProps {
  components: QuizComponentData[];
  stages: QuizStage[];
  activeStageId: string | null;
  selectedComponentId: string | null;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
  onComponentSelect: (type: string) => void;
  onStageAdd: (type: QuizStage['type']) => void;
  onStageSelect: (id: string) => void;
  onComponentMove: (draggedId: string, targetId: string) => void;
  onStageMove: (draggedId: string, targetId: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
  onComponentUpdate: (id: string, updates: Partial<QuizComponentData>) => void;
  onComponentDelete: (id: string) => void;
}

const BuilderLayout: React.FC<BuilderLayoutProps> = ({
  components,
  stages,
  activeStageId,
  selectedComponentId,
  activeStage,
  isPreviewing,
  onComponentSelect,
  onStageAdd,
  onStageSelect,
  onComponentMove,
  onStageMove,
  onStageUpdate,
  onStageDelete,
  onComponentUpdate,
  onComponentDelete,
}) => {
  const activeStageComponents = activeStageId 
    ? components.filter(c => c.stageId === activeStageId)
    : [];

  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId) 
    : null;

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left Panel - Stages Sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full flex flex-col">
          <div className="p-3 border-b bg-[#FAF9F7] flex justify-between items-center">
            <h2 className="font-medium text-[#432818]">Etapas do Quiz</h2>
          </div>
          <div className="flex-1 overflow-auto">
            <StagesPanel 
              stages={stages} 
              activeStageId={activeStageId}
              onStageSelect={onStageSelect}
              onStageMove={onStageMove}
              onStageUpdate={onStageUpdate}
              onStageDelete={onStageDelete}
            />
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Components Sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <ComponentsSidebar 
          onComponentSelect={onComponentSelect} 
          activeStage={activeStage}
        />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Center Panel - Preview */}
      <ResizablePanel defaultSize={35}>
        <PreviewPanel 
          components={activeStageComponents}
          selectedComponentId={selectedComponentId}
          onSelectComponent={onStageSelect}
          onMoveComponent={onComponentMove}
          activeStage={activeStage}
          isPreviewing={isPreviewing}
        />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Right Panel - Properties */}
      <ResizablePanel defaultSize={25}>
        <PropertiesPanel 
          component={selectedComponent}
          stage={activeStage}
          onClose={() => onStageSelect('')}
          onUpdate={onComponentUpdate}
          onUpdateStage={onStageUpdate}
          onDelete={onComponentDelete}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default BuilderLayout;
