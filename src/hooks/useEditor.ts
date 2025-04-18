
import { useState } from 'react';
import { EditorBlock, EditorConfig } from '@/types/editor';

const defaultConfig: EditorConfig = {
  blocks: [],
  theme: {
    primaryColor: '#B89B7A',
    secondaryColor: '#8F7A6A',
    backgroundColor: '#fffaf7',
    textColor: '#432818',
    fontFamily: 'Playfair Display'
  }
};

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>(defaultConfig);

  const addBlock = (type: EditorBlock['type']) => {
    const newBlock: EditorBlock = {
      id: Date.now().toString(),
      type,
      content: {},
      order: config.blocks.length
    };
    
    setConfig({
      ...config,
      blocks: [...config.blocks, newBlock]
    });
  };

  const updateBlock = (id: string, content: Partial<EditorBlock['content']>) => {
    setConfig({
      ...config,
      blocks: config.blocks.map(block =>
        block.id === id
          ? { ...block, content: { ...block.content, ...content } }
          : block
      )
    });
  };

  const deleteBlock = (id: string) => {
    setConfig({
      ...config,
      blocks: config.blocks.filter(block => block.id !== id)
    });
  };

  const reorderBlocks = (startIndex: number, endIndex: number) => {
    const newBlocks = Array.from(config.blocks);
    const [removed] = newBlocks.splice(startIndex, 1);
    newBlocks.splice(endIndex, 0, removed);
    
    setConfig({
      ...config,
      blocks: newBlocks.map((block, index) => ({
        ...block,
        order: index
      }))
    });
  };

  return {
    config,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks
  };
};
