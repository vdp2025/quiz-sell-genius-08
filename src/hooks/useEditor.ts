
import { useState, useEffect, useCallback } from 'react';
import { EditorBlock, EditorConfig, EditableContent } from '@/types/editor';

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

const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

export const useEditor = () => {
  const [config, setConfig] = useState<EditorConfig>(() => {
    // Try to load the saved configuration from localStorage
    const savedConfig = localStorage.getItem('editorConfig');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Error loading editor configuration:', e);
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  // Save the configuration to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('editorConfig', JSON.stringify(config));
  }, [config]);

  // Update the entire configuration
  const updateConfig = useCallback((newConfig: EditorConfig) => {
    setConfig(newConfig);
  }, []);

  // Add a new block to the editor
  const addBlock = useCallback((type: EditorBlock['type']) => {
    const blocksLength = config.blocks.length;
    let initialContent: EditableContent = {};
    
    // Define initial content based on type
    switch (type) {
      case 'headline':
        initialContent = {
          title: 'Título Principal',
          subtitle: 'Adicione um subtítulo aqui',
          textColor: '#432818',
          alignment: 'center'
        };
        break;
      case 'image':
        initialContent = {
          imageUrl: '',
          imageAlt: 'Descrição da imagem',
        };
        break;
      case 'benefits':
        initialContent = {
          title: 'Benefícios',
          items: ['Benefício 1', 'Benefício 2', 'Benefício 3'],
        };
        break;
      case 'testimonials':
        initialContent = {
          title: 'O que nossos clientes dizem',
        };
        break;
      case 'text':
        initialContent = {
          text: 'Adicione seu texto aqui',
          textColor: '#432818',
        };
        break;
      case 'pricing':
        initialContent = {
          regularPrice: '175,00',
          salePrice: '39,00',
          buttonText: 'Quero Comprar Agora',
          checkoutUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
        };
        break;
      case 'guarantee':
        initialContent = {
          title: 'Garantia',
          text: 'Satisfação garantida ou seu dinheiro de volta',
        };
        break;
      case 'cta':
        initialContent = {
          title: 'Comece Agora',
          buttonText: 'Clique aqui',
          url: '#'
        };
        break;
      default:
        initialContent = {
          text: 'Adicione seu conteúdo aqui',
        };
    }
    
    const newBlock: EditorBlock = {
      id: generateId(),
      type,
      content: initialContent,
      order: blocksLength
    };
    
    setConfig({
      ...config,
      blocks: [...config.blocks, newBlock]
    });

    return newBlock.id;
  }, [config]);

  // Update a specific block
  const updateBlock = useCallback((id: string, content: Partial<EditableContent>) => {
    setConfig({
      ...config,
      blocks: config.blocks.map(block =>
        block.id === id
          ? { ...block, content: { ...block.content, ...content } }
          : block
      )
    });
  }, [config]);

  // Delete a block
  const deleteBlock = useCallback((id: string) => {
    setConfig({
      ...config,
      blocks: config.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({
          ...block,
          order: index
        }))
    });
  }, [config]);

  // Reorder blocks
  const reorderBlocks = useCallback((startIndex: number, endIndex: number) => {
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
  }, [config]);

  // Update theme settings
  const updateTheme = useCallback((theme: Partial<EditorConfig['theme']>) => {
    setConfig({
      ...config,
      theme: {
        ...config.theme,
        ...theme
      }
    });
  }, [config]);

  // Reset the editor to default state
  const clearEditor = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  // Save current configuration as a template
  const saveAsTemplate = useCallback((name: string) => {
    const templates = JSON.parse(localStorage.getItem('editorTemplates') || '{}');
    templates[name] = config;
    localStorage.setItem('editorTemplates', JSON.stringify(templates));
  }, [config]);

  // Load a saved template
  const loadTemplate = useCallback((name: string) => {
    const templates = JSON.parse(localStorage.getItem('editorTemplates') || '{}');
    if (templates[name]) {
      setConfig(templates[name]);
      return true;
    }
    return false;
  }, []);

  return {
    config,
    updateConfig,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    updateTheme,
    clearEditor,
    saveAsTemplate,
    loadTemplate
  };
};
