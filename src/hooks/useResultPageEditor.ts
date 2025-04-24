
import { useState, useCallback, useEffect } from 'react';
import { Block } from '@/types/editor';
import { EditorState, BlockManipulationActions } from '@/types/editorTypes';
import { toast } from '@/components/ui/use-toast';
import { useResultPageConfig } from './useResultPageConfig';
import { getDefaultContentForType } from '@/utils/blockDefaults';
import { generateId } from '@/utils/idGenerator';

export const useResultPageEditor = (styleType: string) => {
  const [state, setState] = useState<EditorState>({
    selectedBlockId: null,
    isPreviewing: false,
    blocks: [],
    isGlobalStylesOpen: false
  });

  const { 
    resultPageConfig, 
    updateSection, 
    saveConfig,
    resetConfig,
    importConfig,
    loading 
  } = useResultPageConfig(styleType);

  // Initialize blocks from config when it's loaded
  useEffect(() => {
    if (resultPageConfig?.blocks) {
      setState(prev => ({
        ...prev,
        blocks: resultPageConfig.blocks
      }));
    } else {
      // Initialize with empty blocks array if not present
      updateSection('blocks', []);
    }
  }, [resultPageConfig, updateSection]);

  const togglePreview = useCallback(() => {
    setState(prev => ({ ...prev, isPreviewing: !prev.isPreviewing }));
  }, []);

  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: state.blocks.length
    };
    
    setState(prev => {
      const newBlocks = [...prev.blocks, newBlock];
      updateSection('blocks', newBlocks);
      return {
        ...prev,
        blocks: newBlocks,
        selectedBlockId: newBlock.id
      };
    });
    
    return newBlock.id;
  }, [state.blocks, updateSection]);

  const handleUpdateBlock = useCallback((id: string, content: any) => {
    setState(prev => {
      const updatedBlocks = prev.blocks.map(block =>
        block.id === id ? { ...block, content: { ...block.content, ...content } } : block
      );
      updateSection('blocks', updatedBlocks);
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  }, [updateSection]);

  const handleDeleteBlock = useCallback((id: string) => {
    setState(prev => {
      const filteredBlocks = prev.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }));
      updateSection('blocks', filteredBlocks);
      return {
        ...prev,
        blocks: filteredBlocks,
        selectedBlockId: null
      };
    });
  }, [updateSection]);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setState(prev => {
      const result = Array.from(prev.blocks);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      const reorderedBlocks = result.map((block, index) => ({
        ...block,
        order: index
      }));
      
      updateSection('blocks', reorderedBlocks);
      return {
        ...prev,
        blocks: reorderedBlocks
      };
    });
  }, [updateSection]);

  const toggleGlobalStyles = useCallback(() => {
    setState(prev => ({
      ...prev,
      isGlobalStylesOpen: !prev.isGlobalStylesOpen
    }));
  }, []);

  return {
    resultPageConfig,
    loading,
    isPreviewing: state.isPreviewing,
    isGlobalStylesOpen: state.isGlobalStylesOpen,
    actions: {
      handleSave: saveConfig,
      handleReset: () => resetConfig(styleType),
      toggleGlobalStyles,
      togglePreview,
      updateSection,
      importConfig
    }
  };
};
