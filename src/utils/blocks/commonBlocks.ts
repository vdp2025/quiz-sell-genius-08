
import { generateId } from '../idGenerator';
import { Block } from '@/types/editor';

export function createHeadlineBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'headline',
    content: {
      title: 'Chegou a hora de transformar seu estilo',
      subtitle: 'Descubra como expressar sua verdadeira personalidade através das suas escolhas',
      alignment: 'center',
      textColor: '#432818'
    },
    order
  };
}

export function createBenefitsBlock(order: number): Block {
  return {
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
    order
  };
}

export function createTestimonialsBlock(order: number): Block {
  return {
    id: generateId(),
    type: 'testimonials',
    content: {
      title: 'O que dizem as alunas',
      testimonials: [
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
    order
  };
}
