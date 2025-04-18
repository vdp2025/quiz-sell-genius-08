
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: `Olá, seu Estilo Predominante é:`
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: getDefaultDescription(styleType)
      }
    },
    secondaryStyles: {
      visible: true,
      content: {}
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: "VOCÊ DESCOBRIU SEU ESTILO",
          subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
          price: "39,00",
          regularPrice: "175,00",
          ctaText: "Quero meu Guia + Bônus",
          ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
        }
      },
      products: {
        visible: true,
        content: {}
      },
      pricing: {
        visible: true,
        content: {}
      },
      benefits: {
        visible: true,
        content: {}
      },
      testimonials: {
        visible: true,
        content: {}
      },
      guarantee: {
        visible: true,
        content: {}
      }
    }
  };
};

// Descrições padrão baseadas no tipo de estilo
function getDefaultDescription(styleType: string): string {
  switch (styleType) {
    case 'Natural':
      return "Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.";
    case 'Clássico':
      return "Você aprecia roupas atemporais e elegantes. Seu estilo é refinado e tradicional, com peças de qualidade que nunca saem de moda.";
    case 'Contemporâneo':
      return "Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.";
    case 'Elegante':
      return "Você valoriza a sofisticação e o requinte. Seu estilo é polido e imponente, com peças de alta qualidade e acabamento impecável.";
    case 'Romântico':
      return "Você aprecia detalhes delicados e femininos. Seu estilo é suave e gracioso, com elementos como rendas, babados e estampas florais.";
    case 'Sexy':
      return "Você gosta de valorizar suas curvas. Seu estilo é sensual e marcante, com peças que destacam seu corpo e sua confiança.";
    case 'Dramático':
      return "Você busca impactar e chamar atenção. Seu estilo é arrojado e marcante, com peças estruturadas e de design diferenciado.";
    case 'Criativo':
      return "Você adora expressar sua individualidade. Seu estilo é único e original, combinando cores, texturas e elementos de forma não convencional.";
    default:
      return "Seu estilo pessoal reflete sua personalidade e preferências únicas.";
  }
}
