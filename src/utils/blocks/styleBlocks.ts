
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
      ctaUrl: '#oferta',
      style: {
        backgroundColor: "#fff7f3",
        padding: "2rem",
        borderRadius: "1rem"
      }
    },
    order
  };
}

export function createStyleResultBlock(styleType: string, order: number): Block {
  return {
    id: generateId(),
    type: 'style-result',
    content: {
      description: `Seu estilo ${styleType} reflete sua personalidade única. Aprenda a expressar isso através das suas escolhas de moda.`,
      styleType,
      style: {
        backgroundColor: "#ffffff",
        padding: "2rem",
        borderRadius: "1rem",
        margin: "2rem 0 0 0"
      }
    },
    order
  };
}
