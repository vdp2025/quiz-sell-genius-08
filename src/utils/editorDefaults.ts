
import { EditorConfig } from '@/types/editor';
import { generateId } from './idGenerator';

export const getDefaultEditorConfig = (): EditorConfig => {
  return {
    blocks: [
      {
        id: generateId(),
        type: 'header',
        content: {
          title: 'Seu Resultado Exclusivo',
          subtitle: 'Descubra seu estilo pessoal e como aproveitá-lo ao máximo',
          backgroundColor: '#ffffff',
          textColor: '#333333'
        },
        order: 0
      },
      {
        id: generateId(),
        type: 'style-result',
        content: {
          title: 'Seu Estilo Principal',
          description: 'Conheça as características do seu estilo predominante',
          customImage: '',
          style: {
            background: '#f8f8f8',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }
        },
        order: 1
      },
      {
        id: generateId(),
        type: 'secondary-styles',
        content: {
          title: 'Seus Estilos Secundários',
          description: 'Estes estilos complementam seu estilo principal',
          style: {
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }
        },
        order: 2
      },
      {
        id: generateId(),
        type: 'hero-section',
        content: {
          title: 'Guia Completo do Estilo',
          subtitle: 'Transforme seu visual com nosso guia personalizado',
          imageUrl: 'https://via.placeholder.com/800x400',
          style: {
            background: '#f0e6dd',
            padding: '3rem 1.5rem',
            textAlign: 'center',
            borderRadius: '0.5rem'
          }
        },
        order: 3
      },
      {
        id: generateId(),
        type: 'products',
        content: {
          title: 'O Que Você Vai Receber',
          products: [
            {
              title: 'Guia de Estilo Principal',
              description: 'Um guia completo com todas as diretrizes para seu estilo',
              imageUrl: 'https://via.placeholder.com/300x200'
            },
            {
              title: 'Guia de Combinações',
              description: 'Aprenda a criar looks harmoniosos com seu estilo',
              imageUrl: 'https://via.placeholder.com/300x200'
            }
          ],
          style: {
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }
        },
        order: 4
      },
      {
        id: generateId(),
        type: 'benefits',
        content: {
          title: 'Benefícios do Seu Guia de Estilo',
          items: [
            'Conheça as cores que mais combinam com você',
            'Descubra os cortes e modelagens ideais para seu corpo',
            'Aprenda a criar looks harmoniosos com seu estilo pessoal',
            'Economize tempo e dinheiro com escolhas certeiras'
          ],
          style: {
            background: '#f8f8f8',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }
        },
        order: 5
      },
      {
        id: generateId(),
        type: 'testimonials',
        content: {
          title: 'O Que Nossas Clientes Dizem',
          testimonials: [
            {
              text: 'Este guia transformou minha relação com a moda!',
              name: 'Maria Silva',
              role: 'Professora'
            },
            {
              text: 'Nunca foi tão fácil me vestir bem e com confiança.',
              name: 'Ana Costa',
              role: 'Empresária'
            }
          ],
          style: {
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }
        },
        order: 6
      },
      {
        id: generateId(),
        type: 'pricing',
        content: {
          title: 'Invista no Seu Estilo',
          regularPrice: '397',
          price: '197',
          ctaText: 'Quero Meu Guia de Estilo',
          ctaUrl: '#checkout',
          style: {
            textAlign: 'center',
            background: '#f0e6dd',
            padding: '2rem',
            borderRadius: '0.5rem'
          }
        },
        order: 7
      },
      {
        id: generateId(),
        type: 'guarantee',
        content: {
          title: 'Garantia de Satisfação',
          text: 'Se você não ficar satisfeita com seu guia de estilo, devolvemos seu dinheiro em até 7 dias.',
          days: 7,
          style: {
            textAlign: 'center',
            background: '#ffffff',
            padding: '1.5rem',
            borderRadius: '0.5rem'
          }
        },
        order: 8
      }
    ],
    globalStyles: {
      fontFamily: 'system-ui, sans-serif',
      primaryColor: '#B89B7A',
      secondaryColor: '#4A3828',
      backgroundColor: '#FAF9F7',
      textColor: '#333333',
      headingColor: '#432818'
    },
    theme: {
      fontFamily: 'system-ui, sans-serif',
      primaryColor: '#B89B7A',
      secondaryColor: '#4A3828',
      backgroundColor: '#FAF9F7',
      textColor: '#333333',
      headingColor: '#432818'
    }
  };
};
