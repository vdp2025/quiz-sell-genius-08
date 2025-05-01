
import { Block } from '@/types/editor';

export const getDefaultContentForType = (type: Block['type']) => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo explicativo para chamar atenção',
        style: {
          paddingY: 16,
          paddingX: 16,
          textAlign: 'center',
          color: '#432818'
        }
      };

    case 'text':
      return {
        text: 'Insira seu texto aqui. Este componente é ideal para parágrafos, descrições ou qualquer conteúdo textual que você deseja apresentar ao seu visitante.',
        style: {
          paddingY: 16,
          paddingX: 16,
          color: '#432818',
          lineHeight: '1.6'
        }
      };

    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem',
        style: {
          maxWidth: '100%',
          borderRadius: 8,
          marginTop: 16,
          marginBottom: 16
        }
      };

    case 'pricing':
      return {
        title: 'Pacote Premium',
        price: 'R$ 97,00',
        regularPrice: 'R$ 197,00',
        ctaText: 'Comprar Agora',
        style: {
          backgroundColor: '#FAF9F7',
          borderRadius: 8,
          paddingY: 24,
          paddingX: 24
        }
      };

    case 'benefits':
      return {
        title: 'Benefícios',
        benefits: [
          'Benefício 1: Descrição detalhada',
          'Benefício 2: Descrição detalhada',
          'Benefício 3: Descrição detalhada'
        ],
        style: {
          paddingY: 16,
          paddingX: 16,
          backgroundColor: '#FFFAF0'
        }
      };
      
    default:
      return {};
  }
};
