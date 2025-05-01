
import { useState, useCallback, useEffect } from 'react';
import { Block } from '@/types/editor';
import { toast } from '@/components/ui/use-toast';
import { getDefaultContentForType } from '@/utils/editorDefaults';
import { generateId } from '@/utils/idGenerator';

const STORAGE_KEY_PREFIX = 'sales_page_editor_';

export const useSalesPageEditor = (styleType: string) => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar blocos salvos
  useEffect(() => {
    const loadBlocks = () => {
      try {
        const savedBlocks = localStorage.getItem(`${STORAGE_KEY_PREFIX}${styleType}`);
        if (savedBlocks) {
          const parsedBlocks = JSON.parse(savedBlocks);
          setBlocks(parsedBlocks);
          console.info(`Blocos da página de vendas carregados para ${styleType}:`, parsedBlocks.length);
        } else {
          console.info(`Nenhum bloco da página de vendas encontrado para ${styleType}.`);
          setBlocks([]);
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Erro ao carregar blocos da página de vendas:', error);
        setBlocks([]);
        setIsInitialized(true);
      }
    };
    
    loadBlocks();
  }, [styleType]);

  const handleAddBlock = useCallback((type: Block['type']): string => {
    const newBlock: Block = {
      id: generateId(),
      type,
      content: getDefaultContentForType(type),
      order: blocks.length
    };
    
    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    return newBlock.id;
  }, [blocks]);

  const handleUpdateBlock = useCallback((id: string, updates: any) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id 
          ? { ...block, content: { ...block.content, ...updates } } 
          : block
      )
    );
  }, []);

  const handleDeleteBlock = useCallback((id: string) => {
    setBlocks(prevBlocks => 
      prevBlocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }))
    );
  }, []);

  const handleReorderBlocks = useCallback((sourceIndex: number, destinationIndex: number) => {
    setBlocks(prevBlocks => {
      const result = Array.from(prevBlocks);
      const [removed] = result.splice(sourceIndex, 1);
      result.splice(destinationIndex, 0, removed);
      
      return result.map((block, index) => ({
        ...block,
        order: index
      }));
    });
  }, []);

  const handleSave = useCallback(async () => {
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}${styleType}`, JSON.stringify(blocks));
      return true;
    } catch (error) {
      console.error('Erro ao salvar página de vendas:', error);
      return false;
    }
  }, [blocks, styleType]);

  // Função para carregar um template
  const loadTemplate = useCallback((templateBlocks: Block[]) => {
    try {
      setBlocks(templateBlocks);
      return true;
    } catch (error) {
      console.error('Erro ao carregar template:', error);
      return false;
    }
  }, []);

  return {
    blocks,
    selectedBlockId,
    selectBlock: setSelectedBlockId,
    isPreviewing,
    togglePreview: () => setIsPreviewing(prev => !prev),
    isInitialized,
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleReorderBlocks,
    handleSave,
    loadTemplate
  };
};
