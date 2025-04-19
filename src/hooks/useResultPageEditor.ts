
import { useState, useCallback, useEffect } from 'react';
import { Block } from '@/types/editor';
import { EditorState, BlockManipulationActions } from '@/types/editorTypes';
import { toast } from '@/components/ui/use-toast';
import { useResultPageConfig } from './useResultPageConfig';
import { getDefaultContentForType } from '@/utils/blockDefaults';
import { generateId } from '@/utils/idGenerator';
import { set } from 'lodash';
import { resultPageStorage } from '@/services/resultPageStorage';

export const useResultPageEditor = (styleType: string) => {
  const [state, setState] = useState<EditorState>({
    selectedBlockId: null,
    isPreviewing: false,
    blocks: [],
    isGlobalStylesOpen: false
  });

  // Destructure functions from the useResultPageConfig hook
  const { 
    resultPageConfig, 
    updateSection: updateConfigSection, 
    saveConfig: saveConfigToDB,
    resetConfig,
    loading 
  } = useResultPageConfig(styleType);

  // Initialize blocks from resultPageConfig when it's loaded
  useEffect(() => {
    if (resultPageConfig && !loading) {
      setState(prev => ({
        ...prev,
        blocks: resultPageConfig.blocks || []
      }));
    }
  }, [resultPageConfig, loading]);

  // Auto-save when blocks change
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (state.blocks.length > 0) {
        handleSave();
      }
    }, 3000); // Auto-save after 3 seconds of inactivity

    return () => clearTimeout(autoSaveTimer);
  }, [state.blocks]);

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
    
    setState(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
      selectedBlockId: newBlock.id
    }));
    
    return newBlock.id;
  }, [state.blocks]);

  const handleUpdateBlock = useCallback((id: string, content: any) => {
    setState(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === id ? { ...block, content: { ...block.content, ...content } } : block
      )
    }));
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      blocks: prev.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index })),
      selectedBlockId: null
    }));
  }, []);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setState(prev => {
      const result = Array.from(prev.blocks);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      return {
        ...prev,
        blocks: result.map((block, index) => ({
          ...block,
          order: index
        }))
      };
    });
  }, []);

  const toggleGlobalStyles = useCallback(() => {
    setState(prev => ({
      ...prev,
      isGlobalStylesOpen: !prev.isGlobalStylesOpen
    }));
  }, []);

  // Renamed from updateSection to handleUpdateSection to avoid conflicts
  const handleUpdateSection = useCallback((path: string, newContent: any) => {
    // Call the updateSection from useResultPageConfig
    updateConfigSection(path, newContent);

    // Update blocks if blocks array is being modified
    if (path === 'blocks') {
      setState(prev => ({
        ...prev,
        blocks: newContent
      }));
    }
  }, [updateConfigSection]);

  // Renamed from saveConfig to handleSave to avoid conflicts
  const handleSave = useCallback(async (): Promise<void> => {
    try {
      // Ensure the latest blocks are in the config
      const configToSave = {
        ...resultPageConfig,
        blocks: state.blocks
      };
      
      await resultPageStorage.save(configToSave);
      
      // Update the config in the hook
      updateConfigSection('blocks', state.blocks);
      
      toast({
        title: "Configuração salva",
        description: "As alterações foram salvas com sucesso",
        variant: "default"
      });
    } catch (error) {
      console.error('Error saving result page config:', error);
      toast({
        title: 'Erro ao salvar configuração',
        description: 'Não foi possível salvar a configuração da página de resultados',
        variant: 'destructive'
      });
    }
  }, [resultPageConfig, state.blocks, updateConfigSection]);

  return {
    resultPageConfig,
    loading,
    blocks: state.blocks,
    selectedBlockId: state.selectedBlockId,
    isPreviewing: state.isPreviewing,
    isGlobalStylesOpen: state.isGlobalStylesOpen,
    actions: {
      handleSave,
      handleReset: () => resetConfig(styleType),
      toggleGlobalStyles,
      togglePreview,
      updateSection: handleUpdateSection,
      setSelectedBlockId: (id: string | null) => setState(prev => ({ ...prev, selectedBlockId: id })),
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks
    }
  };
};
