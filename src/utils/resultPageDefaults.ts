
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      content: {
        title: 'Seu Estilo Predominante',
        subtitle: 'Descubra mais sobre seu estilo único e como aproveitar ao máximo suas características'
      },
      style: {
        paddingY: '24',
        paddingX: '16',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        borderRadius: '0'
      },
      visible: true
    },
    mainContent: {
      content: {
        description: 'Aqui será exibida uma descrição detalhada do seu estilo predominante, com características, recomendações e dicas personalizadas.',
        mainImage: 'https://placehold.co/600x400?text=Estilo+Predominante',
        tabletImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
        showSecondaryStyles: true,
        showOffer: true
      },
      style: {
        padding: '20px',
        backgroundColor: '#FFFFFF',
        textColor: '#432818'
      },
      visible: true
    },
    offer: {
      hero: {
        content: {
          title: 'Guia de Estilo e Imagem Personalizado',
          description: 'Adquira seu guia completo com análise detalhada, paleta de cores personalizada e recomendações de peças específicas para o seu tipo de estilo.',
          ctaText: 'Adquirir meu Guia de Estilo',
          ctaUrl: '#',
          price: 'R$ 97,00',
          regularPrice: 'R$ 147,00'
        },
        style: {
          padding: '24px',
          backgroundColor: '#FAF9F7',
          color: '#432818'
        },
        visible: true
      },
      benefits: {
        visible: true,
        content: {
          title: 'Benefícios',
          items: [
            'Análise detalhada do seu estilo pessoal',
            'Paleta de cores personalizada',
            'Guia de peças essenciais para o seu guarda-roupa',
            'Dicas de tecidos e modelagens ideais'
          ]
        },
        style: {
          padding: '20px',
        }
      },
      products: {
        visible: true,
        content: {
          title: 'O que você vai receber'
        },
        style: {
          padding: '20px',
        }
      },
      pricing: {
        visible: true,
        content: {
          price: 'R$ 97,00',
          regularPrice: 'R$ 147,00',
          buttonText: 'Comprar Agora'
        },
        style: {
          padding: '20px',
        }
      },
      testimonials: {
        visible: true,
        content: {
          title: 'Depoimentos'
        },
        style: {
          padding: '20px',
        }
      },
      guarantee: {
        visible: true,
        content: {
          title: 'Garantia',
          text: 'Satisfação garantida ou seu dinheiro de volta em até 7 dias.'
        },
        style: {
          padding: '20px',
        }
      }
    },
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        padding: '20px'
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Playfair Display, serif'
    },
    blocks: []
  };
};

export const createOfferConfig = () => {
  return {
    hero: {
      content: {
        title: 'Guia de Estilo e Imagem Personalizado',
        description: 'Adquira seu guia completo com análise detalhada, paleta de cores personalizada e recomendações de peças específicas para o seu tipo de estilo.',
        ctaText: 'Adquirir meu Guia de Estilo',
        ctaUrl: '#',
        price: 'R$ 97,00',
        regularPrice: 'R$ 147,00'
      },
      style: {
        padding: '24px',
        backgroundColor: '#FAF9F7',
        color: '#432818'
      },
      visible: true
    },
    benefits: {
      visible: true,
      content: {
        title: 'Benefícios',
        items: [
          'Análise detalhada do seu estilo pessoal',
          'Paleta de cores personalizada',
          'Guia de peças essenciais para o seu guarda-roupa',
          'Dicas de tecidos e modelagens ideais'
        ]
      },
      style: {
        padding: '20px',
      }
    },
    products: {
      visible: true,
      content: {
        title: 'O que você vai receber'
      },
      style: {
        padding: '20px',
      }
    },
    pricing: {
      visible: true,
      content: {
        price: 'R$ 97,00',
        regularPrice: 'R$ 147,00',
        buttonText: 'Comprar Agora'
      },
      style: {
        padding: '20px',
      }
    },
    testimonials: {
      visible: true,
      content: {
        title: 'Depoimentos'
      },
      style: {
        padding: '20px',
      }
    },
    guarantee: {
      visible: true,
      content: {
        title: 'Garantia',
        text: 'Satisfação garantida ou seu dinheiro de volta em até 7 dias.'
      },
      style: {
        padding: '20px',
      }
    }
  };
};
