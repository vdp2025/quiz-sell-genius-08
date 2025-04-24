
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Block, EditableContent } from '@/types/editor';
import { useToast } from '@/hooks/use-toast';
import { getDefaultContentForType } from '@/utils/blockDefaults';
import { generateId } from '@/utils/idGenerator';

interface EditorContextType {
  blocks: Block[];
  selectedBlockId: string | null;
  isPreviewing: boolean;
  addBlock: (type: string) => void;
  updateBlock: (id: string, content: Partial<EditableContent>) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (id: string | null) => void;
  reorderBlocks: (startIndex: number, endIndex: number) => void;
  togglePreview: () => void;
}

const EditorContext = createContext<EditorContextType | null>(null);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { toast } = useToast();

  const addBlock = useCallback((type: string) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };

    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    
    toast({
      title: "Componente adicionado",
      description: `${type} foi adicionado com sucesso.`
    });
  }, [blocks.length, toast]);

  const updateBlock = useCallback((id: string, content: Partial<EditableContent>) => {
    setBlocks(prev => prev.map(block => 
      block.id === id 
        ? { ...block, content: { ...block.content, ...content } }
        : block
    ));
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(block => block.id !== id));
    setSelectedBlockId(null);
    
    toast({
      title: "Componente removido",
      description: "O componente foi removido com sucesso."
    });
  }, [toast]);

  const selectBlock = useCallback((id: string | null) => {
    setSelectedBlockId(id);
  }, []);

  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
    setBlocks(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((block, index) => ({ ...block, order: index }));
    });
  }, []);

  const togglePreview = useCallback(() => {
    setIsPreviewing(prev => !prev);
  }, []);

  return (
    <EditorContext.Provider value={{
      blocks,
      selectedBlockId,
      isPreviewing,
      addBlock,
      updateBlock,
      deleteBlock,
      selectBlock,
      reorderBlocks,
      togglePreview
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
};
