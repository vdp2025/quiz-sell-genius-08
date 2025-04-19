import { useState, useCallback, useEffect } from 'react';
import { Block } from '@/types/editor';
import { EditorState, BlockManipulationActions } from '@/types/editorTypes';
import { toast } from '@/components/ui/use-toast';
import { useResultPageConfig } from './useResultPageConfig';
import { BlockFactory } from '@/utils/blocks/BlockFactory';
import { resultPageStorage } from '@/services/resultPageStorage';

export const useResultPageEditor = (styleType: string) => {
  const [state, setState] = useState<EditorState>({
    selectedBlockId: null,
    isPreviewing: false,
    blocks: [],
    isGlobalStylesOpen: false
  });

  const { 
    resultPageConfig, 
    updateSection: updateConfigSection, 
    saveConfig: saveConfigToDB,
    resetConfig,
    loading 
  } = useResultPageConfig(styleType);

  useEffect(() => {
    if (resultPageConfig && !loading) {
      setState(prev => ({
        ...prev,
        blocks: resultPageConfig.blocks || []
      }));
    }
  }, [resultPageConfig, loading]);

  useEffect(() => {
    if (state.blocks.length === 0) return;
    
    const saveTimer = setTimeout(() => {
      handleSave();
    }, 2000);
    
    return () => clearTimeout(saveTimer);
  }, [state.blocks]);

  const togglePreview = useCallback(() => {
    setState(prev => ({ ...prev, isPreviewing: !prev.isPreviewing }));
  }, []);

  const handleAddBlock = useCallback((type: Block['type']) => {
    const newBlock = BlockFactory.createBlock(type, state.blocks.length, styleType);
    
    setState(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock],
      selectedBlockId: newBlock.id
    }));
    
    setTimeout(() => handleSave(), 100);
    
    return newBlock.id;
  }, [state.blocks, styleType]);

  const handleUpdateBlock = useCallback((id: string, content: any) => {
    setState(prev => {
      const updatedBlocks = prev.blocks.map(block =>
        block.id === id ? { ...block, content: { ...block.content, ...content } } : block
      );
      
      return {
        ...prev,
        blocks: updatedBlocks
      };
    });
  }, []);

  const handleUpdateBlocks = useCallback((newBlocks: Block[]) => {
    setState(prev => ({
      ...prev,
      blocks: newBlocks
    }));
    
    setTimeout(() => handleSave(), 100);
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setState(prev => {
      const newBlocks = prev.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }));
      
      return {
        ...prev,
        blocks: newBlocks,
        selectedBlockId: null
      };
    });
    
    setTimeout(() => handleSave(), 100);
  }, []);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setState(prev => {
      const result = Array.from(prev.blocks);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      const newBlocks = result.map((block, index) => ({
        ...block,
        order: index
      }));
      
      return {
        ...prev,
        blocks: newBlocks
      };
    });
    
    setTimeout(() => handleSave(), 100);
  }, []);

  const toggleGlobalStyles = useCallback(() => {
    setState(prev => ({
      ...prev,
      isGlobalStylesOpen: !prev.isGlobalStylesOpen
    }));
  }, []);

  const handleUpdateSection = useCallback((path: string, newContent: any) => {
    updateConfigSection(path, newContent);

    if (path === 'blocks') {
      setState(prev => ({
        ...prev,
        blocks: newContent
      }));
    }
  }, [updateConfigSection]);

  const handleSave = useCallback(async (): Promise<void> => {
    try {
      console.log("Saving blocks:", state.blocks);
      
      const configToSave = {
        ...resultPageConfig,
        blocks: state.blocks
      };
      
      await resultPageStorage.save(configToSave);
      
      updateConfigSection('blocks', state.blocks);
      
      toast({
        title: "Configuração salva",
        description: "As alterações foram salvas com sucesso",
        variant: "default"
      });
      
      return Promise.resolve();
    } catch (error) {
      console.error('Error saving result page config:', error);
      toast({
        title: 'Erro ao salvar configuração',
        description: 'Não foi possível salvar a configuração da página de resultados',
        variant: 'destructive'
      });
      
      return Promise.reject(error);
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
      handleUpdateBlocks,
      handleDeleteBlock,
      handleReorderBlocks
    }
  };
};
