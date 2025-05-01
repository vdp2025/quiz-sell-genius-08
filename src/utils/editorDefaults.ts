
import { StyleOptions } from '@/types/resultPageConfig';
import { Block, EditableContent } from '@/types/editor';

export const getDefaultGlobalStyles = (): Partial<StyleOptions> => {
  return {
    primaryColor: '#B89B7A',
    secondaryColor: '#8F7A6A',
    textColor: '#432818',
    backgroundColor: '#FAF9F7',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    borderRadius: 'medium',
    spacing: 'comfortable'
  };
};

export const getDefaultContentForType = (type: Block['type']): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo opcional aqui',
        alignment: 'center',
        style: {
          backgroundColor: '#FFFFFF',
          textColor: '#432818',
          paddingY: '16',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'text':
      return {
        text: 'Insira seu texto aqui. Este é um bloco de texto rico onde você pode adicionar conteúdo para sua página.',
        style: {
          backgroundColor: '#F9F5F1',
          textColor: '#432818',
          paddingY: '16',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'image':
      return {
        imageUrl: '',
        altText: 'Descrição da imagem',
        caption: '',
        alignment: 'center',
        style: {
          backgroundColor: 'transparent',
          paddingY: '16',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'video':
      return {
        videoUrl: '',
        title: 'Título do vídeo',
        autoplay: false,
        controls: true,
        style: {
          backgroundColor: '#F9F5F1',
          paddingY: '16',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'cta':
      return {
        title: 'Chame à ação agora!',
        buttonText: 'Clique Aqui',
        buttonUrl: '#',
        alignment: 'center',
        style: {
          backgroundColor: '#F9F5F1',
          buttonColor: '#B89B7A',
          textColor: '#432818',
          buttonTextColor: '#FFFFFF',
          paddingY: '24',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'testimonial':
      return {
        name: 'Nome do Cliente',
        role: 'Posição ou Empresa',
        testimonialText: 'Este é um depoimento de exemplo. Substitua com um depoimento real de um cliente satisfeito.',
        rating: 5,
        avatarUrl: '',
        style: {
          backgroundColor: '#FFFFFF',
          textColor: '#432818',
          accentColor: '#B89B7A',
          paddingY: '16',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'pricing':
      return {
        title: 'Consultoria de Estilo',
        price: 'R$ 997,00',
        regularPrice: 'R$ 1.997,00',
        description: 'Investimento único. Acesso vitalício.',
        features: [
          'Análise detalhada do seu estilo pessoal',
          'Guia personalizado de compras',
          'Consultoria virtual 1:1'
        ],
        ctaText: 'Adquirir Agora',
        ctaUrl: '#',
        style: {
          backgroundColor: '#FFFFFF',
          textColor: '#432818',
          accentColor: '#B89B7A',
          paddingY: '24',
          paddingX: '16',
          borderRadius: '8'
        }
      };
    
    case 'customCode':
      return {
        code: '<!-- Insira seu código HTML personalizado aqui -->'
      };
    
    default:
      return {};
  }
};
