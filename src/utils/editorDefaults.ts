
import { StyleOptions } from '@/types/resultPageConfig';
import { EditableContent, BlockType } from '@/types/editor';

export const getDefaultGlobalStyles = (): Partial<StyleOptions> => {
  return {
    primaryColor: '#B89B7A',
    secondaryColor: '#8F7A6A',
    textColor: '#432818',
    backgroundColor: '#FAF9F7',
    fontFamily: 'sans-serif',
    spacing: 'comfortable',
    borderRadius: 'medium',
  };
};

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição complementar',
        style: {
          textAlign: 'center',
          paddingTop: 32,
          paddingBottom: 16,
        }
      };
    case 'text':
      return {
        text: 'Insira seu texto aqui. Este é um parágrafo de exemplo que pode ser editado conforme sua necessidade. Você pode adicionar mais informações e formatar o texto de acordo com seu estilo.',
        style: {
          paddingTop: 16,
          paddingBottom: 16,
        }
      };
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem',
        caption: '',
        style: {
          maxWidth: '100%',
          borderRadius: 8,
        }
      };
    case 'button':
      return {
        ctaText: 'Clique Aqui',
        ctaUrl: '#',
        style: {
          backgroundColor: '#B89B7A',
          color: '#FFFFFF',
          borderRadius: 8,
          paddingX: 24,
          paddingY: 12,
          textAlign: 'center',
        }
      };
    case 'testimonial-card':
      return {
        name: 'Maria Silva',
        role: 'Cliente desde 2022',
        testimonialText: 'Este guia de estilo mudou completamente a forma como me visto. Agora tenho confiança para escolher roupas que realmente combinam com minha personalidade.',
        rating: 5,
        avatarUrl: '',
        style: {
          backgroundColor: '#FFFFFF',
          borderRadius: 8,
          padding: 16,
        }
      };
    case 'benefits':
      return {
        title: 'Principais Benefícios',
        benefits: [
          'Benefício 1: Descrição do primeiro benefício',
          'Benefício 2: Descrição do segundo benefício',
          'Benefício 3: Descrição do terceiro benefício'
        ],
        style: {
          backgroundColor: '#FAF9F7',
          padding: 24,
          borderRadius: 8,
        }
      };
    default:
      return {};
  }
};

export const getDefaultTypeStyles = (type: BlockType): Partial<StyleOptions> => {
  switch (type) {
    case 'headline':
      return { 
        textAlign: 'center',
        fontFamily: 'serif',
        fontSize: 'large',
        fontWeight: 'bold'
      };
    case 'text':
      return { 
        textAlign: 'left',
        fontFamily: 'sans-serif',
        fontSize: 'medium',
        lineHeight: 'relaxed'
      };
    case 'button':
      return {
        textAlign: 'center',
        backgroundColor: '#B89B7A',
        color: '#FFFFFF',
        borderRadius: 'rounded'
      };
    default:
      return {};
  }
};
