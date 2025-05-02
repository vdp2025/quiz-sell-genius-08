
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Block } from '@/types/editor';
import { toast } from '@/components/ui/use-toast';

export const useBlockOperations = (initialBlocks: Block[] = []) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlocks = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
  }, []);

  const handleAddBlock = useCallback((type: Block['type'], defaultContent: any = {}) => {
    const newBlock: Block = {
      id: `block-${uuidv4()}`,
      type,
      content: defaultContent,
      order: blocks.length
    };
    
    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    
    toast({
      title: "Bloco adicionado",
      description: `Um novo bloco do tipo ${type} foi adicionado.`
    });
    
    return newBlock.id;
  }, [blocks.length]);

  const handleUpdateBlock = useCallback((blockId: string, content: any) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === blockId ? { ...block, content: { ...block.content, ...content } } : block
      )
    );
  }, []);

  const handleDeleteBlock = useCallback((blockId: string) => {
    setBlocks(prevBlocks => prevBlocks.filter(block => block.id !== blockId));
    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
    
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido com sucesso."
    });
  }, [selectedBlockId]);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setBlocks(prevBlocks => {
      const result = Array.from(prevBlocks);
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
