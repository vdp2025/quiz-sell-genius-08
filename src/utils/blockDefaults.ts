
import { EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu Estilo Predominante',
        subtitle: 'Descubra como aplicar seus estilos no dia a dia',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png',
        logoAlt: 'Logo Gisele Galvão',
        logoWidth: 'auto',
        logoHeight: '80px'
      };
    
    case 'headline':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Aprenda como aplicá-lo no seu dia a dia',
        alignment: 'center'
      };
    
    case 'text':
      return {
        text: 'Digite seu texto aqui...',
        alignment: 'left'
      };
    
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Imagem',
        style: {
          width: '100%',
          borderRadius: '8px'
        }
      };
    
    case 'benefits':
      return {
        title: 'O que você vai aprender:',
        items: [
          'Aplicar seus estilos com autenticidade',
          'Montar looks práticos para o dia a dia, trabalho e eventos',
          'Usar cores e modelagens que valorizam quem você é',
          'Parar de errar nas compras e economizar tempo'
        ],
        useIcons: true,
        icon: 'check',
        iconColor: '#aa6b5d'
      };
    
    case 'pricing':
      return {
        regularPrice: '197,00',
        salePrice: '97,00',
        buttonText: 'Quero Transformar Meu Estilo',
        urgencyText: 'Oferta por tempo limitado'
      };
    
    case 'guarantee':
      return {
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/garantia_1_rcsuwb.png'
      };
    
    case 'cta':
      return {
        title: 'Pronta para transformar seu estilo?',
        buttonText: 'Sim, quero começar agora!'
      };
    
    case 'style-result':
      return {
        title: 'Seu estilo predominante é {{primaryStyle}}',
        description: 'Você possui características únicas que refletem sua personalidade através do seu estilo pessoal.'
      };
    
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Complementares'
      };
    
    case 'hero-section':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        quote: 'Descubra como seus estilos podem transformar a maneira como você se veste e se apresenta ao mundo.',
        quoteAuthor: 'Gisele Galvão'
      };
    
    case 'spacer':
      return {
        height: '40px'
      };
    
    case 'video':
      return {
        videoTitle: 'Título do Vídeo',
        videoDescription: 'Descrição do vídeo aqui...',
        videoControls: true
      };
    
    case 'two-column':
      return {
        leftColumn: {
          content: '<h3>Coluna Esquerda</h3><p>Conteúdo da coluna esquerda.</p>',
          width: '50%'
        },
        rightColumn: {
          content: '<h3>Coluna Direita</h3><p>Conteúdo da coluna direita.</p>',
          width: '50%'
        },
        columnGap: '20px'
      };
    
    default:
      return {};
  }
};
