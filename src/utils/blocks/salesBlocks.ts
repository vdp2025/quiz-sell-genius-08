
import { generateId } from '../idGenerator';
import { Block } from '@/types/editor';

export function createOfferBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'offer',
    content: {
      title: 'Guia de Estilo e Imagem',
      subtitle: 'Descubra como expressar seu estilo autêntico',
      price: '39,00',
      regularPrice: '175,00',
      ctaText: 'Quero Transformar Meu Estilo',
      ctaUrl: '#checkout',
      benefits: [
        'Descubra como valorizar sua imagem usando seu estilo natural',
        'Aprenda a criar looks autênticos e poderosos',
        'Entenda as cores e modelagens que mais combinam com você',
        'Maximize seu guarda-roupa com peças versáteis'
      ],
      bonuses: [
        'Guia de Visagismo Facial',
        'Cartela de Cores Digital',
        'Planilha de Guarda-Roupa Cápsula',
        'Acesso ao Grupo VIP no Telegram'
      ]
    },
    order
  };
}

export function createGuaranteeBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'guarantee',
    content: {
      title: 'Garantia de 7 dias',
      text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.',
      days: 7,
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745076124/garantia-7-dias_b4wd8c.png'
    },
    order
  };
}

export function createFaqBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'faq',
    content: {
      title: 'Perguntas Frequentes',
      faqItems: [
        {
          question: 'Como vou receber o material?',
          answer: 'Você receberá acesso imediato ao seu e-mail logo após a compra. Todo o conteúdo está disponível na plataforma online.'
        },
        {
          question: 'Por quanto tempo terei acesso?',
          answer: 'O acesso é vitalício. Você poderá consultar o material sempre que precisar.'
        },
        {
          question: 'Como funciona a garantia?',
          answer: 'Oferecemos 7 dias de garantia incondicional. Se você não ficar satisfeita, basta solicitar o reembolso.'
        }
      ],
      defaultOpen: true
    },
    order
  };
}

export function createTwoColumnBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'two-column',
    content: {
      leftColumn: {
        type: 'image',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp'
      },
      rightColumn: {
        type: 'text',
        title: 'Transforme seu estilo',
        text: 'Um guia completo que ajudará você a expressar sua verdadeira personalidade através da moda.'
      },
      columnGap: '24px'
    },
    order
  };
}

export function createTestimonialBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'testimonials',
    content: {
      title: 'O que nossas clientes dizem',
      testimonials: [
        {
          text: 'Nunca imaginei que conhecer meu estilo faria tanta diferença! Hoje me visto com muito mais confiança e recebo elogios constantemente.',
          name: 'Roberta S.',
          location: 'São Paulo'
        },
        {
          text: 'Economizei muito dinheiro depois que aprendi quais peças realmente combinam comigo. Meu guarda-roupa é menor, mas muito mais funcional!',
          name: 'Carla M.',
          location: 'Rio de Janeiro'
        }
      ]
    },
    order
  };
}
