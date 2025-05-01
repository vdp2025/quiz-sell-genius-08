
import { v4 as uuidv4 } from 'uuid';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { createHeaderConfig } from './config/headerDefaults';
import { getDefaultContentForBlockType } from './blockDefaults';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  // Create a default configuration for a result page
  return {
    title: `Resultado ${styleType}`,
    description: `Página de resultados para o estilo ${styleType}`,
    styleType: styleType,
    blocks: [
      {
        id: uuidv4(),
        type: 'headline',
        content: {
          title: `Seu estilo predominante: ${styleType}`,
          subtitle: 'Descubra como aproveitar ao máximo seu estilo natural',
          alignment: 'center',
          style: {
            backgroundColor: '#FFFFFF',
            textColor: '#432818',
            paddingY: '16',
            paddingX: '16',
            borderRadius: 'medium'
          }
        },
        order: 0
      },
      {
        id: uuidv4(),
        type: 'text',
        content: {
          text: `O estilo ${styleType} se caracteriza por uma abordagem única à moda e expressão pessoal. Pessoas com este estilo têm uma presença marcante e sabem como expressar sua personalidade através das roupas.`,
          style: {
            backgroundColor: '#F9F5F1',
            textColor: '#432818',
            paddingY: '16',
            paddingX: '16',
            borderRadius: 'medium'
          }
        },
        order: 1
      }
    ],
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#8F7A6A',
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      fontFamily: 'Inter, sans-serif',
      fontSize: '16px',
      lineHeight: '1.5',
      spacing: 'comfortable',
      borderRadius: 'medium',
    },
    header: createHeaderConfig(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
