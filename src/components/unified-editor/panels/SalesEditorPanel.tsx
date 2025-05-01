
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';
import { useEditor } from '@/hooks/useEditor';
import { ScrollArea } from '@/components/ui/scroll-area';
import StyleEditor from '@/components/result-editor/StyleEditor';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Block } from '@/types/editor';

interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  
  const { config, addBlock, updateBlock, deleteBlock } = useEditor();

  const handleComponentSelect = (type: Block['type']) => {
    const id = addBlock(type);
    setSelectedComponentId(id);
  };

  // Find selected component
  const selectedComponent = selectedComponentId 
    ? config.blocks.find(block => block.id === selectedComponentId)
    : null;

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
          <ScrollArea className="flex-1 p-4 bg-[#FAF9F7]">
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
                  {config.blocks.map(block => (
                    <div 
                      key={block.id}
                      className={cn(
                        "p-4 rounded-md transition-colors",
                        selectedComponentId === block.id && "bg-[#FAF9F7] border border-dashed border-[#B89B7A]",
                        !isPreviewing && "cursor-pointer hover:bg-[#FAF9F7]"
                      )}
                      onClick={() => !isPreviewing && setSelectedComponentId(block.id)}
                    >
                      {block.type === 'headline' && (
                        <div className="space-y-2">
                          <h2 className="text-2xl font-bold">{block.content.title || 'Título Principal'}</h2>
                          <p>{block.content.subtitle || 'Subtítulo da oferta'}</p>
                        </div>
                      )}
                      {block.type === 'text' && (
                        <div className="prose">
                          {block.content.text || 'Texto do conteúdo'}
                        </div>
                      )}
                      {block.type === 'image' && (
                        <div className="flex justify-center">
                          {block.content.imageUrl ? (
                            <img 
                              src={block.content.imageUrl} 
                              alt={block.content.imageAlt || 'Imagem'} 
                              className="max-w-full h-auto"
                              style={block.content.style as React.CSSProperties}
                            />
                          ) : (
                            <div className="bg-gray-200 h-40 w-full flex items-center justify-center">
                              <p className="text-gray-500">Imagem não definida</p>
                            </div>
                          )}
                        </div>
                      )}
                      {block.type === 'pricing' && (
                        <div className="bg-[#FAF9F7] p-4 rounded-lg border border-[#B89B7A]/20">
                          <div className="text-center space-y-4">
                            <h3 className="text-xl font-bold">{block.content.title || 'Nome do Produto'}</h3>
                            <div className="flex justify-center items-center gap-2">
                              <span className="text-2xl font-bold">{block.content.price || 'R$ 97,00'}</span>
                              {block.content.regularPrice && (
                                <span className="line-through text-gray-500">{block.content.regularPrice}</span>
                              )}
                            </div>
                            <Button className="bg-[#B89B7A] hover:bg-[#8F7A6A] w-full">
                              {block.content.ctaText || 'Comprar Agora'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel direito - Propriedades */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full bg-white border-l border-[#B89B7A]/20 overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="font-medium text-[#432818]">Propriedades</h3>
          </div>
          
          {selectedComponent ? (
            <div className="p-4">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'content' | 'style')}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="content" className="flex-1">Conteúdo</TabsTrigger>
                  <TabsTrigger value="style" className="flex-1">Estilo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="content" className="space-y-4">
                  {/* Conteúdo do componente selecionado */}
                  {selectedComponent.type === 'headline' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Título</label>
                        <input
                          type="text"
                          value={selectedComponent.content.title || ''}
                          onChange={(e) => updateBlock(selectedComponentId, { title: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subtítulo</label>
                        <textarea
                          value={selectedComponent.content.subtitle || ''}
                          onChange={(e) => updateBlock(selectedComponentId, { subtitle: e.target.value })}
                          className="w-full p-2 border rounded"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Componentes para outros tipos... */}
                </TabsContent>
                
                <TabsContent value="style">
                  <StyleEditor
                    style={selectedComponent.content.style || {}}
                    onUpdate={(style) => updateBlock(selectedComponentId, { style })}
                  />
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 border-t pt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    deleteBlock(selectedComponentId);
                    setSelectedComponentId(null);
                  }}
                >
                  Excluir Componente
                </Button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-[#8F7A6A]">Selecione um componente para editar suas propriedades</p>
            </div>
          )}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default SalesEditorPanel;
