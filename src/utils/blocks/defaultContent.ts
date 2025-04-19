
import { Block } from '@/types/editor';

export function getDefaultContentForType(type: Block['type']): any {
  const defaults: Record<string, any> = {
    headline: {
      title: 'Novo título',
      subtitle: 'Subtítulo opcional',
      alignment: 'center',
      textColor: '#432818'
    },
    text: {
      text: 'Digite seu texto aqui...',
      alignment: 'left'
    },
    benefits: {
      title: 'Benefícios',
      items: ['Benefício 1', 'Benefício 2', 'Benefício 3']
    },
    testimonials: {
      title: 'Depoimentos',
      testimonials: [
        {
          text: 'Digite o depoimento aqui...',
          author: 'Nome da pessoa',
          location: 'Cidade'
        }
      ]
    },
    guarantee: {
      title: 'Garantia',
      text: 'Garantia de satisfação',
      days: 7
    },
    'style-result': {
      description: 'Sua descrição do estilo aqui...'
    }
  };

  return defaults[type] || {};
}
