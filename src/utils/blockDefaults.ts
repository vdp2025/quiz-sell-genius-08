
import { BlockType, EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu Resultado Exclusivo',
        subtitle: 'Descubra seu estilo pessoal e como aproveitá-lo ao máximo'
      };
    
    case 'hero':
      return {
        title: 'Descubra Seu Estilo',
        subtitle: 'Transforme seu visual com nosso guia personalizado',
        imageUrl: ''
      };
      
    case 'styleResult':
      return {
        title: 'Seu Estilo Principal',
        description: 'Conheça as características do seu estilo predominante'
      };
      
    case 'secondaryStyles':
      return {
        title: 'Seus Estilos Secundários',
        description: 'Estes estilos complementam seu estilo principal'
      };
      
    case 'benefitsList':
      return {
        title: 'Benefícios do Seu Guia de Estilo',
        items: [
          'Conheça as cores que mais combinam com você',
          'Descubra os cortes e modelagens ideais para seu corpo',
          'Aprenda a criar looks harmoniosos com seu estilo pessoal',
          'Economize tempo e dinheiro com escolhas certeiras'
        ]
      };
      
    case 'testimonials':
      return {
        title: 'O Que Nossas Clientes Dizem',
        testimonials: []
      };
      
    case 'pricing':
      return {
        title: 'Invista no Seu Estilo',
        price: '197',
        regularPrice: '397',
        ctaText: 'Quero Meu Guia de Estilo',
        ctaUrl: '#checkout'
      };
      
    case 'guarantee':
      return {
        title: 'Garantia de Satisfação',
        text: 'Se você não ficar satisfeita com seu guia de estilo, devolvemos seu dinheiro em até 7 dias.',
        days: 7
      };
      
    case 'callToAction':
      return {
        title: 'Transforme Seu Guarda-Roupa Agora',
        subtitle: 'Dê o primeiro passo para um visual que realmente expressa quem você é',
        ctaText: 'Quero Meu Guia de Estilo',
        ctaUrl: '#checkout'
      };
      
    case 'authorInfo':
      return {
        title: 'Sobre a Especialista',
        text: 'Consultora de imagem com mais de 10 anos de experiência ajudando mulheres a encontrarem seu estilo pessoal.',
        imageUrl: ''
      };
      
    // Legacy/editor specific block types
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo que complementa o título principal'
      };
      
    case 'text':
      return {
        text: 'Digite aqui o texto do seu conteúdo. Este é um parágrafo de exemplo que você pode editar conforme necessário.'
      };
      
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem'
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
      
    case 'cta':
    case 'callToAction':
      return {
        title: 'Chamada para Ação',
        subtitle: 'Texto complementar que incentiva a ação',
        ctaText: 'Clique Aqui',
        ctaUrl: '#action'
      };
      
    case 'hero-section':
    case 'hero':
      return {
        title: 'Título da Seção Hero',
        subtitle: 'Subtítulo da seção hero que complementa o título principal',
        imageUrl: ''
      };
      
    case 'bonus-carousel':
      return {
        title: 'Bônus Exclusivos',
        items: [
          { title: 'Bônus 1', description: 'Descrição do bônus 1', imageUrl: '' },
          { title: 'Bônus 2', description: 'Descrição do bônus 2', imageUrl: '' }
        ]
      };
      
    case 'products':
      return {
        title: 'Produtos Recomendados',
        products: []
      };
      
    case 'style-result':
    case 'styleResult':
      return {
        title: 'Seu Estilo Principal',
        description: 'Conheça as características do seu estilo predominante'
      };
      
    case 'secondary-styles':
    case 'secondaryStyles':
      return {
        title: 'Seus Estilos Secundários',
        description: 'Estes estilos complementam seu estilo principal'
      };
      
    default:
      return {};
  }
};
