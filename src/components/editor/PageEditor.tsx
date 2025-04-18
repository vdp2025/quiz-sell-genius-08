
import React, { useState, useCallback } from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditorBlock } from '@/types/editor';
import { EditorBlockItem } from './EditorBlockItem';
import { AddBlockButton } from './AddBlockButton';
import { Button } from '../ui/button';
import { Eye, Save, Undo, Redo, MoveVertical } from 'lucide-react';
import { useToast } from '../ui/use-toast';

interface PageEditorProps {
  blocks: EditorBlock[];
  onBlocksChange: (blocks: EditorBlock[]) => void;
  onPreviewToggle: () => void;
  isPreviewing: boolean;
}

export const PageEditor: React.FC<PageEditorProps> = ({
  blocks,
  onBlocksChange,
  onPreviewToggle,
  isPreviewing
}) => {
  const { toast } = useToast();
  const [history, setHistory] = useState<EditorBlock[][]>([blocks]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  // Use pointer sensor to detect drag events
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  // Add new block to the editor
  const handleAddBlock = useCallback((type: EditorBlock['type']) => {
    const newBlocks = [...blocks, {
      id: `block-${Date.now()}`,
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    }];
    
    onBlocksChange(newBlocks);
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [blocks, onBlocksChange, history, historyIndex]);

  // Handle block update
  const handleUpdateBlock = useCallback((id: string, content: any) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    );
    
    onBlocksChange(newBlocks);
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [blocks, onBlocksChange, history, historyIndex]);

  // Handle block deletion
  const handleDeleteBlock = useCallback((id: string) => {
    const newBlocks = blocks.filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    
    onBlocksChange(newBlocks);
    // Add to history
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [blocks, onBlocksChange, history, historyIndex]);

  // Handle drag end event to reorder blocks
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeIndex = blocks.findIndex(block => block.id === active.id);
      const overIndex = blocks.findIndex(block => block.id === over.id);
      
      const newBlocks = arrayMove(blocks, activeIndex, overIndex)
        .map((block, index) => ({ ...block, order: index }));
      
      onBlocksChange(newBlocks);
      // Add to history
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newBlocks);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  };

  // Undo action
  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      onBlocksChange(history[historyIndex - 1]);
    } else {
      toast({
        title: "Não é possível desfazer",
        description: "Você já está no início do histórico.",
        variant: "destructive"
      });
    }
  };

  // Redo action
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      onBlocksChange(history[historyIndex + 1]);
    } else {
      toast({
        title: "Não é possível refazer",
        description: "Você já está no fim do histórico.",
        variant: "destructive"
      });
    }
  };

  // Save changes
  const handleSave = () => {
    toast({
      title: "Alterações salvas",
      description: "Suas alterações foram salvas com sucesso."
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Editor Toolbar */}
      <div className="bg-white border-b p-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleUndo}
            disabled={historyIndex === 0}
          >
            <Undo className="w-4 h-4 mr-1" />
            Desfazer
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
          >
            <Redo className="w-4 h-4 mr-1" />
            Refazer
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={onPreviewToggle}
          >
            <Eye className="w-4 h-4 mr-1" />
            {isPreviewing ? "Editar" : "Visualizar"}
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={handleSave}
            className="bg-[#B89B7A] hover:bg-[#8F7A6A]"
          >
            <Save className="w-4 h-4 mr-1" />
            Salvar
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-auto p-4 bg-[#FAF9F7]">
        {isPreviewing ? (
          <div className="bg-white rounded-lg shadow-sm p-6 min-h-96">
            {blocks.map(block => (
              <div key={block.id} className="mb-4">
                {renderBlockPreview(block)}
              </div>
            ))}
          </div>
        ) : (
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-4">
                {blocks.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-[#B89B7A]/40">
                    <p className="text-[#8F7A6A] mb-4">Sua página está vazia. Comece adicionando blocos!</p>
                    <AddBlockButton onAddBlock={handleAddBlock} />
                  </div>
                ) : (
                  blocks.map(block => (
                    <EditorBlockItem 
                      key={block.id}
                      block={block}
                      onUpdate={(content) => handleUpdateBlock(block.id, content)}
                      onDelete={() => handleDeleteBlock(block.id)}
                    />
                  ))
                )}
                
                {blocks.length > 0 && (
                  <div className="mt-8 text-center">
                    <AddBlockButton onAddBlock={handleAddBlock} />
                  </div>
                )}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

// Helper function to get default content for a block type
function getDefaultContentForType(type: EditorBlock['type']): any {
  switch (type) {
    case 'headline':
      return { title: 'Novo Título', subtitle: 'Novo Subtítulo', alignment: 'center' };
    case 'text':
      return { text: 'Adicione seu texto aqui', alignment: 'left' };
    case 'image':
      return { imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp', imageAlt: 'Descrição da imagem' };
    case 'benefits':
      return { title: 'Benefícios', items: ['Benefício 1', 'Benefício 2', 'Benefício 3'] };
    case 'testimonials':
      return { title: 'Depoimentos dos Clientes' };
    case 'pricing':
      return { 
        regularPrice: '175,00', 
        salePrice: '39,00', 
        buttonText: 'Quero Comprar Agora', 
        checkoutUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
      };
    case 'guarantee':
      return { 
        title: 'Garantia de 7 Dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.'
      };
    case 'cta':
      return { title: 'Comece Agora', buttonText: 'Quero Começar', url: '#' };
    default:
      return {};
  }
}

// Helper function to render preview of a block
function renderBlockPreview(block: EditorBlock) {
  switch (block.type) {
    case 'headline':
      return (
        <div className="text-center mb-6">
          {block.content.title && <h2 className="text-3xl font-playfair text-[#432818] mb-2">{block.content.title}</h2>}
          {block.content.subtitle && <p className="text-xl text-[#8F7A6A]">{block.content.subtitle}</p>}
        </div>
      );
    case 'text':
      return <p className="mb-4">{block.content.text}</p>;
    case 'image':
      return (
        <div className="mb-6 text-center">
          <img 
            src={block.content.imageUrl} 
            alt={block.content.imageAlt || ''} 
            className="max-w-full h-auto rounded-lg mx-auto"
          />
        </div>
      );
    case 'benefits':
      return (
        <div className="mb-6">
          <h3 className="text-xl font-playfair text-[#432818] mb-4">{block.content.title}</h3>
          <ul className="space-y-2">
            {block.content.items?.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#B89B7A]">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>
      );
    case 'pricing':
      return (
        <div className="mb-6 p-6 bg-white border rounded-lg text-center">
          <p className="text-lg line-through text-[#8F7A6A]">R$ {block.content.regularPrice}</p>
          <p className="text-3xl font-bold text-[#B89B7A] mb-4">R$ {block.content.salePrice}</p>
          <button className="bg-[#B89B7A] text-white px-6 py-2 rounded-md">
            {block.content.buttonText}
          </button>
        </div>
      );
    default:
      return <p>Bloco tipo: {block.type}</p>;
  }
}
