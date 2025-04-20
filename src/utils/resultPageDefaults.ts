
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: `Olá, seu estilo predominante é:`,
        subtitle: ''
      },
      style: {
        textAlign: 'center',
        margin: '0 0 2rem 0'
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: getDefaultDescription(styleType)
      },
      style: {
        padding: '20px'
      }
    },
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        padding: '20px'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: 'Você descobriu seu estilo',
          subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
          price: '39,00',
          regularPrice: '175,00',
          ctaText: 'Quero meu guia + bônus',
          ctaUrl: 'https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912'
        },
        style: {
          backgroundColor: '#fffaf7',
          padding: '40px 20px',
          borderRadius: '8px'
        }
      },
      products: {
        visible: true,
        content: {
          title: 'O que você vai receber:'
        },
        style: {
          padding: '20px'
        }
      },
      pricing: {
        visible: true,
        content: {
          price: '39,00',
          regularPrice: '175,00',
          ctaText: 'Quero meu guia + bônus',
          ctaUrl: 'https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912',
          urgencyText: 'Oferta por tempo limitado!'
        },
        style: {
          padding: '20px'
        }
      },
      benefits: {
        visible: true,
        content: {
          title: 'Benefícios',
          items: [
            'Descubra seu estilo com precisão',
            'Aprenda a criar looks autênticos',
            'Economize tempo e dinheiro',
            'Ganhe confiança na sua imagem'
          ]
        },
        style: {
          padding: '20px'
        }
      },
      testimonials: {
        visible: true,
        content: {
          title: 'O que estão dizendo'
        },
        style: {
          padding: '20px'
        }
      },
      guarantee: {
        visible: true,
        content: {
          title: 'Garantia de 7 dias',
          text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.'
        },
        style: {
          padding: '20px'
        }
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#1A1818',
      backgroundColor: '#fffaf7',
      fontFamily: 'Playfair Display'
    },
    blocks: []
  };
};

function getDefaultDescription(styleType: string): string {
  switch (styleType) {
    case 'Natural':
      return 'Você valoriza o conforto e a praticidade. seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.';
    case 'Clássico':
      return 'Você valoriza o equilíbrio e a tradição. Seu estilo é elegante e atemporal, com peças que não saem de moda.';
    case 'Contemporâneo':
      return 'Você valoriza o equilíbrio entre moda e praticidade. Seu estilo é atual e adaptativo, com peças que transitam bem entre várias ocasiões.';
    case 'Elegante':
      return 'Você valoriza a sofisticação e o requinte. Seu estilo é refinado e imponente, com peças que exalam qualidade e status.';
    case 'Romântico':
      return 'Você valoriza a delicadeza e a feminilidade. Seu estilo é suave e gracioso, com peças que transmitem leveza e romantismo.';
    case 'Sexy':
      return 'Você valoriza a sensualidade e a expressão corporal. Seu estilo é provocante e ousado, com peças que destacam suas curvas.';
    case 'Dramático':
      return 'Você valoriza o impacto visual e a originalidade. Seu estilo é marcante e poderoso, com peças estruturadas e de design diferenciado.';
    case 'Criativo':
      return 'Você valoriza a expressão artística e a liberdade. Seu estilo é único e eclético, com peças que refletem sua personalidade multifacetada.';
    default:
      return 'Seu estilo pessoal reflete sua personalidade autêntica e única.';
  }
}
