
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: `Seu estilo é ${styleType}!`,
        subtitle: 'Descubra como aplicar seu estilo em todas as ocasiões'
      },
      style: {
        backgroundColor: '#FAF9F7',
        color: '#432818',
        borderRadius: '0'
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: `O estilo ${styleType} é caracterizado por suas qualidades únicas e marcantes. Aproveite ao máximo este estilo em seu dia a dia.`,
        mainImage: `https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp`,
        tabletImage: `https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp`,
        showSecondaryStyles: true,
        showOffer: true
      },
      style: {
        backgroundColor: '#FFFFFF',
        color: '#432818',
        padding: '20px'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: `Guia de Estilo ${styleType}`,
          subtitle: 'Transforme seu guarda-roupa com nossas dicas personalizadas',
          price: '39,00',
          regularPrice: '175,00',
          ctaText: 'Quero meu guia personalizado',
          ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10',
          heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
          heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
        },
        style: {
          backgroundColor: '#FAF9F7',
          color: '#432818'
        }
      },
      benefits: {
        visible: true,
        content: {
          title: 'O que você vai receber:',
          items: [
            'Análise detalhada do seu estilo pessoal',
            'Paleta de cores personalizada',
            'Guia de peças essenciais para o seu guarda-roupa',
            'Dicas de tecidos e modelagens ideais'
          ]
        },
        style: {
          backgroundColor: '#FFFFFF',
          color: '#432818'
        }
      },
      pricing: {
        visible: true,
        content: {},
        style: {
          backgroundColor: '#FFFFFF',
          color: '#432818'
        }
      },
      products: {
        visible: true,
        content: {},
        style: {
          backgroundColor: '#F9F6F2',
          color: '#432818'
        }
      },
      testimonials: {
        visible: true,
        content: {
          testimonials: [
            {
              name: "Mariana Silva",
              text: "O guia de estilo mudou completamente minha relação com as roupas. Agora eu sei exatamente o que combina comigo!",
              role: "Estilo Natural"
            },
            {
              name: "Juliana Mendes",
              text: "Sempre tive dificuldade para me vestir, mas depois de descobrir meu estilo predominante, recebo elogios todos os dias.",
              role: "Estilo Elegante"
            }
          ]
        },
        style: {
          backgroundColor: '#FFFFFF',
          color: '#432818'
        }
      },
      guarantee: {
        visible: true,
        content: {
          days: 7,
          text: 'Se você não ficar completamente satisfeita com o seu Guia de Estilo Personalizado, basta solicitar o reembolso em até 7 dias após a compra. Sem perguntas, sem complicações. Sua satisfação é nossa prioridade!'
        },
        style: {
          backgroundColor: '#F9F6F2',
          color: '#432818'
        }
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#aa6b5d',
      textColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }
  };
};

export const getStyleDescription = (styleType: string): string => {
  const descriptions: Record<string, string> = {
    'Natural': 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.',
    'Clássico': 'Você aprecia roupas atemporais e elegantes. Seu estilo é refinado e tradicional, com peças de qualidade que nunca saem de moda.',
    'Contemporâneo': 'Você gosta de estar atualizado e seguir as tendências. Seu estilo é moderno e versátil, combinando o clássico com o atual.',
    'Elegante': 'Você valoriza a sofisticação e o requinte. Seu estilo é polido e imponente, com peças de alta qualidade e acabamento impecável.',
    'Romântico': 'Você aprecia detalhes delicados e femininos. Seu estilo é suave e gracioso, com elementos como rendas, babados e estampas florais.',
    'Sexy': 'Você gosta de valorizar suas curvas. Seu estilo é sensual e marcante, com peças que destacam seu corpo e sua confiança.',
    'Dramático': 'Você busca impactar e chamar atenção. Seu estilo é arrojado e marcante, com peças estruturadas e de design diferenciado.',
    'Criativo': 'Você adora expressar sua individualidade. Seu estilo é único e original, combinando cores, texturas e elementos de forma não convencional.'
  };
  
  return descriptions[styleType] || 'Seu estilo pessoal reflete sua personalidade e preferências únicas.';
};
