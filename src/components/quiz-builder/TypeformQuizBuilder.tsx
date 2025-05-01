
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
  ArrowLeft,
  Undo,
  Redo,
  FileText,
  Download,
  Upload,
  Copy,
  LayoutTemplate,
  QuestionMarkCircle
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { DndContext } from '@dnd-kit/core';

interface TypeformQuizBuilderProps {
  stages: QuizStage[];
  components: QuizComponentData[];
  activeStageId: string | null;
  selectedComponentId: string | null;
  onAddStage: (type: QuizStage['type']) => string; // This expects a function that returns string
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
  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg'>('md');
  
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
    if (selectedComponentId) {
      onSelectComponent(''); // Deselect component when toggling preview
    }
  };

  const handleSave = () => {
    onSave();
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso.",
    });
  };

  const getComponentIcon = (type: string) => {
    switch(type) {
      case 'stageCover': return <Type className="h-4 w-4 mr-1" />;
      case 'stageQuestion': return <Check className="h-4 w-4 mr-1" />;
      case 'stageResult': return <CircleCheck className="h-4 w-4 mr-1" />;
      case 'text': return <PencilLine className="h-4 w-4 mr-1" />;
      case 'image': return <Image className="h-4 w-4 mr-1" />;
      default: return <Plus className="h-4 w-4 mr-1" />;
    }
  };

  // Helper to get suggested component type for a stage
  const getSuggestedComponentType = (type: QuizStage['type']) => {
    switch(type) {
      case 'cover': return 'stageCover';
      case 'question': return 'stageQuestion';
      case 'result': return 'stageResult';
      case 'strategic': return 'stageQuestion';
      default: return 'text';
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Main Toolbar */}
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAddStage('strategic')}
            >
              <Plus className="h-4 w-4 mr-1" /> Estratégica
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

          {isPreviewing && (
            <ButtonGroup>
              <Button
                size="sm"
                variant={viewportSize === 'sm' ? "secondary" : "outline"}
                onClick={() => setViewportSize('sm')}
                className="px-2"
                title="Visualização mobile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-smartphone"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </Button>
              <Button
                size="sm"
                variant={viewportSize === 'md' ? "secondary" : "outline"}
                onClick={() => setViewportSize('md')}
                className="px-2"
                title="Visualização tablet"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-tablet"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
              </Button>
              <Button
                size="sm"
                variant={viewportSize === 'lg' ? "secondary" : "outline"}
                onClick={() => setViewportSize('lg')}
                className="px-2"
                title="Visualização desktop"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2" ry="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              </Button>
            </ButtonGroup>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast({
                title: "Exportando quiz",
                description: "Este recurso será implementado em breve.",
              });
            }}
          >
            <Download className="h-4 w-4 mr-1" /> Exportar
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast({
                title: "Importando quiz",
                description: "Este recurso será implementado em breve.",
              });
            }}
          >
            <Upload className="h-4 w-4 mr-1" /> Importar
          </Button>
          
          <Button 
            size="sm" 
            onClick={handleSave}
            className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
          >
            <Save className="h-4 w-4 mr-1" /> Salvar
          </Button>
        </div>
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
            viewportSize={viewportSize}
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
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddComponent(getSuggestedComponentType(activeStage.type))}
                      className="bg-white"
                    >
                      {getComponentIcon(getSuggestedComponentType(activeStage.type))}
                      {activeStage.type === 'cover' ? 'Capa' : 
                       activeStage.type === 'question' ? 'Pergunta' : 
                       activeStage.type === 'result' ? 'Resultado' :
                       'Pergunta Estratégica'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddComponent('text')}
                      className="bg-white"
                    >
                      <PencilLine className="h-4 w-4 mr-1" /> Texto
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddComponent('image')}
                      className="bg-white"
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
                  viewportSize="md"
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
