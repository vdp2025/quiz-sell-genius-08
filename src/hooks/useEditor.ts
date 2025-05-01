
import { useState, useCallback } from 'react';
import { Block, BlockType, EditorBlock, EditorConfig } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForBlockType } from '@/utils/blockDefaults';
import { BorderRadiusType } from '@/types/resultPageConfig';
import { sanitizeBorderRadius } from '@/utils/styleUtils';

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>({ 
    blocks: [],
    allowedBlockTypes: [],
    maxDepth: 1,
    globalStyles: {} // Initialize globalStyles
  });

  const addBlock = useCallback((type: BlockType) => {
    const id = generateId();
    
    // Get default content for the block type
    const defaultContent = getDefaultContentForBlockType(type);
    
    // Ensure alignment is properly typed
    let content = { ...defaultContent };
    if (content.alignment && typeof content.alignment === 'string') {
      // Ensure alignment is one of the allowed values
      content.alignment = (['left', 'center', 'right'].includes(content.alignment) 
        ? content.alignment as 'left' | 'center' | 'right'
        : 'center');
    }
    
    // Ensure borderRadius is properly typed
    if (content.style && typeof content.style.borderRadius === 'string') {
      content.style.borderRadius = sanitizeBorderRadius(content.style.borderRadius);
    }
    
    const newBlock: EditorBlock = {
      id,
      type,
      content,
      order: config.blocks.length
    };
    
    setConfig(prevConfig => ({
      ...prevConfig,
      blocks: [...prevConfig.blocks, newBlock]
    }));
    
    return id;
  }, [config.blocks.length]);

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
