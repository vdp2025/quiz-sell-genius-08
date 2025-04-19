
import { EditableContent, EditorConfig } from '@/types/editor';
import { generateId } from './idGenerator';

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'header':
      return { 
        title: 'Olá, seu Estilo Predominante é:',
        subtitle: '',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo Gisele Galvão'
      };
    case 'headline':
      return { 
        title: 'VOCÊ DESCOBRIU SEU ESTILO', 
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        textColor: '#432818',
        alignment: 'center'
      };
    case 'text':
      return { 
        text: 'Digite seu texto aqui...',
        alignment: 'left'
      };
    case 'image':
      return { 
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp', 
        imageAlt: 'Imagem do Resultado',
        width: '100%',
        borderRadius: '8px'
      };
    case 'benefits':
      return { 
        title: 'O que você vai aprender:', 
        items: [
          'Aplicar seus estilos com autenticidade',
          'Montar looks práticos para o dia a dia, trabalho e eventos',
          'Usar cores e modelagens que valorizam quem você é',
          'Parar de errar nas compras e economizar tempo'
        ]
      };
    case 'pricing':
      return { 
        regularPrice: '175,00', 
        salePrice: '39,00', 
        buttonText: 'Quero Transformar Meu Estilo',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        urgencyText: 'Oferta por tempo limitado!'
      };
    case 'guarantee':
      return { 
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
      };
    case 'cta':
      return { 
        buttonText: 'Clique Aqui', 
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        title: 'Transforme seu estilo agora',
        url: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'
      };
    case 'style-result':
      return { 
        title: 'Seu estilo predominante é {{primaryStyle}}',
        description: 'Você possui características únicas que refletem sua personalidade através do seu estilo pessoal.'
      };
    case 'secondary-styles':
      return { title: 'Seus Estilos Complementares' };
    case 'hero-section':
      return { 
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp',
        heroImageAlt: 'Guia de Estilo',
        quote: 'Descubra como expressar sua personalidade através do seu estilo de vestir',
        quoteAuthor: 'Gisele Galvão'
      };
    case 'products':
      return {
        title: 'O que você vai receber:',
        images: [
          { url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
            alt: 'Guia de Estilo - 3 Revistas' },
          { url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
            alt: 'Todos os produtos e bônus' }
        ]
      };
    case 'testimonials':
      return { 
        title: 'O que estão dizendo',
        testimonialsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp'
      };
    case 'bonus-carousel':
      return { 
        title: 'Você também recebe estes bônus',
        bonusImages: [
          { url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
            alt: 'Bônus 1',
            title: 'Guia de Estilo Digital' },
          { url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
            alt: 'Bônus 2',
            title: 'Templates de Looks' }
        ]
      };
    default:
      return {};
  }
};

export const defaultConfig: EditorConfig = {
  blocks: [
    {
      id: generateId(),
      type: 'header',
      content: { 
        title: 'Olá, seu Estilo Predominante é:',
        subtitle: '',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo Gisele Galvão'
      },
      order: 0
    },
    {
      id: generateId(),
      type: 'style-result',
      content: { 
        title: 'Seu estilo predominante é {{primaryStyle}}',
        description: 'Você possui características únicas que refletem sua personalidade através do seu estilo pessoal.'
      },
      order: 1
    },
    {
      id: generateId(),
      type: 'secondary-styles',
      content: { 
        title: 'Seus Estilos Complementares' 
      },
      order: 2
    }
  ],
  globalStyles: {
    primaryColor: '#B89B7A',
    secondaryColor: '#432818',
    textColor: '#1A1818',
    backgroundColor: '#fffaf7',
    fontFamily: 'Inter, sans-serif'
  },
  theme: {
    primaryColor: '#B89B7A',
    secondaryColor: '#432818',
    textColor: '#1A1818',
    backgroundColor: '#fffaf7',
    fontFamily: 'Inter, sans-serif'
  }
};
