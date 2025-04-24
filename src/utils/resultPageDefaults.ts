
import { ResultPageConfig } from "@/types/resultPageConfig";
import { generateId } from "./idGenerator";

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType: styleType,
    header: {
      visible: true,
      content: {
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo Marca',
        title: 'Seu Resultado: Estilo ' + styleType,
      },
      style: {
        backgroundColor: '#FFFFFF',
        padding: '24px',
      }
    },
    mainContent: {
      visible: true,
      content: {
        title: 'Descubra Seu Estilo Pessoal',
        description: 'Entenda como aplicar seu estilo predominante no dia a dia',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
      },
      style: {
        backgroundColor: '#FAF9F7',
        padding: '32px',
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          headline: 'Guia Completo de Estilo',
          subheadline: 'Revolucione seu guarda-roupa com nosso guia personalizado',
          image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
          buttonText: 'Quero meu guia agora',
          buttonUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10'
        },
        style: {
          backgroundColor: '#FFFFFF',
          padding: '32px'
        }
      },
      benefits: {
        visible: true,
        content: {},
        style: {}
      },
      products: {
        visible: true,
        content: {},
        style: {}
      },
      pricing: {
        visible: true,
        content: {
          price: '39,90',
          originalPrice: '149,90',
          installments: '12x de R$3,99',
        },
        style: {}
      },
      testimonials: {
        visible: true,
        content: {
          items: [
            {
              text: "Este guia transformou completamente meu estilo!",
              author: "Maria Silva",
              image: ""
            },
            {
              text: "Agora entendo como valorizar minha personalidade através das roupas.",
              author: "Ana Oliveira",
              image: ""
            }
          ]
        },
        style: {}
      },
      guarantee: {
        visible: true,
        content: {},
        style: {}
      }
    },
    blocks: [],
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Inter, sans-serif'
    }
  };
};
