
import { useState, useEffect } from 'react';
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
    // Tenta carregar a configuração salva do localStorage
    const savedConfig = localStorage.getItem('editorConfig');
    if (savedConfig) {
      try {
        return JSON.parse(savedConfig);
      } catch (e) {
        console.error('Erro ao carregar configuração do editor:', e);
        return defaultConfig;
      }
    }
    return defaultConfig;
  });

  // Salva a configuração no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('editorConfig', JSON.stringify(config));
  }, [config]);

  const addBlock = (type: EditorBlock['type']) => {
    const blocksLength = config.blocks.length;
    let initialContent: EditableContent = {};
    
    // Define conteúdo inicial baseado no tipo
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
          title: 'Preço Especial',
          text: 'Aproveite nossa oferta exclusiva',
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
          text: 'Clique no botão abaixo para começar',
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
  };

  const updateBlock = (id: string, content: Partial<EditableContent>) => {
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
      blocks: config.blocks
        .filter(block => block.id !== id)
        .map((block, index) => ({
          ...block,
          order: index
        }))
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

  const updateTheme = (theme: Partial<EditorConfig['theme']>) => {
    setConfig({
      ...config,
      theme: {
        ...config.theme,
        ...theme
      }
    });
  };

  const clearEditor = () => {
    setConfig(defaultConfig);
  };

  const saveAsTemplate = (name: string) => {
    const templates = JSON.parse(localStorage.getItem('editorTemplates') || '{}');
    templates[name] = config;
    localStorage.setItem('editorTemplates', JSON.stringify(templates));
  };

  const loadTemplate = (name: string) => {
    const templates = JSON.parse(localStorage.getItem('editorTemplates') || '{}');
    if (templates[name]) {
      setConfig(templates[name]);
      return true;
    }
    return false;
  };

  return {
    config,
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
