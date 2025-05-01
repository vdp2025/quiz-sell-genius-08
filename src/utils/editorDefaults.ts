
import { Block } from '@/types/editor';

export const getDefaultContentForType = (type: Block['type']) => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo explicativo para chamar atenção',
        style: {
          padding: '16px',
          textAlign: 'center' as 'center',
          color: '#432818'
        }
      };

    case 'text':
      return {
        text: 'Insira seu texto aqui. Este componente é ideal para parágrafos, descrições ou qualquer conteúdo textual que você deseja apresentar ao seu visitante.',
        style: {
          padding: '16px',
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
          borderRadius: '8px',
          margin: '16px 0'
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
          borderRadius: '8px',
          padding: '24px'
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
          padding: '16px',
          backgroundColor: '#FFFAF0'
        }
      };
      
    case 'bonus-carousel':
      return {
        title: 'Você recebe também:',
        bonusImages: [
          { url: '', alt: 'Bônus 1', title: 'Título do Bônus 1' },
          { url: '', alt: 'Bônus 2', title: 'Título do Bônus 2' }
        ],
        style: {
          padding: '16px',
          backgroundColor: '#FFFAF0'
        }
      };
      
    default:
      return {};
  }
};
