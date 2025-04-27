
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/editor/sidebar/ComponentsSidebar';
import { Button } from '@/components/ui/button';
import { Eye, Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';
import { useEditor } from '@/hooks/useEditor';

interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  
  const { config, addBlock } = useEditor();

  const handleComponentSelect = (type) => {
    const id = addBlock(type);
    setSelectedComponentId(id);
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Painel esquerdo - Biblioteca de componentes */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <ComponentsSidebar onComponentSelect={handleComponentSelect} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel central - Preview */}
      <ResizablePanel defaultSize={55}>
        <div className="h-full flex flex-col">
          {/* Preview Controls */}
          <div className="border-b border-[#B89B7A]/20 p-4 bg-white flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('desktop')}
                className={cn(viewMode === 'desktop' && 'bg-[#FAF9F7]')}
              >
                <Monitor className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode('mobile')}
                className={cn(viewMode === 'mobile' && 'bg-[#FAF9F7]')}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
            <div className={cn(
              "min-h-full bg-white rounded-lg shadow-sm p-6",
              viewMode === 'mobile' && 'max-w-md mx-auto'
            )}>
              {config.blocks.length === 0 ? (
                <div className="text-center p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
                  <p className="text-[#8F7A6A] mb-4">Adicione componentes usando o painel lateral</p>
                  <Button 
                    variant="outline" 
                    className="border-[#B89B7A] text-[#B89B7A]"
                    onClick={() => handleComponentSelect('headline')}
                  >
                    Adicionar Primeiro Componente
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <h2 className="text-2xl font-playfair text-[#432818] text-center">
                    Página de Vendas em Construção
                  </h2>
                  <p className="text-[#8F7A6A] text-center">
                    Adicione componentes usando o painel lateral para construir sua página de vendas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel direito - Propriedades */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full bg-white border-l border-[#B89B7A]/20 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#432818]">Propriedades</h3>
          </div>
          <div className="p-4">
            {selectedComponentId ? (
              <p>Editar propriedades do componente selecionado</p>
            ) : (
              <p className="text-[#8F7A6A]">Selecione um componente para editar suas propriedades</p>
            )}
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SalesEditorPanel;
