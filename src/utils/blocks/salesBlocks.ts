
import { generateId } from '../idGenerator';
import { Block } from '@/types/editor';

export function createOfferBlock(order: number): Block {
  return {
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
    order
  };
}

export function createGuaranteeBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'guarantee',
    content: {
      title: 'Garantia de 7 dias',
      text: 'Se você não ficar satisfeita com o conteúdo nos primeiros 7 dias, devolvemos 100% do seu investimento. Sem burocracia.',
      days: 7
    },
    order
  };
}

export function createFaqBlock(order: number): Block {
  return {
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
    order
  };
}
