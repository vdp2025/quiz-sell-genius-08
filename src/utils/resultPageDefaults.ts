
import { v4 as uuidv4 } from 'uuid';
import { ResultPageConfig, BorderRadiusType } from '@/types/resultPageConfig';

// Helper function to create a default header config
export const createHeaderConfig = () => {
  return {
    content: {
      title: 'Seu Estilo Predominante',
      subtitle: 'Descubra mais sobre seu estilo único e como aproveitar ao máximo suas características'
    },
    style: {
      paddingY: '24',
      paddingX: '16',
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      borderRadius: 'medium' as BorderRadiusType
    },
    visible: true
  };
};

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  // Create a default configuration for a result page
  return {
    styleType: styleType,
    description: `Página de resultados para o estilo ${styleType}`,
    templateName: `Padrão ${styleType}`,
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
            borderRadius: 'medium' as BorderRadiusType
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
            borderRadius: 'medium' as BorderRadiusType
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
    mainContent: {
      content: {
        description: 'Aqui será exibida uma descrição detalhada do seu estilo predominante, com características, recomendações e dicas personalizadas.',
        mainImage: 'https://placehold.co/600x400?text=Estilo+Predominante',
        tabletImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
        showSecondaryStyles: true,
        showOffer: true
      },
      style: {
        padding: '20px',
        backgroundColor: '#FFFFFF',
        textColor: '#432818'
      },
      visible: true
    },
    offer: {
      hero: {
        content: {
          title: 'Guia de Estilo e Imagem Personalizado',
          description: 'Adquira seu guia completo com análise detalhada, paleta de cores personalizada e recomendações de peças específicas para o seu tipo de estilo.',
          ctaText: 'Adquirir meu Guia de Estilo',
          ctaLink: '#',
          price: 'R$ 97,00',
          discountPrice: 'R$ 67,00'
        },
        style: {
          padding: '24px',
          backgroundColor: '#FAF9F7',
          accentColor: '#B89B7A',
          textColor: '#432818'
        },
        visible: true
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};
