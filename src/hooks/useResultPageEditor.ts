
import { useState, useCallback, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useResultPageConfig } from './useResultPageConfig';
import { useBlockOperations } from './useBlockOperations';
import { ResultPageBlock } from '@/types/resultPageTypes';

export const useResultPageEditor = (styleType: string = 'default') => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false);
  
  const {
    resultPageConfig,
    updateSection,
    saveConfig,
    resetConfig,
    importConfig,
    loading
  } = useResultPageConfig(styleType);
  
  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    updateBlocks,
    actions
  } = useBlockOperations(resultPageConfig?.blocks || []);
  
  // Sync blocks with config when loaded
  useEffect(() => {
    if (resultPageConfig?.blocks && !loading) {
      try {
        updateBlocks(resultPageConfig.blocks);
      } catch (error) {
        console.error("Error updating blocks from config:", error);
        // Use empty array as fallback if blocks can't be parsed
        updateBlocks([]);
      }
    }
  }, [resultPageConfig?.blocks, loading, updateBlocks]);
  
  // Sync blocks back to config when they change
  useEffect(() => {
    if (!loading && resultPageConfig) {
      try {
        updateSection('blocks', blocks);
      } catch (error) {
        console.error("Error updating blocks in config:", error);
        toast({
          title: "Erro ao atualizar blocos",
          description: "Não foi possível salvar suas alterações. Tente novamente.",
          variant: "destructive"
        });
      }
    }
  }, [blocks, updateSection, loading, resultPageConfig]);

  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId);
  }, [setSelectedBlockId]);

  const toggleGlobalStyles = useCallback(() => {
    setIsGlobalStylesOpen(prev => !prev);
  }, []);

  return {
    resultPageConfig: resultPageConfig || { styleType: styleType, blocks: [], globalStyles: {} },
    loading,
    blocks,
    selectedBlockId,
    isPreviewing,
    isGlobalStylesOpen,
    selectBlock,
    actions: {
      handleSave: saveConfig,
      handleReset: () => resetConfig(styleType),
      toggleGlobalStyles,
      togglePreview,
      updateSection,
      importConfig,
      ...actions, // Include block operation actions
    }
  };
};
