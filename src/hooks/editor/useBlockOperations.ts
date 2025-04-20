
import { useState, useCallback } from 'react';
import { Block } from '@/types/editor';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/blockDefaults';

export const useBlockOperations = (initialBlocks: Block[] = []) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };
    
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    return newBlock.id;
  }, [blocks]);

  const handleUpdateBlock = useCallback((id: string, content: any) => {
    setBlocks(prev => prev.map(block =>
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    ));
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks(prev => 
      prev.filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }))
    );
    setSelectedBlockId(null);
  }, []);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setBlocks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      return result.map((block, index) => ({
        ...block,
        order: index
      }));
    });
  }, []);

  return {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    actions: {
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks
    }
  };
};
