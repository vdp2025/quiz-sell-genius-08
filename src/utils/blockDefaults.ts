
import { EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Olá, seu Estilo Predominante é:',
        logo: '',
        logoAlt: 'Logo da empresa',
        style: {
          backgroundColor: '#ffffff',
          padding: '20px 0',
          textAlign: 'center'
        }
      };
      
    case 'headline':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza',
        alignment: 'center',
        textColor: '#432818',
        style: {
          fontSize: '32px',
          fontWeight: 'bold',
          margin: '20px 0'
        }
      };
      
    case 'text':
      return {
        text: 'Digite seu texto aqui...',
        alignment: 'left',
        style: {
          fontSize: '16px',
          lineHeight: '1.6',
          margin: '20px 0'
        }
      };
      
    case 'image':
      return {
        imageUrl: 'https://placehold.co/600x400?text=Imagem',
        imageAlt: 'Descrição da imagem',
        style: {
          width: '100%',
          height: 'auto',
          margin: '0 auto',
          borderRadius: '8px'
        }
      };
      
    case 'benefits':
      return {
        title: 'O que você vai aprender:',
        items: [
          'Benefício 1: Descubra como aplicar seu estilo no dia a dia',
          'Benefício 2: Aprenda a combinar peças de forma harmoniosa',
          'Benefício 3: Crie looks que valorizam seu tipo físico'
        ],
        useIcons: true,
        icon: '✓',
        iconColor: '#B89B7A',
        style: {
          padding: '20px',
          backgroundColor: '#faf9f7',
          borderRadius: '8px'
        }
      };
      
    case 'pricing':
      return {
        regularPrice: '197,00',
        salePrice: '97,00',
        buttonText: 'Quero Transformar Meu Estilo',
        ctaUrl: '#checkout',
        urgencyText: 'Oferta por tempo limitado!',
        style: {
          padding: '30px',
          backgroundColor: '#faf9f7',
          borderRadius: '8px',
          textAlign: 'center'
        }
      };
      
    case 'guarantee':
      return {
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.',
        image: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
        style: {
          padding: '20px',
          backgroundColor: '#faf9f7',
          borderRadius: '8px'
        }
      };
      
    case 'cta':
      return {
        title: 'Pronta para transformar seu estilo?',
        buttonText: 'Sim, quero começar agora!',
        ctaUrl: '#checkout',
        style: {
          padding: '30px',
          backgroundColor: '#faf9f7',
          borderRadius: '8px',
          textAlign: 'center'
        }
      };
      
    case 'style-result':
      return {
        title: 'Seu estilo predominante é {{primaryStyle}}',
        description: 'Você possui características únicas que refletem sua personalidade através do seu estilo pessoal.',
        customImage: '',
        style: {
          padding: '20px',
          backgroundColor: '#faf9f7',
          borderRadius: '8px'
        }
      };
      
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Complementares',
        description: 'Além do seu estilo predominante, você também possui traços dos seguintes estilos:',
        style: {
          padding: '20px',
          backgroundColor: '#faf9f7',
          borderRadius: '8px'
        }
      };
      
    case 'hero-section':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        heroImage: 'https://placehold.co/800x500?text=Imagem+Principal',
        heroImageAlt: 'Guia de Estilo',
        heroImage2: 'https://placehold.co/800x300?text=Imagem+Secundária',
        quote: 'Descobrir seu estilo pessoal é o primeiro passo para construir um guarda-roupa autêntico e funcional.',
        quoteAuthor: 'Consultora de Estilo',
        style: {
          padding: '30px 0'
        }
      };
      
    case 'products':
      return {
        title: 'O que você vai receber:',
        images: [
          { url: 'https://placehold.co/400x300?text=Produto+1', alt: 'Produto 1', title: 'Guia de Estilo Digital' },
          { url: 'https://placehold.co/400x300?text=Produto+2', alt: 'Produto 2', title: 'Workshop de Coloração Pessoal' }
        ],
        style: {
          padding: '30px 0'
        }
      };
      
    case 'testimonials':
      return {
        title: 'O que estão dizendo',
        testimonialsImage: 'https://placehold.co/800x400?text=Depoimentos',
        style: {
          padding: '30px 0'
        }
      };
      
    case 'bonus-carousel':
      return {
        title: 'Você também recebe estes bônus',
        bonusImages: [
          { url: 'https://placehold.co/400x300?text=Bônus+1', alt: 'Bônus 1', title: 'Bônus #1: Guia de Compras' },
          { url: 'https://placehold.co/400x300?text=Bônus+2', alt: 'Bônus 2', title: 'Bônus #2: Cartela de Cores' }
        ],
        style: {
          padding: '30px 0'
        }
      };
      
    case 'video':
      return {
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        videoTitle: 'Vídeo Explicativo',
        videoDescription: 'Assista este vídeo para entender melhor como aplicar seu estilo.',
        videoThumbnail: '',
        videoAutoplay: false,
        videoControls: true,
        style: {
          width: '100%',
          height: 'auto'
        }
      };
      
    case 'two-column':
      return {
        leftColumn: {
          content: '<h3>Coluna da Esquerda</h3><p>Adicione seu conteúdo aqui.</p>',
          width: '50%',
          style: {
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }
        },
        rightColumn: {
          content: '<h3>Coluna da Direita</h3><p>Adicione seu conteúdo aqui.</p>',
          width: '50%',
          style: {
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px'
          }
        },
        columnGap: '20px',
        style: {
          margin: '20px 0'
        }
      };
      
    case 'spacer':
      return {
        height: '50px',
        style: {
          width: '100%'
        }
      };
      
    case 'icon':
      return {
        icon: '✓',
        size: '48px',
        color: '#B89B7A',
        title: 'Texto do ícone',
        position: 'right',
        style: {
          padding: '20px'
        }
      };
      
    default:
      return {};
  }
};
