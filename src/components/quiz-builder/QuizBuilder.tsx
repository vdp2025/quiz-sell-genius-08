
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { PropertiesPanel } from './PropertiesPanel';
import { PreviewPanel } from './PreviewPanel';
import { StagesPanel } from './StagesPanel';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Loader2, Plus, Copy, Eye, EyeOff, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import QuizPreview from './preview/QuizPreview';

export const QuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [isPreviewing, setIsPreviewing] = useState(false);
  
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
    saveCurrentState,
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
    
  const handleSave = () => {
    saveCurrentState();
    toast({
      title: "Quiz salvo com sucesso",
      description: "Todas as alterações foram salvas.",
    });
  };
  
  const handleCopyCurrentQuiz = () => {
    // Function to be implemented later
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "A cópia do quiz atual será implementada em breve.",
    });
  };

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
        
        <div className="flex items-center gap-2">
          <Tabs value={activeView} onValueChange={(value) => setActiveView(value as 'editor' | 'preview')}>
            <TabsList>
              <TabsTrigger value="editor">Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleCopyCurrentQuiz}
            className="ml-4"
          >
            <Copy className="h-4 w-4 mr-2" />
            Copiar Quiz Atual
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsPreviewing(!isPreviewing)}
            className="ml-2"
          >
            {isPreviewing ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Editar
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Visualizar
              </>
            )}
          </Button>
          
          <Button 
            size="sm"
            onClick={handleSave}
            className="ml-2 bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>
      
      <div className="flex-1">
        <Tabs defaultValue={activeView} value={activeView}>
          <TabsContent value="editor" className="h-full">
            <ResizablePanelGroup direction="horizontal" className="h-full">
              {/* Left Panel - Stages Sidebar */}
              <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                <div className="h-full flex flex-col">
                  <div className="p-3 border-b bg-[#FAF9F7] flex justify-between items-center">
                    <h2 className="font-medium text-[#432818]">Etapas do Quiz</h2>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddStage('cover')} 
                        className="text-[#B89B7A] border-[#B89B7A] h-8"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Capa
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddStage('question')} 
                        className="text-[#B89B7A] border-[#B89B7A] h-8"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Questão
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddStage('result')} 
                        className="text-[#B89B7A] border-[#B89B7A] h-8"
                      >
                        <Plus className="w-3.5 h-3.5 mr-1" />
                        Resultado
                      </Button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <StagesPanel 
                      stages={stages} 
                      activeStageId={activeStageId}
                      onStageSelect={setActiveStage}
                      onStageMove={moveStage}
                      onStageUpdate={updateStage}
                      onStageDelete={deleteStage}
                    />
                  </div>
                </div>
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
                  isPreviewing={isPreviewing}
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
            <QuizPreview 
              stages={stages}
              components={components}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
