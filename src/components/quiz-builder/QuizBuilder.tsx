
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewPanel } from './PreviewPanel';
import { LoadExistingQuiz } from './LoadExistingQuiz';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(true);
  const { 
    components, 
    addComponent, 
    updateComponent, 
    deleteComponent,
    moveComponent,
    setComponents
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type);
    setSelectedComponentId(newComponentId);
  };

  const handleLoadExistingQuiz = (loadedComponents: QuizComponentData[]) => {
    setComponents(loadedComponents);
    setIsLoadingExisting(false);
  };

  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId) 
    : null;

  if (isLoadingExisting) {
    return <LoadExistingQuiz onLoadQuiz={handleLoadExistingQuiz} />;
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h1 className="text-2xl font-playfair text-[#432818]">
          Construtor de Quiz
        </h1>
      </div>
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Components Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar onComponentSelect={handleComponentSelect} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Center Panel - Preview */}
        <ResizablePanel defaultSize={50}>
          <PreviewPanel 
            components={components}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
            onMoveComponent={moveComponent}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Panel - Properties */}
        <ResizablePanel defaultSize={30}>
          <PropertiesPanel 
            component={selectedComponent}
            onClose={() => setSelectedComponentId(null)}
            onUpdate={(data: Partial<QuizComponentData>) => {
              if (selectedComponentId) {
                updateComponent(selectedComponentId, data);
              }
            }}
            onDelete={() => {
              if (selectedComponentId) {
                deleteComponent(selectedComponentId);
                setSelectedComponentId(null);
              }
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
