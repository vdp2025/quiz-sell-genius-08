
import { useState, useCallback } from 'react';
import { Block, BlockType, EditableContent } from '@/types/editor';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/blockDefaults';

export const useEditor = () => {
  const [config, setConfig] = useState<{ blocks: Block[] }>({
    blocks: []
  });

  const addBlock = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: config.blocks.length
    };

    setConfig(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));

    return newBlock.id;
  }, [config.blocks]);

  const updateBlock = useCallback((id: string, content: Partial<EditableContent>) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(block => 
        block.id === id 
          ? { ...block, content: { ...block.content, ...content } } 
          : block
      )
    }));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }))
    }));
  }, []);

  const reorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setConfig(prev => {
      const newBlocks = Array.from(prev.blocks);
      const [removedBlock] = newBlocks.splice(sourceIndex, 1);
      newBlocks.splice(destinationIndex, 0, removedBlock);
      
      return {
        ...prev,
        blocks: newBlocks.map((block, index) => ({
          ...block,
          order: index
        }))
      };
    });
  }, []);

  const saveConfig = useCallback(async () => {
    try {
      // In a real implementation, this would save to a database
      localStorage.setItem('editor_config', JSON.stringify(config));
      toast({
        title: "Configuração salva",
        description: "Suas alterações foram salvas com sucesso",
      });
      return true;
    } catch (error) {
      console.error('Error saving config', error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar suas alterações",
        variant: "destructive"
      });
      return false;
    }
  }, [config]);

  return {
    config,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    saveConfig
  };
};
