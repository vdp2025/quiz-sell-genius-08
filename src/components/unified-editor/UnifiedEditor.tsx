import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Loader2, Plus, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Importações do editor de quiz
import { QuizComponentType, QuizStage } from '@/types/quizBuilder';
import { useQuizBuilder } from '@/hooks/useQuizBuilder';

// Importações do editor de resultados
import { EditorProvider, useEditor } from '@/context/EditorContext';
import { StyleResult } from '@/types/quiz';
import { ResultPageConfig } from '@/types/resultPageConfig';

// Importando componentes específicos
import { ComponentsSidebar as ResultComponentsSidebar } from '../result-editor/ComponentsSidebar';
import { EditorPreview as ResultEditorPreview } from '../result-editor/EditorPreview';
import { PropertiesPanel as ResultPropertiesPanel } from '../result-editor/PropertiesPanel';
import { EditorToolbar as ResultEditorToolbar } from '../result-editor/EditorToolbar';

interface StageItemProps {
  stage: QuizStage;
  isActive: boolean;
  onClick: () => void;
}

// Componente para cada item de etapa na barra lateral
const StageItem: React.FC<StageItemProps> = ({ stage, isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center p-3 mb-1 rounded cursor-pointer ${
        isActive ? 'bg-[#2A2F3E] text-white' : 'hover:bg-[#222631] text-gray-300'
      }`}
      onClick={onClick}
    >
      <span className="flex-1">{stage.title || `Etapa ${stage.order + 1}`}</span>
    </div>
  );
};

// Componente para a etapa de resultado
const ResultStageItem: React.FC<{ isActive: boolean; onClick: () => void }> = ({ isActive, onClick }) => {
  return (
    <div 
      className={`flex items-center p-3 mb-1 rounded cursor-pointer ${
        isActive ? 'bg-[#2A2F3E] text-white' : 'hover:bg-[#222631] text-gray-300'
      }`}
      onClick={onClick}
    >
      <span className="flex-1 font-semibold">Página de Resultado</span>
    </div>
  );
};

// Barra lateral unificada com todas as etapas
const UnifiedSidebar: React.FC<{
  stages: QuizStage[];
  activeStageId: string | null;
  onStageSelect: (stageId: string) => void;
  onResultStageSelect: () => void;
  showingResultStage: boolean;
  onAddStage: () => void;
}> = ({ 
  stages, 
  activeStageId, 
  onStageSelect, 
  onResultStageSelect,
  showingResultStage,
  onAddStage
}) => {
  return (
    <div className="flex flex-col h-full bg-[#1A1F2C] text-white">
      <div className="p-3 border-b border-[#2A2F3E]">
        <h2 className="text-lg font-semibold">Fluxo do Quiz</h2>
      </div>
      
      <ScrollArea className="flex-1 px-2 py-3">
        {stages.map(stage => (
          <StageItem 
            key={stage.id} 
            stage={stage} 
            isActive={activeStageId === stage.id && !showingResultStage}
            onClick={() => onStageSelect(stage.id)} 
          />
        ))}
        
        <ResultStageItem 
          isActive={showingResultStage} 
          onClick={onResultStageSelect}
        />
      </ScrollArea>
      
      <div className="p-3 border-t border-[#2A2F3E]">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex items-center justify-center"
          onClick={onAddStage}
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Etapa
        </Button>
      </div>
    </div>
  );
};

// Componente para a área de conteúdo que alterna entre o editor de quiz e o de resultados
const ContentArea: React.FC<{
  showingResultStage: boolean;
  quizContent: React.ReactNode;
  resultContent: React.ReactNode;
}> = ({ showingResultStage, quizContent, resultContent }) => {
  return (
    <div className="h-full">
      {showingResultStage ? resultContent : quizContent}
    </div>
  );
};

// Componente principal do editor unificado
export const UnifiedEditor: React.FC = () => {
  const [showingResultStage, setShowingResultStage] = useState(false);
  const [mockSelectedStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 10,
    percentage: 50
  });
  
  // Hooks para os editores
  const { 
    components, 
    stages,
    activeStageId,
    addComponent,
    updateComponent,
    deleteComponent, 
    addStage,
    updateStage,
    deleteStage,
    setActiveStage,
    saveCurrentState,
    loading: quizLoading
  } = useQuizBuilder();
  
  // Funções de gerenciamento
  const handleStageSelect = (stageId: string) => {
    setShowingResultStage(false);
    setActiveStage(stageId);
  };
  
  const handleResultStageSelect = () => {
    setShowingResultStage(true);
  };
  
  const handleAddStage = () => {
    const newStageId = addStage('question');
    setActiveStage(newStageId);
    setShowingResultStage(false);
  };
  
  const handleSave = () => {
    // Salvar quiz e resultado
    const success = saveCurrentState();
    if (success) {
      toast({
        title: "Projeto salvo",
        description: "Quiz e página de resultado salvos com sucesso.",
      });
    }
  };
  
  if (quizLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#1A1F2C]">
        <Loader2 className="h-12 w-12 text-[#9b87f5] animate-spin mb-4" />
        <p className="text-white text-lg">Carregando editor unificado...</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col bg-[#1A1F2C]">
      {/* Barra de ferramentas superior */}
      <div className="bg-[#1A1F2C] border-b border-[#2A2F3E] p-2 flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">Editor Unificado</h1>
        <div className="flex items-center space-x-2">
          <Button 
            variant="default" 
            size="sm"
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            onClick={handleSave}
          >
            <Save className="h-4 w-4 mr-2" />
            Salvar Tudo
          </Button>
        </div>
      </div>
      
      {/* Conteúdo principal */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Lista de etapas (coluna 1) */}
          <ResizablePanel defaultSize={15} minSize={10} maxSize={20}>
            <UnifiedSidebar 
              stages={stages}
              activeStageId={activeStageId}
              onStageSelect={handleStageSelect}
              onResultStageSelect={handleResultStageSelect}
              showingResultStage={showingResultStage}
              onAddStage={handleAddStage}
            />
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          {/* Conteúdo do editor (área principal) */}
          <ResizablePanel defaultSize={85}>
            <EditorProvider>
              <ContentArea 
                showingResultStage={showingResultStage}
                quizContent={
                  <div className="h-full bg-white">
                    {/* Aqui renderizaria o conteúdo do quiz-builder */}
                    <div className="p-8 text-center text-gray-500">
                      {activeStageId ? (
                        <div>
                          <h2 className="text-xl mb-4">
                            Editor de Quiz: {stages.find(s => s.id === activeStageId)?.title || `Etapa ${stages.findIndex(s => s.id === activeStageId) + 1}`}
                          </h2>
                          <p>Aqui seria renderizado o editor completo de quiz para a etapa selecionada.</p>
                        </div>
                      ) : (
                        <p>Selecione uma etapa para editar</p>
                      )}
                    </div>
                  </div>
                }
                resultContent={
                  <ResizablePanelGroup direction="horizontal" className="h-full">
                    <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
                      <ResultComponentsSidebar onComponentSelect={(type) => console.log('Add component:', type)} />
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    <ResizablePanel defaultSize={55}>
                      {/* Placeholder - será implementado com componentes reais */}
                      <div className="h-full bg-white p-8 flex items-center justify-center">
                        <p className="text-gray-500">Preview da página de resultado seria exibido aqui</p>
                      </div>
                    </ResizablePanel>
                    
                    <ResizableHandle withHandle />
                    
                    <ResizablePanel defaultSize={25}>
                      <div className="h-full bg-[#FAF9F7] p-4">
                        <h3 className="text-[#1A1818] font-medium mb-4">Propriedades</h3>
                        <p className="text-gray-500">Painel de propriedades seria exibido aqui</p>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                }
              />
            </EditorProvider>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
}; 