
import { useState, useCallback } from 'react';
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
    loading 
  } = useResultPageConfig(styleType);

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

  const handleSave = async () => {
    // Convertendo blocos para o formato de config
    const success = await saveConfig();
    toast({
      title: success ? 'Alterações salvas' : 'Erro ao salvar',
      description: success 
        ? 'As configurações da página de resultados foram salvas com sucesso.'
        : 'Não foi possível salvar as configurações.',
      variant: success ? 'default' : 'destructive'
    });
  };

  const toggleGlobalStyles = () => {
    setState(prev => ({
      ...prev,
      isGlobalStylesOpen: !prev.isGlobalStylesOpen
    }));
  };

  return {
    state,
    setState,
    resultPageConfig,
    loading,
    actions: {
      handleAddBlock,
      handleUpdateBlock,
      handleDeleteBlock,
      handleReorderBlocks,
      handleSave,
      handleReset: () => resetConfig(styleType),
      toggleGlobalStyles
    }
  };
};
