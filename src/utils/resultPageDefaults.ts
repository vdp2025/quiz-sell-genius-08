
import { ResultPageConfig } from '@/types/resultPageConfig';
import { getDefaultGlobalStyles } from './editorDefaults';
import { createHeaderConfig } from './config/headerDefaults';
import { createOfferConfig } from './config/offerDefaults';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  const now = new Date().toISOString();
  
  return {
    title: `Resultado ${styleType}`,
    description: `Página de resultados para o estilo ${styleType}`,
    styleType: styleType,
    globalStyles: getDefaultGlobalStyles(),
    createdAt: now,
    updatedAt: now,
    blocks: [],
    header: createHeaderConfig(),
    mainContent: {
      visible: true,
      content: {
        description: getStyleDescription(styleType),
        customImage: getStyleImage(styleType)
      },
      style: {
        textAlign: 'left',
        padding: '16',
        borderRadius: 'medium'
      }
    },
    offer: createOfferConfig()
  };
};

// Helper function to get style description based on style type
const getStyleDescription = (styleType: string): string => {
  switch(styleType) {
    case 'Elegante':
      return 'O estilo Elegante representa sofisticação e refinamento. Você valoriza peças de qualidade, linhas limpas e uma aparência sempre polida. Sua imagem transmite autoridade discreta e bom gosto.';
    case 'Natural':
      return 'O estilo Natural prioriza o conforto e a praticidade. Você valoriza roupas simples, tecidos naturais e uma aparência autêntica, sem excessos. Sua imagem transmite acessibilidade e descontração.';
    case 'Clássico':
      return 'O estilo Clássico valoriza a tradição e atemporalidade. Você aprecia peças duráveis, bem estruturadas e que nunca saem de moda. Sua imagem transmite confiabilidade e sobriedade.';
    case 'Contemporâneo':
      return 'O estilo Contemporâneo é moderno e atualizado. Você aprecia tendências atuais sem excessos, com um visual clean e funcional. Sua imagem transmite dinamismo e atualidade.';
    case 'Romântico':
      return 'O estilo Romântico destaca a delicadeza e feminilidade. Você aprecia detalhes como babados, laços e estampas florais. Sua imagem transmite suavidade e acolhimento.';
    case 'Sexy':
      return 'O estilo Sexy valoriza a sensualidade e o poder de atração. Você aprecia peças que destacam suas curvas e silhueta. Sua imagem transmite confiança e magnetismo.';
    case 'Dramático':
      return 'O estilo Dramático tem impacto visual intenso. Você aprecia peças marcantes, contrastantes e fora do comum. Sua imagem transmite ousadia e originalidade.';
    case 'Criativo':
      return 'O estilo Criativo é expressivo e pessoal. Você aprecia combinações inusitadas, cores, texturas e acessórios diferenciados. Sua imagem transmite inovação e autenticidade.';
    default:
      return 'Seu estilo é único e reflete sua personalidade. Este é o ponto de partida para construir um guarda-roupa que realmente combina com você.';
  }
};

// Helper function to get style image based on style type
const getStyleImage = (styleType: string): string => {
  const defaultImage = 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911641/moodboard-estilo_yta8n7.webp';
  
  // You can add specific images for each style if needed
  const styleImages: Record<string, string> = {
    'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911641/moodboard-elegante_onefxp.webp',
    'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911643/moodboard-natural_izttwo.webp',
    'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911644/moodboard-romantico_mhm3tx.webp',
    'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911650/moodboard-sexy_tpnazz.webp'
  };
  
  return styleImages[styleType] || defaultImage;
};
