
import { useState, useEffect, useCallback } from 'react';
import { Block, EditorConfig } from '@/types/editor';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/blockDefaults';

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>({
    blocks: [],
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#1A1818',
      backgroundColor: '#fffaf7',
      fontFamily: 'Inter, sans-serif'
    },
    theme: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#1A1818',
      backgroundColor: '#fffaf7',
      fontFamily: 'Inter, sans-serif'
    },
    meta: {
      title: 'Página de Venda',
      description: 'Página de venda personalizada'
    }
  });

  // Load config from localStorage on initial mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('editorConfig');
    if (savedConfig) {
      try {
        setConfig(JSON.parse(savedConfig));
      } catch (error) {
        console.error('Error parsing saved config:', error);
      }
    }
  }, []);

  const addBlock = useCallback((type: Block['type']) => {
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
  }, [config.blocks.length]);

  const updateBlock = useCallback((id: string, content: any) => {
    setConfig(prev => ({
      ...prev,
      blocks: prev.blocks.map(block =>
        block.id === id ? { ...block, content: { ...block.content, ...content } } : block
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

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    setConfig(prev => {
      const newBlocks = Array.from(prev.blocks);
      const [removed] = newBlocks.splice(startIndex, 1);
      newBlocks.splice(endIndex, 0, removed);
      
      return {
        ...prev,
        blocks: newBlocks.map((block, index) => ({
          ...block,
          order: index
        }))
      };
    });
  }, []);

  const saveConfig = useCallback(() => {
    try {
      localStorage.setItem('editorConfig', JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Error saving config:', error);
      return false;
    }
  }, [config]);

  const updateConfig = useCallback((newConfig: Partial<EditorConfig>) => {
    setConfig(prev => ({
      ...prev,
      ...newConfig
    }));
  }, []);

  return {
    config,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    saveConfig,
    updateConfig
  };
};

export default useEditor;
