
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StageList } from './components/StageList';
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { PropertyPanel } from './components/PropertyPanel';
import { TypeformPreviewPanel } from './preview/TypeformPreviewPanel';
import { ButtonGroup } from '@/components/ui/button-group';
import { 
  Button,
  buttonVariants
} from '@/components/ui/button';
import { 
  Plus, 
  Type, 
  Image, 
  Check, 
  PencilLine, 
  Grid, 
  LayoutGrid, 
  Save, 
  Eye, 
  EyeOff,
  CircleCheck,
  ArrowLeft
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface TypeformQuizBuilderProps {
  stages: QuizStage[];
  components: QuizComponentData[];
  activeStageId: string | null;
  selectedComponentId: string | null;
  onAddStage: (type: QuizStage['type']) => void;
  onUpdateStage: (id: string, updates: Partial<QuizStage>) => void;
  onDeleteStage: (id: string) => void;
  onMoveStage: (draggedId: string, targetId: string) => void;
  onSetActiveStage: (id: string) => void;
  onAddComponent: (type: string, stageId: string) => void;
  onUpdateComponent: (id: string, data: Partial<QuizComponentData['data']>) => void;
  onDeleteComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
  onSelectComponent: (id: string) => void;
  onSave: () => void;
}

export const TypeformQuizBuilder: React.FC<TypeformQuizBuilderProps> = ({
  stages,
  components,
  activeStageId,
  selectedComponentId,
  onAddStage,
  onUpdateStage,
  onDeleteStage,
  onMoveStage,
  onSetActiveStage,
  onAddComponent,
  onUpdateComponent,
  onDeleteComponent,
  onMoveComponent,
  onSelectComponent,
  onSave
}) => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  
  const activeStage = activeStageId ? stages.find(s => s.id === activeStageId) : null;
  const stageComponents = activeStageId ? components.filter(c => c.stageId === activeStageId) : [];
  
  const handleAddComponent = (type: string) => {
    if (activeStageId) {
      onAddComponent(type, activeStageId);
    } else {
      toast({
        title: "Selecione uma etapa",
        description: "Você precisa selecionar uma etapa antes de adicionar componentes.",
        variant: "destructive"
      });
    }
  };

  const handleNavigateStage = (direction: 'prev' | 'next') => {
    if (!activeStageId || !activeStage) return;
    
    const currentIndex = stages.findIndex(s => s.id === activeStageId);
    
    if (direction === 'prev' && currentIndex > 0) {
      onSetActiveStage(stages[currentIndex - 1].id);
    } else if (direction === 'next' && currentIndex < stages.length - 1) {
      onSetActiveStage(stages[currentIndex + 1].id);
    }
  };

  const togglePreview = () => {
    setIsPreviewing(prev => !prev);
  };

  const handleSave = () => {
    onSave();
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso.",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="border-b bg-white p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ButtonGroup>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAddStage('cover')}
            >
              <Plus className="h-4 w-4 mr-1" /> Capa
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAddStage('question')}
            >
              <Plus className="h-4 w-4 mr-1" /> Pergunta
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onAddStage('result')}
            >
              <Plus className="h-4 w-4 mr-1" /> Resultado
            </Button>
          </ButtonGroup>
          
          <div className="h-6 border-r mx-2"></div>
          
          <Button
            size="sm"
            variant={isPreviewing ? "default" : "outline"}
            onClick={togglePreview}
          >
            {isPreviewing ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
            {isPreviewing ? "Editar" : "Visualizar"}
          </Button>
        </div>
        
        <Button 
          size="sm" 
          onClick={handleSave}
          className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
        >
          <Save className="h-4 w-4 mr-1" /> Salvar
        </Button>
      </div>

      {/* Main Content */}
      {isPreviewing ? (
        <div className="flex-1 overflow-hidden">
          <TypeformPreviewPanel
            components={stageComponents}
            activeStage={activeStage}
            selectedComponentId={selectedComponentId}
            isPreviewing={true}
            onSelectComponent={onSelectComponent}
            onNavigateStage={handleNavigateStage}
          />
        </div>
      ) : (
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          {/* Left Sidebar - Stages */}
          <ResizablePanel defaultSize={18} minSize={15} maxSize={25}>
            <div className="h-full flex flex-col border-r">
              <div className="p-3 border-b bg-[#FAF9F7]">
                <h2 className="text-[#432818] font-medium">Etapas do Quiz</h2>
              </div>
              
              <ScrollArea className="flex-1">
                <StageList
                  stages={stages}
                  activeStageId={activeStageId}
                  onStageAdd={onAddStage}
                  onStageSelect={onSetActiveStage}
                  onStageUpdate={onUpdateStage}
                  onStageDelete={onDeleteStage}
                  onStageMove={onMoveStage}
                />
              </ScrollArea>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Center Panel - Preview and Component Selection */}
          <ResizablePanel defaultSize={57}>
            <div className="h-full flex flex-col">
              {/* Component Toolbar */}
              {activeStage && (
                <div className="bg-[#FAF9F7] p-3 border-b">
                  <h3 className="font-medium text-[#432818] mb-3">
                    Adicionar Componente em: {activeStage.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {activeStage.type === 'cover' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddComponent('stageCover')}
                      >
                        <Type className="h-4 w-4 mr-1" /> Capa
                      </Button>
                    )}
                    
                    {activeStage.type === 'question' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddComponent('stageQuestion')}
                      >
                        <Check className="h-4 w-4 mr-1" /> Pergunta
                      </Button>
                    )}
                    
                    {activeStage.type === 'result' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddComponent('stageResult')}
                      >
                        <CircleCheck className="h-4 w-4 mr-1" /> Resultado
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddComponent('text')}
                    >
                      <PencilLine className="h-4 w-4 mr-1" /> Texto
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddComponent('image')}
                    >
                      <Image className="h-4 w-4 mr-1" /> Imagem
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Preview Area */}
              <div className="flex-1">
                <TypeformPreviewPanel
                  components={stageComponents}
                  activeStage={activeStage}
                  selectedComponentId={selectedComponentId}
                  isPreviewing={false}
                  onSelectComponent={onSelectComponent}
                />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Right Panel - Properties */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
            <PropertyPanel
              selectedComponentId={selectedComponentId}
              components={components}
              onUpdate={onUpdateComponent}
              onDelete={onDeleteComponent}
              onClose={() => onSelectComponent('')}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  );
};
