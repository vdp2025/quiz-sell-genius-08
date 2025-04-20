
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: 'Seu Resultado Exclusivo',
        subtitle: 'Descubra seu estilo pessoal e como aproveitá-lo ao máximo'
      },
      style: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '40px 20px',
        textAlign: 'center'
      }
    },
    mainContent: {
      visible: true,
      content: {
        title: `Seu Estilo Principal: ${styleType}`,
        description: 'Conheça as características do seu estilo predominante',
        customImage: ''
      },
      style: {
        backgroundColor: '#f8f8f8',
        textColor: '#333333',
        padding: '40px 20px'
      }
    },
    secondaryStyles: {
      visible: true,
      content: {
        title: 'Seus Estilos Secundários',
        description: 'Estes estilos complementam seu estilo principal'
      },
      style: {
        backgroundColor: '#ffffff',
        textColor: '#333333',
        padding: '40px 20px'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: 'Guia Completo do Estilo',
          subtitle: 'Transforme seu visual com nosso guia personalizado',
          imageUrl: ''
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
          title: 'O Que Você Vai Receber',
          products: []
        },
        style: {
          backgroundColor: '#ffffff',
          textColor: '#333333',
          padding: '40px 20px'
        }
      },
      benefits: {
        visible: true,
        content: {
          title: 'Benefícios do Seu Guia de Estilo',
          items: [
            'Conheça as cores que mais combinam com você',
            'Descubra os cortes e modelagens ideais para seu corpo',
            'Aprenda a criar looks harmoniosos com seu estilo pessoal',
            'Economize tempo e dinheiro com escolhas certeiras'
          ]
        },
        style: {
          backgroundColor: '#f8f8f8',
          textColor: '#333333',
          padding: '40px 20px'
        }
      },
      pricing: {
        visible: true,
        content: {
          title: 'Invista no Seu Estilo',
          price: '197',
          regularPrice: '397',
          ctaText: 'Quero Meu Guia de Estilo',
          ctaUrl: '#checkout'
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
          title: 'O Que Nossas Clientes Dizem',
          testimonials: []
        },
        style: {
          backgroundColor: '#f8f8f8',
          textColor: '#333333',
          padding: '40px 20px'
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
};
