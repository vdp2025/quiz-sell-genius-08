import { generateId } from './idGenerator';
import { Block } from '@/types/editor';

export function createDefaultBlocks(styleType: string): Block[] {
  return [
    {
      id: generateId(),
      type: 'style-hero',
      content: {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        styleType,
        ctaText: 'Quero transformar meu estilo',
        ctaUrl: '#oferta'
      },
      order: 0
    },
    {
      id: generateId(),
      type: 'style-result',
      content: {
        showDetails: true,
        styleType
      },
      order: 1
    },
    {
      id: generateId(),
      type: 'headline',
      content: {
        title: 'Chegou a hora de transformar seu estilo',
        subtitle: 'Descubra como expressar sua verdadeira personalidade através das suas escolhas',
        alignment: 'center',
        textColor: '#432818'
      },
      order: 2
    },
    {
      id: generateId(),
      type: 'benefits',
      content: {
        title: 'O que você vai descobrir',
        items: [
          'Como criar looks que expressam sua personalidade e estilo único',
          'Como escolher peças que realmente combinam com você',
          'Como montar um guarda-roupa funcional e versátil',
          'Como usar cores e modelagens a seu favor',
          'Como desenvolver mais confiança no seu estilo'
        ]
      },
      order: 3
    },
    {
      id: generateId(),
      type: 'offer',
      content: {
        title: 'Guia Completo de Estilo e Imagem',
        subtitle: 'Transforme seu estilo e sua autoestima',
        price: '39,00',
        regularPrice: '175,00',
        ctaText: 'Quero meu guia + bônus',
        ctaUrl: 'https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912'
      },
      order: 4
    },
    {
      id: generateId(),
      type: 'testimonials',
      content: {
        title: 'O que dizem as alunas',
        items: [
          {
            text: "O guia mudou completamente minha relação com a moda. Agora sei exatamente o que combina comigo!",
            author: "Maria Silva",
            location: "São Paulo"
          },
          {
            text: "Finalmente entendi meu estilo e parei de gastar dinheiro com roupas que não uso.",
            author: "Ana Costa",
            location: "Rio de Janeiro"
          }
        ]
      },
      order: 5
    },
    {
      id: generateId(),
      type: 'guarantee',
      content: {
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar satisfeita com o conteúdo nos primeiros 7 dias, devolvemos 100% do seu investimento. Sem burocracia.',
        days: 7
      },
      order: 6
    },
    {
      id: generateId(),
      type: 'faq',
      content: {
        title: 'Dúvidas Frequentes',
        faqItems: [
          {
            question: 'Como vou receber o material?',
            answer: 'Você receberá acesso imediato ao guia digital após a confirmação do pagamento.'
          },
          {
            question: 'Por quanto tempo terei acesso ao material?',
            answer: 'O acesso é vitalício. Uma vez que você adquire o guia, pode acessá-lo quando e onde quiser.'
          },
          {
            question: 'Funciona para todos os estilos?',
            answer: 'Sim! O guia é personalizado para cada estilo, então você receberá orientações específicas para o seu.'
          }
        ]
      },
      order: 7
    },
    {
      id: generateId(),
      type: 'cta',
      content: {
        title: 'Transforme seu estilo agora',
        buttonText: 'Quero começar minha transformação',
        ctaUrl: 'https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912'
      },
      order: 8
    }
  ];
}

export function getDefaultContentForType(type: Block['type']): any {
  switch (type) {
    case 'headline':
      return {
        title: 'Novo título',
        subtitle: 'Subtítulo opcional',
        alignment: 'center',
        textColor: '#432818'
      };
    case 'text':
      return {
        text: 'Digite seu texto aqui...',
        alignment: 'left'
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        items: ['Benefício 1', 'Benefício 2', 'Benefício 3']
      };
    case 'testimonials':
      return {
        title: 'Depoimentos',
        items: [
          {
            text: 'Digite o depoimento aqui...',
            author: 'Nome da pessoa',
            location: 'Cidade'
          }
        ]
      };
    case 'guarantee':
      return {
        title: 'Garantia de 7 dias',
        text: 'Satisfação garantida ou seu dinheiro de volta.',
        days: 7
      };
    case 'cta':
      return {
        title: 'Comece agora',
        buttonText: 'Quero começar',
        ctaUrl: '#'
      };
    case 'header':
      return {
        title: 'Seu novo cabeçalho',
        logo: '',
        logoAlt: 'Logo da empresa'
      };
    case 'image':
      return {
        imageUrl: '',
        alt: 'Imagem',
        width: '100%'
      };
    case 'pricing':
      return {
        regularPrice: '197,00',
        salePrice: '39,00',
        buttonText: 'Comprar agora',
        ctaUrl: '#'
      };
    case 'style-result':
      return {
        description: 'Sua descrição do estilo aqui...',
        imageUrl: ''
      };
    case 'secondary-styles':
      return {};
    case 'hero-section':
      return {
        title: 'Título da seção Hero',
        subtitle: 'Subtítulo da seção Hero',
        heroImage: '',
        heroImageAlt: 'Imagem da seção Hero'
      };
    case 'products':
      return {
        title: 'Nossos produtos',
        items: []
      };
    case 'bonus-carousel':
      return {
        title: 'Bônus exclusivos',
        bonuses: []
      };
    case 'spacer':
      return {
        height: '20px'
      };
    case 'video':
      return {
        videoUrl: '',
        videoTitle: 'Título do vídeo',
        videoDescription: 'Descrição do vídeo'
      };
    case 'two-column':
      return {
        leftColumn: {
          text: 'Conteúdo da coluna esquerda'
        },
        rightColumn: {
          text: 'Conteúdo da coluna direita'
        }
      };
    case 'icon':
      return {
        icon: 'star',
        size: '24px',
        color: '#000'
      };
    case 'faq':
      return {
        faqItems: [
          {
            question: 'Pergunta frequente 1',
            answer: 'Resposta da pergunta 1'
          }
        ]
      };
    case 'carousel':
      return {
        carouselImages: []
      };
    case 'custom-code':
      return {
        code: ''
      };
    case 'animation-block':
      return {
        animationType: 'fade-in',
        animationDuration: '1s'
      };
    case 'bonus':
      return {
        title: 'Bônus',
        description: 'Descrição do bônus',
        bonusImage: ''
      };
    case 'urgency':
      return {
        text: 'Oferta por tempo limitado!'
      };
    case 'mentor':
      return {
        name: 'Nome do mentor',
        bio: 'Biografia do mentor',
        image: ''
      };
    case 'style-hero':
      return {
        title: 'Descubra seu estilo',
        subtitle: 'Encontre o estilo perfeito para você'
      };
    case 'offer':
      return {
        title: 'Oferta especial',
        description: 'Aproveite nossa oferta exclusiva'
      };
    case 'guarantee':
      return {
        title: 'Garantia',
        text: 'Garantia de satisfação'
      };
    default:
      return {};
  }
}
