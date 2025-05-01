
import { useState, useCallback } from 'react';
import { Block } from '@/types/editor';
import { toast } from '@/components/ui/use-toast';

export const useBlockOperations = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  const updateBlocks = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
  }, []);
  
  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      content: {}
    };
    
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    
    toast({
      title: "Bloco adicionado",
      description: `Um bloco do tipo ${type} foi adicionado`,
    });
    
    return newBlock.id;
  }, [blocks]);
  
  const handleUpdateBlock = useCallback((id: string, content: any) => {
    const newBlocks = blocks.map(block => 
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    );
    
    setBlocks(newBlocks);
  }, [blocks]);
  
  const handleDeleteBlock = useCallback((id: string) => {
    const newBlocks = blocks
      .filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    
    setBlocks(newBlocks);
    
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
    
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido com sucesso",
    });
  }, [blocks, selectedBlockId]);
  
  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    const result = Array.from(blocks);
    const [removed] = result.splice(sourceIndex, 1);
    result.splice(destinationIndex, 0, removed);
    
    const reorderedBlocks = result.map((block, index) => ({
      ...block,
      order: index
    }));
    
    setBlocks(reorderedBlocks);
  }, [blocks]);
  
  return {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    updateBlocks,
    actions: {
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks
    }
  };
};
