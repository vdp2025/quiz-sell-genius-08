
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { ComponentPreview } from './preview/ComponentPreview';
import { PropertiesPanel } from './properties/PropertiesPanel';
import { QuizComponentType, QuizComponentData } from '@/types/quizBuilder/componentTypes';
import { useToast } from '@/components/ui/use-toast';

export const QuizBuilderContainer: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<QuizComponentData | null>(null);
  const { toast } = useToast();

  const handleSelectComponent = (type: QuizComponentType) => {
    // Create a new component with default layout and style
    const newComponent: QuizComponentData = {
      id: `component-${Date.now()}`,
      type,
      order: 0,
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

    setSelectedComponent(newComponent);
    toast({
      title: "Componente adicionado",
      description: "O novo componente foi criado com sucesso."
    });
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left Panel - Components Sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <ComponentsSidebar onSelectComponent={handleSelectComponent} />
      </ResizablePanel>

      <ResizableHandle />

      {/* Center Panel - Preview */}
      <ResizablePanel defaultSize={55}>
        <ComponentPreview 
          selectedComponent={selectedComponent}
          onSelectComponent={setSelectedComponent}
        />
      </ResizablePanel>

      <ResizableHandle />

      {/* Right Panel - Properties */}
      <ResizablePanel defaultSize={25}>
        <PropertiesPanel 
          component={selectedComponent}
          onUpdate={(updates: Partial<QuizComponentData>) => {
            if (selectedComponent) {
              setSelectedComponent({ ...selectedComponent, ...updates });
            }
          }}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default QuizBuilderContainer;
