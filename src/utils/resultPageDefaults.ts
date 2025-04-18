
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: `Olá, seu Estilo Predominante é:`,
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
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem'
      }
    },
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        padding: '1.5rem',
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        marginTop: '1.5rem'
      }
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
        },
        style: {
          backgroundColor: '#fffaf7',
          padding: '2rem',
          borderRadius: '0.5rem',
          marginTop: '2rem'
        }
      },
      products: {
        visible: true,
        content: {
          title: "O que você vai receber:"
        },
        style: {
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          marginTop: '1.5rem'
        }
      },
      pricing: {
        visible: true,
        content: {
          price: "39,00",
          regularPrice: "175,00",
          ctaText: "Quero meu Guia + Bônus",
          ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
          urgencyText: "Oferta por tempo limitado!"
        },
        style: {
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          marginTop: '1.5rem'
        }
      },
      benefits: {
        visible: true,
        content: {
          title: "Benefícios",
          items: [
            "Descubra seu estilo com precisão",
            "Aprenda a criar looks autênticos",
            "Economize tempo e dinheiro",
            "Ganhe confiança na sua imagem"
          ]
        },
        style: {
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          marginTop: '1.5rem'
        }
      },
      testimonials: {
        visible: true,
        content: {
          title: "O que estão dizendo"
        },
        style: {
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          marginTop: '1.5rem'
        }
      },
      guarantee: {
        visible: true,
        content: {
          title: "Garantia de 7 dias",
          text: "Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia."
        },
        style: {
          padding: '1.5rem',
          backgroundColor: '#ffffff',
          borderRadius: '0.5rem',
          marginTop: '1.5rem'
        }
      }
    },
    globalStyles: {
      primaryColor: '#aa6b5d',
      secondaryColor: '#432818',
      textColor: '#1A1818',
      backgroundColor: '#fffaf7',
      fontFamily: "'Playfair Display', serif"
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
