
import { ResultPageConfig, Section, OfferSection } from '@/types/resultPageConfig';

export const createDefaultSection = (): Section => ({
  visible: true,
  content: {},
  style: {
    backgroundColor: '#FFFFFF',
    textColor: '#432818',
    paddingY: 16,
    paddingX: 16
  }
});

export const createDefaultOfferSection = (): OfferSection => ({
  hero: {
    visible: true,
    content: {
      title: 'Seu estilo foi revelado. Agora é hora da transformação.',
      subtitle: 'Descubra como aplicar seu estilo em todas as áreas da sua vida.'
    },
    style: {
      backgroundColor: '#F7F4EF',
      textColor: '#432818',
      paddingY: 24,
      paddingX: 16
    }
  },
  pricing: {
    visible: true,
    content: {
      price: '39,00',
      regularPrice: '175,00',
      ctaText: 'Quero meu Guia + Bônus',
      ctaUrl: 'https://pay.hotmart.com/'
    },
    style: {}
  }
});

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    title: `Seu Estilo ${styleType}`,
    subtitle: 'Descubra como aplicar seu estilo em todas as áreas da sua vida',
    resultTitle: `Resultado: Estilo ${styleType}`,
    showPercentages: true,
    showDescriptions: true,
    callToAction: 'Ver Recomendações',
    accentColor: '#B89B7A',
    backgroundColor: '#F7F4EF',
    textColor: '#432818',
    styleType: styleType,
    
    globalStyles: {
      backgroundColor: '#F7F4EF',
      textColor: '#432818',
      primaryColor: '#B89B7A',
      secondaryColor: '#AA6B5D',
      fontFamily: 'system-ui, sans-serif',
      borderRadiusType: 'md'
    },
    
    blocks: [],
    
    header: {
      visible: true,
      content: {
        title: `Seu Estilo ${styleType}`
      },
      style: {}
    },
    
    mainContent: {
      visible: true,
      content: {
        description: `O estilo ${styleType} é caracterizado por...`
      },
      style: {}
    },
    
    secondaryStyles: {
      visible: true,
      content: {},
      style: {}
    },
    
    offer: createDefaultOfferSection()
  };
};
