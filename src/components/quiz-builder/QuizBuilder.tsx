import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewPanel } from './PreviewPanel';
import { StepsSidebar } from './StepsSidebar';
import { StepsVisualization } from './StepsVisualization';
import { LoadExistingQuiz } from './LoadExistingQuiz';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizStep } from '@/types/quizBuilder';
import { Button } from '@/components/ui/button';
import { Save } from '@/components/ui/icons';
import { useQuizAutosave } from '@/hooks/useQuizAutosave';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isLoadingExisting, setIsLoadingExisting] = useState(true);
  const [showStepsVisualization, setShowStepsVisualization] = useState(true);
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
    updateStepTitle,
    deleteStep,
    duplicateStep,
    setStepsFromTemplate,
    saveCurrentState
  } = useQuizBuilder();

  const { lastSaved, isSaving, saveToLocalStorage } = useQuizAutosave({
    steps,
    currentStepIndex
  });

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      saveCurrentState();
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [steps, saveCurrentState]);

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
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {lastSaved ? `Último salvamento: ${new Date(lastSaved).toLocaleTimeString()}` : 'Nunca salvo'}
          </span>
          <Button 
            variant="outline" 
            onClick={() => setShowStepsVisualization(!showStepsVisualization)}
          >
            {showStepsVisualization ? 'Ocultar Visualização' : 'Mostrar Visualização'}
          </Button>
          <Button 
            onClick={saveToLocalStorage}
            className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </div>
      </div>
      
      {showStepsVisualization && (
        <div className="bg-white border-b p-4">
          <StepsVisualization 
            steps={steps}
            currentStepIndex={currentStepIndex}
            onSelectStep={setCurrentStepIndex}
          />
        </div>
      )}
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Steps Sidebar */}
        <ResizablePanel defaultSize={15} minSize={15} maxSize={20}>
          <StepsSidebar 
            steps={steps}
            currentStepIndex={currentStepIndex}
            onSelectStep={setCurrentStepIndex}
            onAddStep={addStep}
            onEditStepTitle={updateStepTitle}
            onDeleteStep={deleteStep}
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
