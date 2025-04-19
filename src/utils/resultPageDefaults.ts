
import { ResultPageConfig } from '@/types/resultPageConfig';
import { createDefaultBlocks } from './blockDefaults';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: 'Olá, seu Estilo Predominante é:',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo Gisele Galvão'
      },
      style: {
        backgroundColor: '#ffffff',
        padding: '1rem',
        textAlign: 'center'
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: 'Seu estilo reflete sua personalidade única e autêntica. Agora que você conhece seu estilo predominante, pode aplicar esse conhecimento para criar uma imagem que comunique exatamente quem você é.',
        customImage: styleImagePath(styleType) || ''
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
        marginTop: '1.5rem'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: 'Transforme Seu Estilo',
          subtitle: 'Você já descobriu seu estilo. Agora é hora de transformá-lo em realidade.',
          heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
          heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
        },
        style: {
          padding: '2rem',
          backgroundColor: '#fff8f5',
          borderRadius: '0.5rem',
          marginTop: '2rem'
        }
      },
      products: {
        visible: true,
        content: {},
        style: {}
      },
      pricing: {
        visible: true,
        content: {
          price: '39,00',
          regularPrice: '175,00',
          ctaText: 'Quero meu Guia + Bônus por R$39,00',
          ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'
        },
        style: {}
      },
      benefits: {
        visible: true,
        content: {
          items: [
            'Como montar looks com intenção (e não no improviso)',
            'Como usar suas cores, modelagens e tecidos a seu favor',
            'Como alinhar sua imagem com seus valores e objetivos',
            'Como parar de comprar por impulso e montar um guarda-roupa funcional'
          ]
        },
        style: {}
      },
      testimonials: {
        visible: true,
        content: {},
        style: {}
      },
      guarantee: {
        visible: true,
        content: {
          days: 7,
          title: 'Garantia de 7 dias',
          description: 'Você tem uma semana para acessar o conteúdo completo, testar e aplicar. Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia.'
        },
        style: {}
      }
    },
    globalStyles: {
      primaryColor: '#aa6b5d',
      secondaryColor: '#8f574a',
      textColor: '#432818',
      backgroundColor: '#fffaf7',
      fontFamily: 'Playfair Display, serif'
    },
    blocks: createDefaultBlocks(styleType)
  };
};

function styleImagePath(styleType: string): string {
  const styleImages: Record<string, string> = {
    'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
    'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
  };
  
  return styleImages[styleType] || styleImages['Natural'];
}
