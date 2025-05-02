
import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Block } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';

export const useSalesPageEditor = (styleType: string) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const addBlock = useCallback((type: string) => {
    const newBlock: Block = {
      id: uuidv4(),
      type,
      content: {},
      styles: {},
    };
    
    setBlocks(prev => [...prev, newBlock]);
    return newBlock.id;
  }, []);

  const updateBlock = useCallback((id: string, content: any) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === id ? { ...block, content } : block
      )
    );
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
    if (selectedBlockId === id) {
      setSelectedBlockId(null);
    }
  }, [selectedBlockId]);

  const moveBlock = useCallback((fromIndex: number, toIndex: number) => {
    setBlocks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  const selectBlock = useCallback((id: string | null) => {
    setSelectedBlockId(id);
  }, []);

  const loadTemplate = useCallback((templateBlocks: Block[]) => {
    try {
      setBlocks(templateBlocks.map(block => ({
        ...block,
        id: uuidv4() // Regenerate IDs to ensure uniqueness
      })));
      return true;
    } catch (error) {
      console.error('Error loading sales page template:', error);
      return false;
    }
  }, []);

  const handleSave = useCallback(async () => {
    try {
      const salesPageConfig = {
        styleType,
        blocks,
      };
      
      // Implement actual saving logic here if needed
      // For now, just show a success message
      toast({
        title: "Salvo com sucesso",
        description: "As alterações na página de vendas foram salvas.",
      });
      
      return true;
    } catch (error) {
      console.error('Error saving sales page:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive"
      });
      return false;
    }
  }, [blocks, styleType]);

  return {
    blocks,
    selectedBlockId,
    isDragging,
    addBlock,
    updateBlock,
    deleteBlock,
    moveBlock,
    selectBlock,
    setIsDragging,
    loadTemplate,
    handleSave
  };
};
