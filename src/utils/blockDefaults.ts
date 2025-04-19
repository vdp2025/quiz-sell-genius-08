
import { Block } from '@/types/editor';
import { salesConfig } from '@/config/salesConfig';

export const getDefaultContentForType = (type: Block['type']): any => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu Estilo Único',
        logoUrl: '',
        backgroundColor: '#ffffff'
      };
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição opcional'
      };
    case 'text':
      return {
        text: 'Adicione seu texto aqui. Este é um bloco de texto simples para explicações ou detalhes.'
      };
    case 'image':
      return {
        url: '',
        alt: 'Descrição da imagem',
        caption: '',
        width: '100%'
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        items: [
          'Benefício 1: Descrição do primeiro benefício',
          'Benefício 2: Descrição do segundo benefício',
          'Benefício 3: Descrição do terceiro benefício'
        ]
      };
    case 'pricing':
      return {
        regularPrice: '197,00',
        salePrice: '97,00',
        buttonText: 'Quero Transformar Meu Estilo',
        ctaUrl: 'https://pay.hotmart.com/',
        urgencyText: 'Oferta por tempo limitado!'
      };
    case 'testimonials':
      return {
        title: 'O Que Estão Dizendo',
        testimonials: []
      };
    case 'guarantee':
      return {
        title: 'Garantia de 7 Dias',
        text: 'Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia.',
        image: salesConfig.images.garantia
      };
    case 'cta':
      return {
        title: 'Transforme Seu Estilo Agora',
        buttonText: 'Quero Meu Guia Completo',
        ctaUrl: 'https://pay.hotmart.com/'
      };
    case 'hero-section':
      return {
        title: 'DESCUBRA SEU ESTILO',
        subtitle: 'Transforme sua imagem e expresse sua verdadeira essência',
        mainImage: salesConfig.images.mockups.todos,
        urgencyText: 'Oferta especial por tempo limitado!'
      };
    case 'style-hero':
      return {
        title: 'Descubra seu Estilo',
        subtitle: 'Transforme sua imagem e expresse sua verdadeira essência',
        description: 'Conheça as cores, modelagens e combinações que valorizam sua beleza natural',
        mainImage: salesConfig.images.mockups.todos,
        styleType: 'Natural',
        style: {}
      };
    case 'offer':
      return {
        title: 'Transforme Seu Visual',
        subtitle: 'Descubra o poder de um estilo autêntico',
        price: '97',
        regularPrice: '197',
        ctaText: 'Quero Transformar Meu Estilo',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        productImage: salesConfig.images.mockups.todos,
        urgencyText: 'Promoção acaba em breve!',
        features: [
          'Descubra seu estilo único e autêntico',
          'Aprenda a criar looks impactantes',
          'Aumente sua autoestima e confiança',
          'Economize tempo e dinheiro'
        ],
        bonuses: [
          'Guia de Visagismo Digital',
          'Cartela de Cores Personalizada',
          'Acesso ao Grupo VIP'
        ],
        style: {}
      };
    case 'products':
      return {
        title: 'Receba agora seu Guia Completo:',
        images: [
          {
            url: salesConfig.images.mockups.guiaEstilo,
            alt: 'Guia de Estilo - Edição Digital'
          },
          {
            url: salesConfig.images.mockups.todos,
            alt: 'Todos os produtos e bônus exclusivos'
          },
          {
            url: salesConfig.images.mockups.pecasChave,
            alt: 'Acesso via Celular e Tablet'
          }
        ]
      };
    case 'style-result':
      return {
        description: 'Descrição do estilo principal...',
        customImage: '',
        showSecondaryStyles: true
      };
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Secundários',
        description: 'Você também tem influências de outros estilos em sua personalidade.'
      };
    case 'mentor':
      return {
        name: 'Gisele Galvão',
        image: salesConfig.images.gisele,
        title: 'Consultora de Imagem e Estilo',
        bio: 'Especialista em coloração pessoal com Certificação internacional. Há mais de 5 anos ajudando mulheres a expressarem sua verdadeira essência através do estilo.'
      };
    default:
      return {};
  }
};
