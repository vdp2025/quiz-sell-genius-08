
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewPanel } from './PreviewPanel';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const { 
    components, 
    addComponent, 
    updateComponent, 
    deleteComponent,
    moveComponent,
    loading
  } = useQuizBuilder();

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type);
    setSelectedComponentId(newComponentId);
  };

  const selectedComponent = selectedComponentId 
    ? components.find(c => c.id === selectedComponentId) 
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
        <div className="flex gap-2">
          <Button 
            className="bg-[#B89B7A] hover:bg-[#A38A69]"
            onClick={() => {
              // Adicionar questão de múltipla escolha como default
              const newComponentId = addComponent('multipleChoice');
              setSelectedComponentId(newComponentId);
            }}
          >
            Adicionar Pergunta
          </Button>
        </div>
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
