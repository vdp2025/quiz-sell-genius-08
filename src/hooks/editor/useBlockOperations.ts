
import { useState, useCallback } from 'react';
import { Block, BlockType } from '@/types/editor';
import { getDefaultContentForType } from '@/utils/editorDefaults';
import { toast } from '@/components/ui/use-toast';

export const useBlockOperations = (initialBlocks: Block[] = []) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const updateBlocks = useCallback((newBlocks: Block[]) => {
    setBlocks(newBlocks);
  }, []);

  const handleAddBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      order: blocks.length,
      content: getDefaultContentForType(type)
    };

    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    
    toast({
      title: "Bloco adicionado",
      description: `Um novo bloco do tipo ${type} foi adicionado.`,
    });
    
    return newBlock.id;
  }, [blocks]);

  const handleUpdateBlock = useCallback((id: string, content: any) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id
          ? { ...block, content: { ...block.content, ...content } }
          : block
      )
    );
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks(prevBlocks => {
      const filtered = prevBlocks.filter(block => block.id !== id);
      // Reorder blocks after deletion
      return filtered.map((block, index) => ({
        ...block,
        order: index
      }));
    });
    
    // If the selected block is deleted, clear selection
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
    
    toast({
      title: "Bloco removido",
      description: "O bloco foi removido com sucesso.",
    });
  }, [selectedBlockId]);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setBlocks(prevBlocks => {
      const result = Array.from(prevBlocks);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      // Update order property
      return result.map((block, index) => ({
        ...block,
        order: index
      }));
    });
  }, []);
  
  const handleDuplicateBlock = useCallback((id: string) => {
    const blockToDuplicate = blocks.find(block => block.id === id);
    
    if (blockToDuplicate) {
      const newBlock: Block = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
        order: blocks.length
      };
      
      setBlocks(prevBlocks => [...prevBlocks, newBlock]);
      setSelectedBlockId(newBlock.id);
      
      toast({
        title: "Bloco duplicado",
        description: `O bloco ${blockToDuplicate.type} foi duplicado com sucesso.`,
      });
    }
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
      handleReorderBlocks,
      handleDuplicateBlock
    }
  };
};
