
import { ResultPageConfig } from '@/types/resultPageConfig';
import { Block, BlockType } from '@/types/editor';
import { getDefaultGlobalStyles, getDefaultContentForType } from './editorDefaults';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  // Generate some starter blocks based on the style type
  const blocks: Block[] = [
    {
      id: `header-${Date.now()}`,
      type: 'header',
      order: 0,
      content: {
        title: `Seu Resultado: Estilo ${styleType}`,
        subtitle: 'Descubra como expressar sua personalidade através da moda',
        style: {
          backgroundColor: '#FFFFFF',
          padding: 24,
          textAlign: 'center'
        }
      }
    },
    {
      id: `style-result-${Date.now()}`,
      type: 'style-result',
      order: 1,
      content: {
        description: `O estilo ${styleType} é caracterizado por peças que expressam sua personalidade única. Aqui você encontrará recomendações personalizadas para seu guarda-roupa.`,
        style: {
          backgroundColor: '#FAF9F7',
          padding: 32,
          borderRadius: 8
        }
      }
    },
    {
      id: `text-${Date.now()}`,
      type: 'text',
      order: 2,
      content: {
        text: 'Agora que você conhece seu estilo predominante, conheça as peças essenciais que não podem faltar no seu guarda-roupa e como combiná-las para criar looks incríveis que expressam quem você é.',
        style: {
          padding: 24,
        }
      }
    }
  ];

  return {
    title: `Resultado do Quiz - Estilo ${styleType}`,
    description: `Página de resultados para o estilo ${styleType}`,
    blocks: blocks,
    globalStyles: getDefaultGlobalStyles(),
    styleType: styleType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const getDefaultBlocks = (styleType: string): Block[] => {
  return [
    {
      id: `headline-${Date.now()}`,
      type: 'headline',
      order: 0,
      content: getDefaultContentForType('headline')
    },
    {
      id: `text-${Date.now()}`,
      type: 'text',
      order: 1,
      content: getDefaultContentForType('text')
    }
  ];
};

export const createEmptyBlock = (type: BlockType, order: number): Block => {
  return {
    id: `block-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type,
    order,
    content: getDefaultContentForType(type)
  };
};
