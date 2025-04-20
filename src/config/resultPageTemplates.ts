
import { ResultPageConfig } from '@/types/resultPageConfig';

export const naturalStyleTemplate: ResultPageConfig = {
  styleType: 'Natural',
  header: {
    visible: true,
    content: {
      title: 'Seu Estilo Natural',
      subtitle: 'Descubra como aproveitar ao máximo seu estilo único'
    },
    style: {
      backgroundColor: '#f7f4f0',
      textColor: '#3a3a3a',
      padding: '40px 20px',
      textAlign: 'center'
    }
  },
  mainContent: {
    visible: true,
    content: {
      introText: 'O estilo Natural é caracterizado pelo conforto, praticidade e simplicidade.',
      benefits: [
        'Valoriza o conforto e a funcionalidade',
        'Prefere tecidos naturais e fáceis de cuidar',
        'Aprecia uma estética minimalista e descomplicada'
      ],
      tabletImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
      styleImages: {
        'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735426/47_bi6vgf.webp',
        'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/48_ymo1ur.webp',
        'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/49_apcrwa.webp',
        'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/50_qexxxo.webp',
        'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/51_xbgntp.webp',
        'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/52_edlp0e.webp',
        'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/53_bfdp6f.webp',
        'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735430/54_xnilkc.webp'
      }
    },
    style: {
      backgroundColor: '#ffffff',
      textColor: '#333333',
      padding: '40px 20px',
      textAlign: 'left'
    }
  },
  secondaryStyles: {
    visible: true,
    content: {
      title: 'Estilos Complementares',
      description: 'Estes estilos complementam seu estilo Natural'
    },
    style: {
      backgroundColor: '#f7f4f0',
      textColor: '#333333',
      padding: '40px 20px',
      textAlign: 'center'
    }
  },
  offer: {
    hero: {
      visible: true,
      content: {
        title: 'DESCUBRA SEU ESTILO NATURAL',
        subtitle: 'Aproveite ao máximo seu estilo com nosso guia personalizado',
        description: 'Um guia completo para entender e valorizar seu estilo Natural em todas as ocasiões',
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
        heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
      },
      style: {
        backgroundColor: '#f0e6dd',
        textColor: '#4a3828',
        padding: '60px 20px',
        textAlign: 'center'
      }
    },
    products: {
      visible: true,
      content: {
        bonusItems: [
          {
            title: 'Guia de Cores Natural',
            description: 'As cores que melhor combinam com seu estilo',
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp'
          },
          {
            title: 'Guia de Peças-Chave',
            description: 'As peças essenciais para seu guarda-roupa',
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp'
          }
        ],
        allProductsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp'
      },
      style: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '40px 20px',
        textAlign: 'center'
      }
    },
    testimonials: {
      visible: true,
      content: {
        testimonials: [
          {
            text: 'Este guia transformou minha relação com a moda. Agora sei exatamente o que funciona para mim!',
            name: 'Maria Silva',
            role: 'Professora'
          },
          {
            text: 'Economizei tempo e dinheiro depois de entender meu estilo Natural. Recomendo!',
            name: 'Ana Costa',
            role: 'Empresária'
          }
        ],
        testimonialsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
      },
      style: {
        backgroundColor: '#f7f4f0',
        textColor: '#333333',
        padding: '40px 20px',
        textAlign: 'center'
      }
    },
    benefits: {
      visible: true,
      content: {
        title: 'Benefícios do Guia Natural',
        text: 'Transforme sua imagem pessoal e aproveite ao máximo seu estilo natural',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp'
      },
      style: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '40px 20px',
        textAlign: 'left'
      }
    },
    pricing: {
      visible: true,
      content: {
        regularPrice: '175,00',
        salePrice: '39,00',
        ctaText: 'Quero meu Guia + Bônus',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        urgencyText: 'Promoção por tempo limitado!'
      },
      style: {
        backgroundColor: '#f0e6dd',
        textColor: '#4a3828',
        padding: '40px 20px',
        textAlign: 'center'
      }
    },
    guarantee: {
      visible: true,
      content: {
        title: 'Garantia de Satisfação',
        text: 'Se você não ficar satisfeita com seu guia de estilo, devolvemos seu dinheiro em até 7 dias.',
        days: 7
      },
      style: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '40px 20px',
        textAlign: 'center'
      }
    }
  },
  blocks: [],
  globalStyles: {
    fontFamily: 'system-ui, sans-serif',
    primaryColor: '#B89B7A',
    secondaryColor: '#4A3828',
    backgroundColor: '#FAF9F7',
    textColor: '#333333',
    headingColor: '#432818'
  }
};

export const templates = {
  'Natural': naturalStyleTemplate,
  // Add more templates for other styles here
};
