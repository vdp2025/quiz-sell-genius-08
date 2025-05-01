
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StyleResult } from '@/types/quiz';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Block } from '@/types/editor';
import { useSalesPageEditor } from '@/hooks/useSalesPageEditor';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableBlock } from '@/components/result-editor/SortableBlock';
import { toast } from '@/components/ui/use-toast';

interface SalesEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const SalesEditorPanel: React.FC<SalesEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'content' | 'style'>('content');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const {
    blocks, 
    selectedBlockId, 
    selectBlock, 
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleReorderBlocks,
    handleSave
  } = useSalesPageEditor(primaryStyle.category);

  useEffect(() => {
    // Simulating loading state for better UX
    const timer = setTimeout(() => {
      setLoading(false);
      if (blocks.length === 0) {
        toast({
          title: "Página de Vendas",
          description: "Adicione componentes usando o painel lateral para criar sua página de vendas.",
          duration: 5000,
        });
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [blocks.length]);

  const handleComponentSelect = (type: Block['type']) => {
    const id = handleAddBlock(type);
    selectBlock(id);
    toast({
      description: `Componente ${type} adicionado com sucesso!`,
      duration: 3000,
    });
  };

  // Find selected component
  const selectedComponent = selectedBlockId 
    ? blocks.find(block => block.id === selectedBlockId)
    : null;
    
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      handleReorderBlocks(oldIndex, newIndex);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    try {
      await handleSave();
      toast({
        title: "Salvo com sucesso!",
        description: "Suas alterações na página de vendas foram salvas.",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas alterações. Tente novamente.",
        variant: "destructive",
        duration: 5000,
      });
      console.error("Error saving sales page:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#B89B7A] mx-auto mb-4" />
          <p className="text-[#8F7A6A]">Carregando o editor de página de vendas...</p>
        </div>
      </div>
    );
  }

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Painel esquerdo - Biblioteca de componentes */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full flex flex-col border-r border-[#B89B7A]/20">
          <div className="p-4 border-b border-[#B89B7A]/20">
            <h3 className="font-medium text-[#432818]">Componentes</h3>
            <p className="text-sm text-[#8F7A6A] mt-1">Arraste e solte os componentes para criar sua página de vendas</p>
          </div>
          <ComponentsSidebar onComponentSelect={handleComponentSelect} />
        </div>
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
            <Button
              variant="outline"
              size="sm"
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="flex items-center"
            >
              {isSaving && <Loader2 className="w-3 h-3 mr-2 animate-spin" />}
              {isSaving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </div>

          {/* Preview Content */}
          <ScrollArea className="flex-1 p-4 bg-[#FAF9F7]">
            <div className={cn(
              "min-h-full bg-white rounded-lg shadow-sm p-6 transition-all duration-300",
              viewMode === 'mobile' && 'max-w-md mx-auto'
            )}>
              <DndContext
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={blocks.map(block => block.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {blocks.length === 0 ? (
                    <div className="text-center p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
                      <p className="text-[#8F7A6A] mb-4">Adicione componentes usando o painel lateral</p>
                      <Button 
                        variant="outline" 
                        className="border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A]/10"
                        onClick={() => handleComponentSelect('headline')}
                      >
                        Adicionar Primeiro Componente
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {blocks.sort((a, b) => a.order - b.order).map(block => (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          isSelected={selectedBlockId === block.id}
                          isPreviewing={isPreviewing}
                          onSelect={() => !isPreviewing && selectBlock(block.id)}
                        />
                      ))}
                    </div>
                  )}
                </SortableContext>
              </DndContext>
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
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { title: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Subtítulo</label>
                        <textarea
                          value={selectedComponent.content.subtitle || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { subtitle: e.target.value })}
                          className="w-full p-2 border rounded"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedComponent.type === 'text' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Texto</label>
                        <textarea
                          value={selectedComponent.content.text || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { text: e.target.value })}
                          className="w-full p-2 border rounded"
                          rows={5}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedComponent.type === 'image' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">URL da Imagem</label>
                        <input
                          type="text"
                          value={selectedComponent.content.imageUrl || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { imageUrl: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                        
                        {selectedComponent.content.imageUrl && (
                          <div className="mt-2 p-2 bg-gray-50 rounded">
                            <img 
                              src={selectedComponent.content.imageUrl} 
                              alt="Preview" 
                              className="max-h-40 mx-auto object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://placehold.co/600x400?text=Imagem+inválida';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Texto Alternativo</label>
                        <input
                          type="text"
                          value={selectedComponent.content.imageAlt || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { imageAlt: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedComponent.type === 'pricing' && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nome do Produto</label>
                        <input
                          type="text"
                          value={selectedComponent.content.title || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { title: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preço</label>
                        <input
                          type="text"
                          value={selectedComponent.content.price || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { price: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preço Regular</label>
                        <input
                          type="text"
                          value={selectedComponent.content.regularPrice || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { regularPrice: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Texto do CTA</label>
                        <input
                          type="text"
                          value={selectedComponent.content.ctaText || ''}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { ctaText: e.target.value })}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="style">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cor de Fundo</label>
                      <input
                        type="color"
                        value={(selectedComponent.content.style?.backgroundColor as string) || '#ffffff'}
                        onChange={(e) => handleUpdateBlock(selectedBlockId, { 
                          style: { 
                            ...selectedComponent.content.style,
                            backgroundColor: e.target.value 
                          } 
                        })}
                        className="w-full h-8 p-1 border rounded"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Cor do Texto</label>
                      <input
                        type="color"
                        value={(selectedComponent.content.style?.color as string) || '#000000'}
                        onChange={(e) => handleUpdateBlock(selectedBlockId, { 
                          style: { 
                            ...selectedComponent.content.style,
                            color: e.target.value 
                          } 
                        })}
                        className="w-full h-8 p-1 border rounded"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Raio da Borda</label>
                      <input
                        type="range"
                        min="0"
                        max="32"
                        value={String(Number(selectedComponent.content.style?.borderRadius || 0))}
                        onChange={(e) => handleUpdateBlock(selectedBlockId, { 
                          style: { 
                            ...selectedComponent.content.style,
                            borderRadius: Number(e.target.value)
                          } 
                        })}
                        className="w-full"
                      />
                      <div className="text-right text-xs text-gray-500">
                        {Number(selectedComponent.content.style?.borderRadius || 0)}px
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Padding Vertical</label>
                        <input
                          type="range"
                          min="0"
                          max="64"
                          value={String(Number(selectedComponent.content.style?.paddingY || 16))}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { 
                            style: { 
                              ...selectedComponent.content.style,
                              paddingY: Number(e.target.value)
                            } 
                          })}
                          className="w-full"
                        />
                        <div className="text-right text-xs text-gray-500">
                          {Number(selectedComponent.content.style?.paddingY || 16)}px
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Padding Horizontal</label>
                        <input
                          type="range"
                          min="0"
                          max="64"
                          value={String(Number(selectedComponent.content.style?.paddingX || 16))}
                          onChange={(e) => handleUpdateBlock(selectedBlockId, { 
                            style: { 
                              ...selectedComponent.content.style,
                              paddingX: Number(e.target.value)
                            } 
                          })}
                          className="w-full"
                        />
                        <div className="text-right text-xs text-gray-500">
                          {Number(selectedComponent.content.style?.paddingX || 16)}px
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mt-4 border-t pt-4">
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    handleDeleteBlock(selectedBlockId);
                    selectBlock(null);
                    toast({
                      description: "Componente excluído com sucesso.",
                      duration: 3000,
                    });
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
