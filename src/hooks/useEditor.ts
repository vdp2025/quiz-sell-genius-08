
import { useState, useCallback } from 'react';
import { Block, BlockType, EditorConfig } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForBlockType } from '@/utils/blockDefaults';

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>({ blocks: [] });

  const addBlock = useCallback((type: BlockType) => {
    const id = generateId();
    setConfig(prevConfig => ({
      ...prevConfig,
      blocks: [
        ...prevConfig.blocks,
        {
          id,
          type,
          content: getDefaultContentForBlockType(type),
          order: prevConfig.blocks.length
        }
      ]
    }));
    return id;
  }, []);

  const updateBlock = useCallback((id: string, updates: any) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      blocks: prevConfig.blocks.map(block => 
        block.id === id 
          ? { ...block, content: { ...block.content, ...updates } } 
          : block
      )
    }));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setConfig(prevConfig => ({
      ...prevConfig,
      blocks: prevConfig.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }))
    }));
  }, []);

  const reorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setConfig(prevConfig => {
      const newBlocks = Array.from(prevConfig.blocks);
      const [removed] = newBlocks.splice(sourceIndex, 1);
      newBlocks.splice(destinationIndex, 0, removed);
      
      return {
        ...prevConfig,
        blocks: newBlocks.map((block, index) => ({ ...block, order: index }))
      };
    });
  }, []);

  const saveConfig = useCallback(() => {
    console.log('Saving editor config:', config);
    // Implement actual saving logic here (API call, localStorage, etc.)
    return true;
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
