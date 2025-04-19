
import { generateId } from '../idGenerator';
import { Block } from '@/types/editor';

export function createStyleHeroBlock(styleType: string, order: number): Block {
  return {
    id: generateId(),
    type: 'style-hero',
    content: {
      title: 'VOCÊ DESCOBRIU SEU ESTILO',
      subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
      styleType,
      ctaText: 'Quero transformar meu estilo',
      ctaUrl: '#oferta'
    },
    order
  };
}

export function createStyleResultBlock(styleType: string, order: number): Block {
  return {
    id: generateId(),
    type: 'style-result',
    content: {
      description: 'Descrição do seu estilo',
      styleType
    },
    order
  };
}
