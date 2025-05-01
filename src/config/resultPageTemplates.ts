
import { BorderRadiusType, ResultPageConfig } from '@/types/resultPageConfig';

export const defaultResultTemplate: ResultPageConfig = {
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
  blocks: [],
  header: {
    content: {
      title: 'Seu Estilo Predominante',
      subtitle: 'Descubra mais sobre seu estilo único e como aproveitar ao máximo suas características'
    },
    style: {
      paddingY: '24',
      paddingX: '16',
      backgroundColor: '#FAF9F7',
      textColor: '#432818',
      borderRadius: 'none' as BorderRadiusType
    },
    visible: true
  },
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
        features: [
          'Análise detalhada do seu estilo pessoal',
          'Paleta de cores personalizada',
          'Guia de peças essenciais para o seu guarda-roupa',
          'Dicas de tecidos e modelagens ideais'
        ],
        ctaText: 'Adquirir meu Guia de Estilo',
        ctaLink: '#',
        price: 'R$ 97,00',
        discountPrice: 'R$ 67,00'
      },
      style: {
        padding: '24px',
        backgroundColor: '#FFF8F3',
        textColor: '#432818'
      },
      visible: true
    },
    products: {
      visible: true,
      content: {},
      style: {}
    },
    benefits: {
      visible: true,
      content: {},
      style: {}
    },
    pricing: {
      visible: true,
      content: {},
      style: {}
    },
    testimonials: {
      visible: true,
      content: {},
      style: {}
    },
    guarantee: {
      visible: true,
      content: {},
      style: {}
    }
  }
};
