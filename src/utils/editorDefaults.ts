
import { BlockType, EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição breve'
      };
    case 'text':
      return {
        text: 'Digite seu texto aqui. Este é um parágrafo de exemplo que pode ser editado conforme necessário.'
      };
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Descrição da imagem',
        caption: 'Legenda da imagem'
      };
    case 'pricing':
      return {
        title: 'Preço Especial',
        price: 'R$ 197',
        regularPrice: 'R$ 297',
        ctaText: 'Comprar Agora',
        ctaUrl: '#comprar',
        description: 'Oferta por tempo limitado'
      };
    case 'benefits':
      return {
        title: 'Benefícios Principais',
        benefits: [
          'Acesso completo ao guia de estilo',
          'Consultoria personalizada',
          'Atualizações gratuitas'
        ]
      };
    case 'testimonials':
      return {
        title: 'O Que Nossos Clientes Dizem',
        testimonials: []
      };
    case 'testimonial-card':
      return {
        name: 'Maria Silva',
        role: 'Cliente desde 2022',
        testimonialText: 'Este guia de estilo mudou completamente a forma como me visto. Agora tenho confiança para escolher roupas que realmente combinam com minha personalidade.',
        rating: 5
      };
    case 'cta':
      return {
        title: 'Pronto para Transformar seu Estilo?',
        subtitle: 'Comece agora e receba acesso imediato',
        ctaText: 'Quero Meu Guia de Estilo',
        ctaUrl: '#comprar'
      };
    case 'guarantee':
      return {
        title: 'Garantia de 30 Dias',
        description: 'Satisfação garantida ou seu dinheiro de volta. Sem perguntas.'
      };
    case 'countdown-timer':
      return {
        title: 'Oferta por Tempo Limitado',
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        text: 'Aproveite antes que acabe!'
      };
    case 'feature-comparison':
      return {
        title: 'Comparação de Recursos',
        basicPlanName: 'Plano Básico',
        premiumPlanName: 'Plano Premium',
        features: [
          { name: "Análise de Estilo", included: true, premium: true },
          { name: "Consultoria Básica", included: true, premium: true },
          { name: "Guia de Cores", included: false, premium: true },
          { name: "Orientação de Tecidos", included: false, premium: true }
        ]
      };
    case 'style-result':
      return {
        title: 'Seu Estilo Principal',
        description: 'Baseado nas suas respostas, identificamos seu estilo predominante.'
      };
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Complementares',
        description: 'Além do seu estilo principal, estes estilos também combinam com você.'
      };
    // Default for other types
    default:
      return {};
  }
};

export const getDefaultGlobalStyles = (styleCategory: string) => {
  switch (styleCategory) {
    case 'Elegante':
      return {
        backgroundColor: '#F9F5F1',
        textColor: '#432818',
        primaryColor: '#B89B7A',
        secondaryColor: '#8F7A6A',
        fontFamily: 'Playfair Display, serif'
      };
    case 'Moderno':
      return {
        backgroundColor: '#F9FAFB',
        textColor: '#1F2937',
        primaryColor: '#3B82F6',
        secondaryColor: '#6366F1',
        fontFamily: 'Inter, sans-serif'
      };
    case 'Casual':
      return {
        backgroundColor: '#FFFBF5',
        textColor: '#334155',
        primaryColor: '#F97316',
        secondaryColor: '#FBBF24',
        fontFamily: 'Poppins, sans-serif'
      };
    case 'Romântico':
      return {
        backgroundColor: '#FDF5F6',
        textColor: '#50282E',
        primaryColor: '#EC4899',
        secondaryColor: '#F472B6',
        fontFamily: 'Montserrat, sans-serif'
      };
    case 'Criativo':
      return {
        backgroundColor: '#F5F3FF',
        textColor: '#4C1D95',
        primaryColor: '#8B5CF6',
        secondaryColor: '#A78BFA',
        fontFamily: 'Nunito, sans-serif'
      };
    default:
      return {
        backgroundColor: '#FFFFFF',
        textColor: '#333333',
        primaryColor: '#3E67B1',
        secondaryColor: '#6B7280',
        fontFamily: 'system-ui, sans-serif'
      };
  }
};
