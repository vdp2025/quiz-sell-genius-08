import React from 'react';
import { useUnifiedEditor } from '@/hooks/useUnifiedEditor';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { UnifiedComponentsSidebar } from '../sidebar/UnifiedComponentsSidebar';
import { toast } from '@/components/ui/use-toast';
// ... other imports as needed

interface QuizEditorPanelProps {
  isPreviewing: boolean;
}

const QuizEditorPanel: React.FC<QuizEditorPanelProps> = ({ isPreviewing }) => {
  const {
    quizEditorState,
    updateQuizEditor,
    activeStageType,
    setActiveStageType,
    addQuizComponent
  } = useUnifiedEditor();

  const handleComponentSelect = (type: string) => {
    try {
      addQuizComponent(type);
      toast({
        title: "Componente adicionado",
        description: `Um novo componente do tipo ${type} foi adicionado ao editor.`,
      });
    } catch (error) {
      console.error("Error adding component:", error);
      toast({
        title: "Erro ao adicionar componente",
        description: "Não foi possível adicionar o componente. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handlePreviewToggle = (preview: boolean) => {
    // Handle preview toggle, e.g. set something in the editor state
    console.log("Preview toggled:", preview);
    // If you had setLivePreview before, replace it with something like:
    updateQuizEditor({ 
      ...quizEditorState,
      previewMode: preview 
    });
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-r bg-white overflow-y-auto">
          <UnifiedComponentsSidebar 
            onComponentSelect={handleComponentSelect} 
            activeTab="quiz"
            activeStageType={activeStageType}
          />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={55}>
        <div className="h-full bg-[#FAF9F7] p-4 overflow-y-auto">
          {/* Quiz Editor Preview/Editing Area */}
          <div className="bg-white rounded-lg shadow-sm min-h-full p-6">
            {/* Your quiz editor component goes here */}
            <p>Quiz Editor Content</p>
          </div>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full border-l bg-white overflow-y-auto p-4">
          <h3 className="font-medium mb-4">Propriedades</h3>
          {/* Properties Panel */}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default QuizEditorPanel;
