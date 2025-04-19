
import { v4 as uuidv4 } from 'uuid';
import { EditableContent, EditorBlock } from '@/types/editor';

export const getDefaultContentForType = (blockType: string): EditableContent => {
  switch (blockType) {
    case 'header':
      return {
        title: 'Olá, seu estilo predominante é:',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo Gisele Galvão',
        logoHeight: 56
      };
      
    case 'headline':
      return {
        title: 'Você já descobriu seu Estilo',
        subtitle: 'E isso é muito poderoso. Conhecimento é clareza.',
        alignment: 'center',
        textColor: '#aa6b5d'
      };
      
    case 'text':
      return {
        text: 'É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história. Não é sobre mudar quem você é. É sobre finalmente Vestir-se de Você.',
        alignment: 'center'
      };
      
    case 'image':
      return {
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        imageAlt: 'Guia de Estilo e Imagem',
        borderRadius: '8px'
      };
      
    case 'benefits':
      return {
        title: 'O Guia de Estilo e Imagem + Bônus Exclusivos',
        subtitle: 'Criado para mulheres que querem muito mais do que "saber seu estilo".',
        items: [
          'Como montar looks com intenção (e não no improviso)',
          'Como usar suas cores, modelagens e tecidos a seu favor',
          'Como alinhar sua imagem com seus valores e objetivos',
          'Como parar de comprar por impulso e montar um guarda-roupa funcional'
        ]
      };
      
    case 'pricing':
      return {
        regularPrice: '175,00',
        salePrice: '39,00',
        buttonText: 'Quero meu Guia + Bônus por R$39,00',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'
      };
      
    case 'guarantee':
      return {
        title: 'Garantia de 7 dias',
        description: 'Você tem uma semana para acessar o conteúdo completo, testar e aplicar. Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia.',
        days: 7,
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
      };
      
    case 'cta':
      return {
        ctaText: 'Quero meu Guia + Bônus por R$39,00',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        style: {
          backgroundColor: '#aa6b5d',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '6px',
          fontWeight: 'medium',
          textAlign: 'center'
        }
      };
      
    case 'style-hero':
      return {
        title: 'Você já descobriu seu Estilo',
        subtitle: 'Conhecimento é clareza. E clareza muda o jeito que você se vê, se escolhe, se posiciona.',
        description: 'Mas é na ação que a verdadeira transformação acontece. É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história.',
        mainImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp'
      };
      
    case 'mentor':
      return {
        name: 'Gisele Galvão',
        title: 'Conheça sua Mentora',
        bio: 'Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.\n\nAdvogada de formação. Mãe da Victória, esposa do Fabrício.\n\nApaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.43.29_ubwaq9.webp'
      };
      
    case 'testimonials':
      return {
        title: 'Depoimentos de mulheres que já viveram essa transformação',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp',
        testimonials: [
          {
            text: 'Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.',
            author: 'Mariangela',
            position: 'Engenheira'
          },
          {
            text: 'Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.',
            author: 'Patrícia Paranhos',
            position: 'Advogada'
          },
          {
            text: 'A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.',
            author: 'Sônia Spier',
            position: 'Terapeuta'
          }
        ]
      };
      
    case 'offer':
      return {
        title: 'Transforme Seu Estilo com o Guia Completo',
        subtitle: 'Simples. Prático. Estratégico. Para você transformar estilo em presença. E imagem em poder.',
        bonusTitle: '🎁 E ainda recebe 2 bônus poderosos:',
        price: '39,00',
        regularPrice: '175,00',
        ctaText: 'Quero meu Guia + Bônus por R$39,00',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        productImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp',
        bonusImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp',
        bonuses: [
          'Peças-chave do Guarda-Roupa de Sucesso: Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal.',
          'Mini Guia de Visagismo Facial: Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual.'
        ]
      };
    
    case 'style-result':
      return {
        description: 'Seu estilo reflete sua personalidade única e autêntica. Agora que você conhece seu estilo predominante, pode aplicar esse conhecimento para criar uma imagem que comunique exatamente quem você é.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
      };

    // Default empty content
    default:
      return {};
  }
};

export const createDefaultBlocks = (styleType: string): EditorBlock[] => {
  return [
    {
      id: uuidv4(),
      type: 'header',
      content: getDefaultContentForType('header'),
      order: 0
    },
    {
      id: uuidv4(),
      type: 'style-result',
      content: {
        ...getDefaultContentForType('style-result'),
        styleType
      },
      order: 1
    },
    {
      id: uuidv4(),
      type: 'style-hero',
      content: {
        ...getDefaultContentForType('style-hero'),
        styleType
      },
      order: 2
    },
    {
      id: uuidv4(),
      type: 'benefits',
      content: getDefaultContentForType('benefits'),
      order: 3
    },
    {
      id: uuidv4(),
      type: 'offer',
      content: getDefaultContentForType('offer'),
      order: 4
    },
    {
      id: uuidv4(),
      type: 'testimonials',
      content: getDefaultContentForType('testimonials'),
      order: 5
    },
    {
      id: uuidv4(),
      type: 'guarantee',
      content: getDefaultContentForType('guarantee'),
      order: 6
    },
    {
      id: uuidv4(),
      type: 'mentor',
      content: getDefaultContentForType('mentor'),
      order: 7
    }
  ] as EditorBlock[];
};
