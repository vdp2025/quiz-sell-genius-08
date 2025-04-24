
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/quiz-builder/ComponentsSidebar';
import { PreviewPanel } from '@/components/quiz-builder/PreviewPanel';
import { PropertiesPanel } from '@/components/quiz-builder/components/PropertiesPanel';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Save, ArrowLeft, Import } from 'lucide-react';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';
import { QuizComponentType, QuizBuilderState } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';
import QuizExporter from './components/QuizExporter';

const EnhancedQuizBuilder: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isExporterOpen, setIsExporterOpen] = useState(false);
  
  const { 
    components, 
    stages,
    activeStageId,
    addComponent, 
    updateComponent, 
    deleteComponent,
    moveComponent,
    setActiveStage,
    saveCurrentState,
    initializeStages,
    initializeComponents,
    loading
  } = useQuizBuilder();

  const activeStage = activeStageId
    ? stages.find(s => s.id === activeStageId)
    : null;

  const activeComponents = activeStageId 
    ? components.filter(c => c.stageId === activeStageId)
    : [];

  const handleComponentSelect = (type: QuizComponentType) => {
    const newComponentId = addComponent(type, activeStageId);
    setSelectedComponentId(newComponentId);
    
    toast({
      title: "Componente adicionado",
      description: `Um novo componente do tipo ${type} foi adicionado à etapa.`
    });
  };

  const handleSave = () => {
    const success = saveCurrentState();
    if (success) {
      toast({
        title: "Alterações salvas",
        description: "O quiz foi salvo com sucesso.",
      });
    }
  };
  
  const handleImportData = (data: QuizBuilderState) => {
    initializeStages(data.stages);
    initializeComponents(data.components);
    
    if (data.stages.length > 0) {
      setActiveStage(data.stages[0].id);
    }
    
    toast({
      title: "Dados importados",
      description: "Os dados foram importados com sucesso.",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      <div className="p-4 border-b flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => window.history.back()} size="icon" className="rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-playfair text-[#432818]">
            Editor de Quiz
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsExporterOpen(true)}
          >
            <Import className="w-4 h-4" />
            <span>Importar Quiz</span>
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsPreviewing(!isPreviewing)}
          >
            {isPreviewing ? (
              <>
                <EyeOff className="w-4 h-4" />
                <span>Editar</span>
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                <span>Visualizar</span>
              </>
            )}
          </Button>
          
          <Button 
            onClick={handleSave}
            className="bg-[#B89B7A] text-white hover:bg-[#A38A69]"
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Left Panel - Components */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-[#F9F6F2]">
            <ComponentsSidebar 
              onComponentSelect={handleComponentSelect}
              activeStage={activeStage} 
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Center Panel - Preview */}
          <ResizablePanel defaultSize={55}>
            <PreviewPanel
              components={activeComponents}
              selectedComponentId={selectedComponentId}
              onSelectComponent={setSelectedComponentId}
              onMoveComponent={moveComponent}
              activeStage={activeStage}
              isPreviewing={isPreviewing}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right Panel - Properties */}
          <ResizablePanel defaultSize={25} className="bg-[#F9F6F2]">
            <PropertiesPanel
              component={selectedComponentId ? components.find(c => c.id === selectedComponentId) : null}
              stage={activeStage}
              onClose={() => setSelectedComponentId(null)}
              onUpdate={updateComponent}
              onUpdateStage={() => {}}
              onDelete={deleteComponent}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      
      <QuizExporter 
        isOpen={isExporterOpen}
        onOpenChange={setIsExporterOpen}
        onImportData={handleImportData}
      />
    </div>
  );
};

export default EnhancedQuizBuilder;
