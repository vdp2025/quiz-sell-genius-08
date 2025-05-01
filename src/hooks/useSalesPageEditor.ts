
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
  const [isLoading, setIsLoading] = useState(true);

  // Carregar blocos salvos
  useEffect(() => {
    const loadBlocks = () => {
      setIsLoading(true);
      try {
        const savedBlocks = localStorage.getItem(`${STORAGE_KEY_PREFIX}${styleType}`);
        if (savedBlocks) {
          const parsedBlocks = JSON.parse(savedBlocks);
          setBlocks(parsedBlocks);
          console.info(`Blocos da página de vendas carregados para ${styleType}:`, parsedBlocks.length);
        } else {
          console.info(`Nenhum bloco da página de vendas encontrado para ${styleType}.`);
          // Adicionar blocos padrão quando não houver blocos salvos
          const defaultBlocks = createDefaultSalesPageBlocks();
          setBlocks(defaultBlocks);
          // Salvar os blocos padrão no localStorage
          localStorage.setItem(`${STORAGE_KEY_PREFIX}${styleType}`, JSON.stringify(defaultBlocks));
        }
        setIsInitialized(true);
      } catch (error) {
        console.error('Erro ao carregar blocos da página de vendas:', error);
        setBlocks([]);
        setIsInitialized(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBlocks();
  }, [styleType]);

  // Função para criar blocos padrão para uma página de vendas
  const createDefaultSalesPageBlocks = (): Block[] => {
    return [
      {
        id: generateId(),
        type: 'headline',
        content: {
          title: 'Descubra seu Estilo Pessoal',
          subtitle: 'A chave para uma imagem autêntica e impactante',
          style: {
            backgroundColor: '#ffffff',
            color: '#432818',
            paddingY: 16,
            paddingX: 16,
            borderRadius: 8
          }
        },
        order: 0
      },
      {
        id: generateId(),
        type: 'text',
        content: {
          text: 'Transforme sua imagem e destaque sua verdadeira personalidade com nossa consultoria personalizada.',
          style: {
            backgroundColor: '#F9F5F1',
            color: '#8F7A6A',
            paddingY: 16,
            paddingX: 16,
            borderRadius: 8
          }
        },
        order: 1
      },
      {
        id: generateId(),
        type: 'pricing',
        content: {
          title: 'Consultoria Completa de Estilo',
          price: 'R$ 997,00',
          regularPrice: 'R$ 1.497,00',
          ctaText: 'Quero Transformar Meu Estilo',
          style: {
            backgroundColor: '#F9F5F1',
            color: '#432818',
            paddingY: 24,
            paddingX: 16,
            borderRadius: 8
          }
        },
        order: 2
      }
    ];
  };

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
      console.info(`Blocos da página de vendas salvos para ${styleType}:`, blocks.length);
      return true;
    } catch (error) {
      console.error('Erro ao salvar página de vendas:', error);
      return false;
    }
  }, [blocks, styleType]);

  // Função para carregar um template
  const loadTemplate = useCallback((templateBlocks: Block[]) => {
    try {
      if (!Array.isArray(templateBlocks) || templateBlocks.length === 0) {
        console.warn("Template inválido ou vazio");
        toast({
          title: "Template inválido",
          description: "O template selecionado não contém blocos válidos.",
          variant: "destructive"
        });
        return false;
      }
      
      // Garantir que cada bloco tenha um ID único
      const updatedBlocks = templateBlocks.map((block, index) => ({
        ...block,
        id: block.id || generateId(),
        order: index
      }));
      
      setBlocks(updatedBlocks);
      
      toast({
        title: "Template carregado",
        description: `Template aplicado com ${updatedBlocks.length} blocos.`,
        duration: 3000,
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao carregar template:', error);
      toast({
        title: "Erro ao carregar template",
        description: "Não foi possível aplicar o template selecionado.",
        variant: "destructive"
      });
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
    isLoading,
    handleAddBlock,
    handleUpdateBlock,
    handleDeleteBlock,
    handleReorderBlocks,
    handleSave,
    loadTemplate
  };
};
