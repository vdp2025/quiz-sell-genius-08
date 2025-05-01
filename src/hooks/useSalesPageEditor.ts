
import { useState, useCallback, useEffect } from 'react';
import { Block } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/editorDefaults';
import { toast } from '@/components/ui/use-toast';

const STORAGE_KEY = 'sales_page_editor_data';

export const useSalesPageEditor = (styleType: string) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on initialization
  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      try {
        const savedData = localStorage.getItem(`${STORAGE_KEY}_${styleType}`);
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setBlocks(parsedData.blocks || []);
        } else {
          // Initialize with empty blocks array or default blocks
          setBlocks([]);
        }
      } catch (error) {
        console.error('Error loading sales page data:', error);
        setBlocks([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [styleType]);

  // Select a block
  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId);
  }, []);

  // Add a new block
  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };
    
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    setSelectedBlockId(newBlock.id);
    
    return newBlock.id;
  }, [blocks]);

  // Update a block
  const handleUpdateBlock = useCallback((id: string, content: any) => {
    const updatedBlocks = blocks.map(block =>
      block.id === id ? { ...block, content: { ...block.content, ...content } } : block
    );
    
    setBlocks(updatedBlocks);
  }, [blocks]);

  // Delete a block
  const handleDeleteBlock = useCallback((id: string) => {
    const filteredBlocks = blocks
      .filter(block => block.id !== id)
      .map((block, index) => ({ ...block, order: index }));
    
    setBlocks(filteredBlocks);
    setSelectedBlockId(null);
  }, [blocks]);

  // Reorder blocks
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

  // Save the current state
  const handleSave = useCallback(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_${styleType}`, JSON.stringify({
        blocks
      }));
      
      toast({
        title: 'Alterações salvas',
        description: 'As configurações da página de vendas foram salvas com sucesso.'
      });
      
      return true;
    } catch (error) {
      console.error('Error saving sales page data:', error);
      
      toast({
        title: 'Erro ao salvar',
        description: 'Não foi possível salvar as alterações da página de vendas.',
        variant: 'destructive'
      });
      
      return false;
    }
  }, [blocks, styleType]);

  // Toggle preview mode
  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  return {
    blocks,
    selectedBlockId,
    isPreviewing,
    loading,
    selectBlock,
    actions: {
      handleSave,
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks,
      togglePreview
    }
  };
};
