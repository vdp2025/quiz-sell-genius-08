
import React, { useState, useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { EditorPreview } from './EditorPreview';
import { PropertiesPanel } from './PropertiesPanel';
import EditorToolbar from './EditorToolbar';
import { StyleResult } from '@/types/quiz';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';
import { toast } from '@/components/ui/use-toast';
import { Block } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';

export const ResultPageVisualEditor: React.FC = () => {
  const [selectedStyle, setSelectedStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 5,
    percentage: 19
  });
  
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  
  const { 
    resultPageConfig, 
    updateSection, 
    saveConfig,
    loading 
  } = useResultPageConfig(selectedStyle.category);
  
  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };
    
    setBlocks([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    return newBlock.id;
  };
  
  const handleUpdateBlock = (id: string, content: any) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  };
  
  const handleDeleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index })));
    setSelectedBlockId(null);
  };
  
  const handleSave = async () => {
    const success = await saveConfig();
    if (success) {
      toast({
        title: 'Alterações salvas',
        description: 'As configurações da página de resultados foram salvas com sucesso.'
      });
    } else {
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as configurações.',
        variant: 'destructive'
      });
    }
  };
  
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#1A1818]/70">Carregando configurações...</p>
      </div>
    );
  }
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorToolbar 
        onSave={handleSave}
        isPreviewing={isPreviewing}
        onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Components */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar 
            onComponentSelect={handleAddBlock}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - Preview */}
        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            isPreviewing={isPreviewing}
            primaryStyle={selectedStyle}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Properties */}
        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => setSelectedBlockId(null)}
            onUpdate={handleUpdateBlock}
            onDelete={handleDeleteBlock}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

// Function to get default content for a block type
const getDefaultContentForType = (type: Block['type']) => {
  switch (type) {
    case 'headline':
      return { title: 'VOCÊ DESCOBRIU SEU ESTILO', subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você' };
    case 'text':
      return { text: 'Digite seu texto aqui...' };
    case 'image':
      return { imageUrl: '', imageAlt: '' };
    case 'benefits':
      return { title: 'Benefícios', items: ['Benefício 1', 'Benefício 2', 'Benefício 3'] };
    case 'pricing':
      return { regularPrice: '197,00', salePrice: '97,00', buttonText: 'Quero Transformar Meu Estilo' };
    case 'guarantee':
      return { text: 'Garantia de 7 dias' };
    case 'cta':
      return { buttonText: 'Clique Aqui', url: '#' };
    case 'style-result':
      return { title: 'Seu estilo predominante é {{primaryStyle}}' };
    case 'secondary-styles':
      return { title: 'Seus Estilos Complementares' };
    default:
      return {};
  }
};
