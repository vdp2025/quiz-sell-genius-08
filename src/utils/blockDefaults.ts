
import { BlockType, EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu Resultado Exclusivo',
        subtitle: 'Descubra seu estilo pessoal',
        backgroundColor: '#ffffff',
        textColor: '#333333'
      };
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo opcional',
        textAlign: 'center',
        style: {
          fontWeight: 'bold',
          marginBottom: '1rem'
        }
      };
    case 'text':
      return {
        text: 'Insira seu texto aqui. Você pode alterar o conteúdo, cores e estilo através do painel de propriedades.',
        textAlign: 'left',
        style: {
          fontSize: '1rem',
          lineHeight: '1.5'
        }
      };
    case 'image':
      return {
        imageUrl: 'https://via.placeholder.com/800x400',
        imageAlt: 'Imagem de exemplo',
        style: {
          width: '100%',
          borderRadius: '0.5rem'
        }
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        items: [
          'Benefício 1 - Descreva os detalhes aqui',
          'Benefício 2 - Descreva os detalhes aqui',
          'Benefício 3 - Descreva os detalhes aqui'
        ],
        style: {
          background: '#f8f8f8',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }
      };
    case 'pricing':
      return {
        title: 'Investimento',
        regularPrice: '397',
        price: '197',
        ctaText: 'Quero Aproveitar Esta Oferta',
        ctaUrl: '#checkout',
        style: {
          textAlign: 'center',
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '0.5rem'
        }
      };
    case 'guarantee':
      return {
        title: 'Garantia de Satisfação',
        text: 'Se você não ficar satisfeito, devolvemos seu dinheiro em até 7 dias.',
        days: 7,
        style: {
          textAlign: 'center',
          background: '#ffffff',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }
      };
    case 'cta':
      return {
        title: 'Pronto para Começar?',
        subtitle: 'Aproveite nossa oferta especial',
        ctaText: 'Quero Começar Agora',
        ctaUrl: '#checkout',
        style: {
          background: '#f0e6dd',
          padding: '2rem',
          textAlign: 'center',
          borderRadius: '0.5rem'
        }
      };
    case 'style-result':
      return {
        title: 'Seu Estilo Principal',
        description: 'Conheça as características do seu estilo predominante',
        customImage: '',
        style: {
          background: '#ffffff',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }
      };
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Secundários',
        description: 'Estes estilos complementam seu estilo principal',
        style: {
          background: '#f8f8f8',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }
      };
    case 'hero-section':
      return {
        title: 'Guia Completo do Estilo',
        subtitle: 'Transforme seu visual com nosso guia personalizado',
        imageUrl: 'https://via.placeholder.com/800x400',
        style: {
          background: '#f0e6dd',
          padding: '3rem 1.5rem',
          textAlign: 'center',
          borderRadius: '0.5rem'
        }
      };
    case 'products':
      return {
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
      };
    case 'testimonials':
      return {
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
          background: '#f8f8f8',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }
      };
    case 'spacer':
      return {
        height: '2rem',
        style: {}
      };
    case 'video':
      return {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoTitle: 'Título do Vídeo',
        videoDescription: 'Descrição do vídeo',
        videoThumbnail: '',
        videoAutoplay: false,
        videoControls: true,
        style: {
          width: '100%',
          borderRadius: '0.5rem'
        }
      };
    case 'two-column':
      return {
        leftColumn: {
          content: '<p>Conteúdo da coluna esquerda</p>',
          width: '50%',
          style: {}
        },
        rightColumn: {
          content: '<p>Conteúdo da coluna direita</p>',
          width: '50%',
          style: {}
        },
        columnGap: '1rem',
        style: {
          display: 'flex',
          flexWrap: 'wrap'
        }
      };
    case 'icon':
      return {
        iconName: 'Star',
        iconSize: '24',
        iconColor: '#B89B7A',
        style: {
          textAlign: 'center',
          margin: '1rem 0'
        }
      };
    case 'faq':
      return {
        title: 'Perguntas Frequentes',
        faqItems: [
          {
            question: 'O que é o Guia de Estilo?',
            answer: 'O Guia de Estilo é um material exclusivo que ajuda você a entender e aplicar seu estilo pessoal no dia a dia.'
          },
          {
            question: 'Como funciona a garantia?',
            answer: 'Oferecemos uma garantia de satisfação de 7 dias. Se você não estiver satisfeito, devolvemos seu dinheiro.'
          }
        ],
        defaultOpen: false,
        style: {
          background: '#ffffff',
          padding: '1.5rem',
          borderRadius: '0.5rem'
        }
      };
    case 'carousel':
      return {
        carouselImages: [
          {
            url: 'https://via.placeholder.com/800x400',
            alt: 'Imagem 1',
            caption: 'Legenda da imagem 1'
          },
          {
            url: 'https://via.placeholder.com/800x400',
            alt: 'Imagem 2',
            caption: 'Legenda da imagem 2'
          }
        ],
        autoPlay: true,
        interval: 5000,
        showArrows: true,
        showDots: true,
        style: {
          width: '100%',
          borderRadius: '0.5rem'
        }
      };
    case 'custom-code':
      return {
        code: '<!-- Insira seu código personalizado aqui -->',
        style: {}
      };
    case 'animation-block':
      return {
        animationType: 'fade-in',
        animationDuration: '0.5s',
        animationDelay: '0s',
        animationTrigger: 'onScroll',
        children: '<p>Conteúdo animado</p>',
        style: {}
      };
    default:
      return {
        title: 'Novo Bloco',
        text: 'Conteúdo do bloco'
      };
  }
};
