
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { toast } from '@/components/ui/use-toast';
import { GlobalStylesEditor } from '@/components/result-editor/GlobalStylesEditor';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false);
  
  const {
    blocks, 
    selectedBlockId, 
    selectBlock, 
    actions,
    resultPageConfig,
    loading
  } = useResultPageEditor(primaryStyle.category);
  
  useEffect(() => {
    if (!loading && resultPageConfig) {
      console.info(`Editor de resultados carregado para ${primaryStyle.category} com ${blocks.length} blocos`);
    }
  }, [loading, blocks?.length, primaryStyle.category, resultPageConfig]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Carregando editor de resultados...</p>
      </div>
    );
  }

  const handleComponentSelect = (type: string) => {
    if (!actions?.handleAddBlock) {
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o componente. Tente novamente.",
        variant: "destructive"
      });
      return;
    }
    
    const id = actions.handleAddBlock(type);
    selectBlock(id);
    toast({
      title: "Componente adicionado",
      description: `Um componente do tipo ${type} foi adicionado à sua página.`,
    });
  };

  const handleOpenGlobalStyles = () => {
    setIsGlobalStylesOpen(true);
  };

  // Find selected component
  const selectedComponent = selectedBlockId 
    ? blocks.find(block => block.id === selectedBlockId)
    : null;

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left sidebar */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-r bg-white">
          <ComponentsSidebar onComponentSelect={handleComponentSelect} />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Main preview area */}
      <ResizablePanel defaultSize={60}>
        <div className="h-full flex flex-col">
          {/* Preview controls */}
          <div className="border-b bg-white p-3 flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={cn(viewMode === 'desktop' && 'bg-slate-100')}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={cn(viewMode === 'mobile' && 'bg-slate-100')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenGlobalStyles}
            >
              <Settings className="w-4 h-4 mr-2" />
              Estilos Globais
            </Button>
          </div>
          
          {/* Preview area */}
          <ScrollArea className="flex-1 p-4 bg-slate-50">
            <div className={cn(
              "min-h-full bg-white shadow-sm rounded-lg mx-auto transition-all",
              viewMode === 'mobile' ? 'max-w-sm' : 'max-w-4xl'
            )}>
              {blocks && blocks.length > 0 ? (
                <div className="p-4">
                  {blocks.map((block) => (
                    <div 
                      key={block.id}
                      onClick={() => !isPreviewing && selectBlock(block.id)}
                      className={cn(
                        "p-4 mb-4 rounded-md transition-all",
                        !isPreviewing && "cursor-pointer hover:bg-gray-50",
                        !isPreviewing && block.id === selectedBlockId && "ring-2 ring-blue-400"
                      )}
                    >
                      {/* Simplified block preview */}
                      <div className="p-2 border rounded">
                        <h3 className="font-medium">{block.type}</h3>
                        <p className="text-sm text-gray-500">
                          {block.content?.title || block.content?.text || "Sem conteúdo"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                  <p className="text-gray-500 mb-4">Nenhum componente adicionado</p>
                  <p className="text-sm text-gray-400">
                    Adicione componentes a partir do painel lateral
                  </p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Properties panel */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
        <div className="h-full border-l bg-white">
          {selectedComponent ? (
            <PropertiesPanel
              selectedBlockId={selectedBlockId}
              blocks={blocks}
              onClose={() => selectBlock(null)}
              onUpdate={(content) => actions.handleUpdateBlock(selectedBlockId, content)}
              onDelete={() => {
                actions.handleDeleteBlock(selectedBlockId);
                selectBlock(null);
                toast({
                  title: "Componente removido",
                  description: "O componente foi removido da sua página."
                });
              }}
            />
          ) : (
            <div className="p-4 text-center text-gray-500">
              <p>Selecione um componente para editar suas propriedades</p>
            </div>
          )}
        </div>
      </ResizablePanel>
      
      {/* Global styles editor */}
      {isGlobalStylesOpen && (
        <GlobalStylesEditor
          globalStyles={resultPageConfig?.globalStyles || {}}
          onSave={(styles) => {
            actions.updateSection('globalStyles', styles);
            setIsGlobalStylesOpen(false);
            toast({
              title: "Estilos globais atualizados",
              description: "Os estilos globais foram atualizados com sucesso."
            });
          }}
          onCancel={() => setIsGlobalStylesOpen(false)}
        />
      )}
    </ResizablePanelGroup>
  );
};

export default ResultEditorPanel;
