
import React, { useState, useEffect } from 'react';
import { EnhancedEditorLayout } from './EnhancedEditorLayout';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';
import { generateId } from '@/utils/idGenerator';
import { getDefaultContentForType } from '@/utils/editorDefaults';

const EnhancedQuizBuilder: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('sm'); // Mobile-first default
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult>({
    category: 'Elegante',
    score: 12,
    percentage: 40
  });
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with some blocks if needed
  useEffect(() => {
    setIsLoading(true);
    // Check if we have saved blocks in localStorage
    const savedBlocks = localStorage.getItem('quiz_editor_blocks');
    if (savedBlocks) {
      try {
        const parsedBlocks = JSON.parse(savedBlocks);
        setBlocks(parsedBlocks);
      } catch (error) {
        console.error('Error parsing saved blocks:', error);
      }
    } else {
      // Add some default blocks for new users
      setBlocks([
        {
          id: generateId(),
          type: 'headline',
          order: 0,
          content: {
            title: 'Descubra Seu Estilo Único',
            subtitle: 'Responda o questionário e obtenha uma análise personalizada',
            style: {
              textAlign: 'center',
              padding: '2rem'
            }
          }
        },
        {
          id: generateId(),
          type: 'image',
          order: 1,
          content: {
            imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
            imageAlt: 'Quiz de Estilo',
            caption: 'Descubra seu estilo único',
            style: {
              padding: '1rem'
            }
          }
        },
        {
          id: generateId(),
          type: 'text',
          order: 2,
          content: {
            text: 'Este quiz exclusivo foi desenvolvido para ajudar você a descobrir seu estilo pessoal único. Baseado em anos de pesquisa e expertise em moda, nosso sistema analisa suas preferências para revelar o estilo que melhor expressa quem você é.',
            style: {
              padding: '1rem',
              textAlign: 'center'
            }
          }
        }
      ]);
    }
    
    // Load primary style from localStorage
    const savedResult = localStorage.getItem('quiz_result');
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult?.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
        }
      } catch (error) {
        console.error('Error parsing saved quiz result:', error);
      }
    }
    
    setIsLoading(false);
  }, []);

  // Auto-save blocks when they change
  useEffect(() => {
    if (blocks.length > 0) {
      localStorage.setItem('quiz_editor_blocks', JSON.stringify(blocks));
    }
  }, [blocks]);

  const handleAddBlock = (type: Block['type']) => {
    const newBlock: Block = {
      id: generateId(),
      type,
      order: blocks.length,
      content: getDefaultContentForType(type)
    };

    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    
    toast({
      title: "Componente adicionado",
      description: `${type} foi adicionado ao editor.`,
    });

    return newBlock.id;
  };

  const handleUpdateBlock = (id: string, content: any) => {
    setBlocks(prevBlocks => 
      prevBlocks.map(block => 
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks(prevBlocks => {
      const filteredBlocks = prevBlocks
        .filter(block => block.id !== id)
        .map((block, index) => ({ ...block, order: index }));
      return filteredBlocks;
    });
    
    setSelectedBlockId(null);
    
    toast({
      title: "Componente excluído",
      description: "O componente foi removido com sucesso.",
    });
  };

  const handleReorderBlocks = (sourceIndex: number, destinationIndex: number) => {
    setBlocks(prevBlocks => {
      const newBlocks = Array.from(prevBlocks);
      const [removed] = newBlocks.splice(sourceIndex, 1);
      newBlocks.splice(destinationIndex, 0, removed);
      
      return newBlocks.map((block, index) => ({
        ...block,
        order: index
      }));
    });
  };

  const handleSave = () => {
    localStorage.setItem('quiz_editor_blocks', JSON.stringify(blocks));
    
    toast({
      title: "Alterações salvas",
      description: "Todas as alterações foram salvas com sucesso.",
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <p className="text-[#8F7A6A] mb-2">Carregando editor...</p>
          <div className="w-10 h-10 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <EnhancedEditorLayout
      blocks={blocks}
      selectedBlockId={selectedBlockId}
      isPreviewing={isPreviewing}
      primaryStyle={primaryStyle}
      viewportSize={viewportSize}
      onViewportSizeChange={setViewportSize}
      onSelectBlock={setSelectedBlockId}
      onAddBlock={handleAddBlock}
      onUpdateBlock={handleUpdateBlock}
      onDeleteBlock={handleDeleteBlock}
      onReorderBlocks={handleReorderBlocks}
      onTogglePreview={() => setIsPreviewing(!isPreviewing)}
      onSave={handleSave}
    />
  );
};

export default EnhancedQuizBuilder;
