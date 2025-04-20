
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewPanel } from './PreviewPanel';
import { StagesPanel } from './StagesPanel';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
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
    loading
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type, activeStageId);
    setSelectedComponentId(newComponentId);
  };

  const handleAddStage = (type: QuizStage['type']) => {
    const newStageId = addStage(type);
    setActiveStage(newStageId);
  };

  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId) 
    : null;

  const activeStageComponents = activeStageId 
    ? components.filter(c => c.stageId === activeStageId)
    : [];

  const activeStage = activeStageId
    ? stages.find(s => s.id === activeStageId)
    : null;

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#FAF9F7]">
        <Loader2 className="h-12 w-12 text-[#B89B7A] animate-spin mb-4" />
        <p className="text-[#432818] text-lg">Carregando construtor de quiz...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b bg-white flex justify-between items-center">
        <h1 className="text-2xl font-playfair text-[#432818]">
          Construtor de Quiz
        </h1>
        <Tabs defaultValue="editor" onValueChange={(value) => setActiveView(value as 'editor' | 'preview')}>
          <TabsList>
            <TabsTrigger value="editor">Editor</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => handleAddStage('cover')} 
            className="text-[#B89B7A] border-[#B89B7A]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Capa
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleAddStage('question')} 
            className="text-[#B89B7A] border-[#B89B7A]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Questão
          </Button>
          <Button 
            variant="outline"
            onClick={() => handleAddStage('result')} 
            className="text-[#B89B7A] border-[#B89B7A]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Resultado
          </Button>
        </div>
      </div>
      
      <div className="flex-1">
        <Tabs defaultValue="editor" value={activeView}>
          <TabsContent value="editor" className="h-full">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Left Panel - Stages Sidebar */}
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <StagesPanel 
                  stages={stages} 
                  activeStageId={activeStageId}
                  onStageSelect={setActiveStage}
                  onStageMove={moveStage}
                  onStageUpdate={updateStage}
                  onStageDelete={deleteStage}
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Components Sidebar */}
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <ComponentsSidebar 
                  onComponentSelect={handleComponentSelect} 
                  activeStage={activeStage}
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Center Panel - Preview */}
              <ResizablePanel defaultSize={35}>
                <PreviewPanel 
                  components={activeStageComponents}
                  selectedComponentId={selectedComponentId}
                  onSelectComponent={setSelectedComponentId}
                  onMoveComponent={moveComponent}
                  activeStage={activeStage}
                />
              </ResizablePanel>
              
              <ResizableHandle withHandle />
              
              {/* Right Panel - Properties */}
              <ResizablePanel defaultSize={25}>
                <PropertiesPanel 
                  component={selectedComponent}
                  stage={activeStage}
                  onClose={() => setSelectedComponentId(null)}
                  onUpdate={(data: Partial<QuizComponentData>) => {
                    if (selectedComponentId) {
                      updateComponent(selectedComponentId, data);
                    }
                  }}
                  onUpdateStage={(data: Partial<QuizStage>) => {
                    if (activeStageId) {
                      updateStage(activeStageId, data);
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
          </TabsContent>
          
          <TabsContent value="preview" className="h-full">
            {/* Preview mode - show full quiz flow */}
            <div className="h-full bg-[#FAF9F7] p-4 overflow-auto">
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md">
                {/* Render preview of active stage or full quiz */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
