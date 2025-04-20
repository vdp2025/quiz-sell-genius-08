
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewPanel } from './PreviewPanel';
import { StepsSidebar } from './StepsSidebar';
import { LoadExistingQuiz } from './LoadExistingQuiz';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizStep } from '@/types/quizBuilder';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(true);
  const { 
    steps, 
    currentStepIndex,
    setCurrentStepIndex,
    components,
    addComponent, 
    updateComponent, 
    deleteComponent,
    moveComponent,
    addStep,
    setStepsFromTemplate
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type);
    setSelectedComponentId(newComponentId);
  };

  const handleLoadExistingQuiz = (loadedSteps: QuizStep[]) => {
    setStepsFromTemplate(loadedSteps);
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
        {/* Steps Sidebar */}
        <ResizablePanel defaultSize={15} minSize={15} maxSize={20}>
          <StepsSidebar 
            steps={steps}
            currentStepIndex={currentStepIndex}
            onSelectStep={setCurrentStepIndex}
            onAddStep={addStep}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Components Sidebar */}
        <ResizablePanel defaultSize={15} minSize={15} maxSize={20}>
          <ComponentsSidebar onComponentSelect={handleComponentSelect} />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Center Panel - Preview */}
        <ResizablePanel defaultSize={40}>
          <PreviewPanel 
            components={components}
            selectedComponentId={selectedComponentId}
            onSelectComponent={setSelectedComponentId}
            onMoveComponent={moveComponent}
            currentStep={steps[currentStepIndex]}
          />
        </ResizablePanel>
        
        <ResizableHandle withHandle />
        
        {/* Right Panel - Properties */}
        <ResizablePanel defaultSize={30}>
          <PropertiesPanel 
            component={selectedComponent}
            onClose={() => setSelectedComponentId(null)}
            onUpdate={(data: any) => {
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
