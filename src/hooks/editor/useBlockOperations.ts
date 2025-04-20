
import { useState, useCallback } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/blockDefaults';

export const useBlockOperations = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlocks = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
  }, []);

  const handleAddBlock = useCallback((type: BlockType) => {
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

  const handleUpdateBlock = useCallback((id: string, content: Partial<EditableContent>) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id 
          ? { ...block, content: { ...block.content, ...content } } 
          : block
      )
    );
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks(prev => {
      const filteredBlocks = prev.filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }));
      
      if (selectedBlockId === id) {
        setSelectedBlockId(null);
      }
      
      return filteredBlocks;
    });
  }, [selectedBlockId]);

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
    updateBlocks,
    actions: {
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks
    }
  };
};
