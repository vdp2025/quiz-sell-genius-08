import { Block } from '@/types/editor';

export const getDefaultContentForType = (type: Block['type']) => {
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
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp'
      };
    case 'text':
      return { text: 'Digite seu texto aqui...' };
    case 'image':
      return { 
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg', 
        imageAlt: 'Gisele Galvão',
        width: '100%',
        borderRadius: '8px'
      };
    case 'hero-section':
      return { 
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp'
      };
    case 'products':
      return {
        title: 'O que você vai receber:',
        images: [
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp',
            alt: 'Guia de Estilo - 3 Revistas'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
            alt: 'Todos os produtos e bônus'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
            alt: 'Celular Peças-Chave'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp',
            alt: 'Revista Peças-Chave'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911674/Espanhol_Portugu%C3%AAs_1_-_Copia_zuhznw.webp',
            alt: 'Revista Várias Imagens Peças-Chave do Guarda Roupa'
          },
          {
            url: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/C%C3%B3pia_de_Passo_5_Pe%C3%A7as_chaves_Documento_A4_lxmekf.webp',
            alt: 'Capa Revista Peças-Chave do Guarda Roupa'
          }
        ]
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
    case 'testimonials':
      return { 
        title: 'O que estão dizendo',
        testimonialsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp'
      };
    case 'guarantee':
      return { 
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
      };
    case 'pricing':
      return { 
        regularPrice: '175,00', 
        salePrice: '39,00', 
        buttonText: 'Quero Transformar Meu Estilo',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        urgencyText: 'Oferta por tempo limitado!'
      };
    case 'cta':
      return { 
        buttonText: 'Clique Aqui', 
        url: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        title: 'Transforme seu estilo agora'
      };
    case 'style-result':
      return { title: 'Seu estilo predominante é {{primaryStyle}}' };
    case 'secondary-styles':
      return { title: 'Seus Estilos Complementares' };
    default:
      return {};
  }
};
