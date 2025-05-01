
import { Block, BlockType } from '@/types/editor';
import { v4 as uuidv4 } from 'uuid';
import { StyleOptions } from '@/types/resultPageConfig';

// Function to get default global styles
export const getDefaultGlobalStyles = (): Partial<StyleOptions> => {
  return {
    primaryColor: '#B89B7A',
    secondaryColor: '#8F7A6A',
    backgroundColor: '#FAF9F7',
    textColor: '#432818',
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    lineHeight: '1.5',
    spacing: 'comfortable',
    borderRadius: 'medium',
  };
};

// The function that generates default content for block types
export const getDefaultBlockContent = (type: BlockType, styleType: string = 'Elegante') => {
  const blockDefaults: Record<string, any> = {
    'headline': {
      title: `Descubra seu estilo ${styleType}`,
      subtitle: 'Transforme sua imagem pessoal',
      alignment: 'center',
      style: {
        backgroundColor: '#ffffff',
        textColor: '#432818',
        paddingY: '24',
        paddingX: '16',
        borderRadius: 'medium'
      }
    },
    'text': {
      text: `O estilo ${styleType} se caracteriza por linhas elegantes e sofisticadas. Pessoas com este estilo valorizam a qualidade e a atemporalidade das peças.`,
      style: {
        backgroundColor: '#F9F5F1',
        textColor: '#432818',
        paddingY: '16',
        paddingX: '16',
        borderRadius: 'medium'
      }
    },
    'image': {
      imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911692/logo-visagismo_zuilys.webp',
      altText: 'Imagem ilustrativa',
      caption: '',
      alignment: 'center',
      style: {
        backgroundColor: 'transparent',
        paddingY: '16',
        paddingX: '16',
        borderRadius: 'medium'
      }
    },
    'cta': {
      title: 'Aprimore seu estilo pessoal hoje mesmo!',
      buttonText: 'Saiba Mais',
      buttonUrl: '#',
      alignment: 'center',
      style: {
        backgroundColor: '#F9F5F1',
        buttonColor: '#B89B7A',
        textColor: '#432818',
        buttonTextColor: '#FFFFFF',
        paddingY: '24',
        paddingX: '16',
        borderRadius: 'medium'
      }
    },
    'testimonial': {
      name: 'Maria Silva',
      role: 'Empresária',
      testimonialText: 'A análise de estilo mudou completamente minha forma de me vestir. Agora me sinto muito mais confiante!',
      rating: 5,
      avatarUrl: '',
      style: {
        backgroundColor: '#FFFFFF',
        textColor: '#432818',
        accentColor: '#B89B7A',
        paddingY: '16',
        paddingX: '16',
        borderRadius: 'medium'
      }
    },
    'divider': {
      style: {
        color: '#B89B7A',
        width: '80%',
        thickness: '1',
        style: 'solid'
      }
    },
    'feature-comparison': {
      title: 'Compare nossos pacotes',
      features: [
        { name: 'Análise de Coloração Pessoal', included: true, premium: true },
        { name: 'Cartela de Cores Personalizada', included: true, premium: true },
        { name: 'Consultoria de Guarda-Roupa', included: false, premium: true }
      ],
      plans: [
        {
          title: 'Básico',
          price: 'R$ 297',
          description: 'Para quem está começando',
          isPopular: false,
          buttonText: 'Escolher plano',
          buttonUrl: '#'
        },
        {
          title: 'Premium',
          price: 'R$ 497',
          description: 'Consultoria completa',
          isPopular: true,
          buttonText: 'Melhor escolha',
          buttonUrl: '#'
        }
      ],
      style: {
        backgroundColor: '#FFFFFF',
        textColor: '#432818',
        accentColor: '#B89B7A',
        paddingY: '24',
        paddingX: '16',
        borderRadius: 'medium'
      }
    },
    'custom-code': {
      html: '<div style="text-align:center;"><p>Seu código HTML personalizado aqui</p></div>',
      css: '/* Seu CSS personalizado aqui */',
      style: {
        paddingY: '16',
        paddingX: '16',
        borderRadius: 'medium'
      }
    }
  };

  return blockDefaults[type as keyof typeof blockDefaults] || {};
};

// Function to create a new block with default content
export const createDefaultBlock = (type: BlockType, order: number = 0, styleType: string = 'Elegante'): Block => {
  return {
    id: uuidv4(),
    type,
    order,
    content: getDefaultBlockContent(type, styleType)
  };
};
