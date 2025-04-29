import { Block, EditorConfig } from '@/types/editor';

export const getDefaultContentForType = (type: Block['type']): any => {
  switch (type) {
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição breve',
        style: {
          textAlign: 'center',
          padding: '1.5rem',
        }
      };
    
    case 'text':
      return {
        text: 'Digite seu texto aqui. Este é um exemplo de texto que pode ser editado diretamente no editor visual.',
        style: {
          padding: '1rem',
        }
      };
    
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Imagem',
        caption: '',
        style: {
          padding: '1rem',
        }
      };
    
    case 'header':
      return {
        title: 'Cabeçalho',
        subtitle: 'Subtítulo do cabeçalho',
        logo: '',
        style: {
          backgroundColor: '#fffaf7',
          padding: '1rem',
        }
      };
    
    case 'hero-section':
      return {
        headline: 'Título Principal',
        subheadline: 'Descrição ou chamada para ação',
        imageUrl: '',
        buttonText: 'Iniciar',
        buttonUrl: '#',
        style: {
          backgroundColor: '#fffaf7',
          padding: '2rem',
        }
      };
    
    case 'benefits':
      return {
        title: 'Benefícios',
        items: [
          { title: 'Benefício 1', description: 'Descrição do benefício 1' },
          { title: 'Benefício 2', description: 'Descrição do benefício 2' },
          { title: 'Benefício 3', description: 'Descrição do benefício 3' }
        ],
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'testimonials':
      return {
        title: 'O que dizem nossos clientes',
        items: [
          { name: 'Cliente 1', role: 'Função', text: 'Depoimento do cliente 1', imageUrl: '' },
          { name: 'Cliente 2', role: 'Função', text: 'Depoimento do cliente 2', imageUrl: '' }
        ],
        style: {
          padding: '1.5rem',
          backgroundColor: '#f9f6f2',
        }
      };
    
    case 'guarantee':
      return {
        title: 'Nossa Garantia',
        description: 'Descrição da garantia oferecida',
        days: '30',
        imageUrl: '',
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'cta':
      return {
        text: 'Chamada para Ação',
        buttonText: 'Clique Aqui',
        buttonUrl: '#',
        style: {
          padding: '1.5rem',
          textAlign: 'center',
          backgroundColor: '#f3e8e6',
        }
      };
    
    case 'style-result':
      return {
        showTitle: true,
        showDescription: true,
        showPercentage: true,
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'secondary-styles':
      return {
        showTitle: true,
        maxStyles: 3,
        showPercentages: true,
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'bonus':
      return {
        title: 'Bônus Exclusivo',
        description: 'Descrição do bônus oferecido',
        imageUrl: '',
        style: {
          padding: '1.5rem',
          backgroundColor: '#f9f6f2',
        }
      };
    
    case 'bonus-carousel':
      return {
        title: 'Bônus Exclusivos',
        items: [
          { title: 'Bônus 1', description: 'Descrição do bônus 1', imageUrl: '' },
          { title: 'Bônus 2', description: 'Descrição do bônus 2', imageUrl: '' }
        ],
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'columns':
      return {
        columns: 2,
        items: [
          { title: 'Coluna 1', content: 'Conteúdo da coluna 1' },
          { title: 'Coluna 2', content: 'Conteúdo da coluna 2' }
        ],
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'products':
      return {
        title: 'Nossos Produtos',
        items: [
          { title: 'Produto 1', description: 'Descrição do produto 1', imageUrl: '', price: '99,90' },
          { title: 'Produto 2', description: 'Descrição do produto 2', imageUrl: '', price: '149,90' }
        ],
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'spacer':
      return {
        height: '2rem',
        style: {
          backgroundColor: 'transparent',
        }
      };
    
    case 'video':
      return {
        videoUrl: '',
        title: 'Título do vídeo',
        description: 'Descrição do vídeo',
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'two-column':
      return {
        column1: {
          content: 'Conteúdo da primeira coluna'
        },
        column2: {
          content: 'Conteúdo da segunda coluna'
        },
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'icon':
      return {
        iconName: 'star',
        size: 'medium',
        color: '#B89B7A',
        style: {
          textAlign: 'center',
          padding: '1rem',
        }
      };
    
    case 'faq':
      return {
        title: 'Perguntas Frequentes',
        items: [
          { question: 'Pergunta 1', answer: 'Resposta 1' },
          { question: 'Pergunta 2', answer: 'Resposta 2' }
        ],
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'carousel':
      return {
        items: [
          { title: 'Item 1', description: 'Descrição do item 1', imageUrl: '' },
          { title: 'Item 2', description: 'Descrição do item 2', imageUrl: '' }
        ],
        style: {
          padding: '1.5rem',
        }
      };
    
    case 'custom-code':
      return {
        code: '<!-- Insira seu código personalizado aqui -->',
        style: {
          padding: '1rem',
        }
      };
    
    case 'animation-block':
      return {
        animationType: 'fade-in',
        content: 'Conteúdo animado',
        duration: 1000,
        delay: 0,
        style: {
          padding: '1rem',
        }
      };
    
    default:
      return {
        style: {
          padding: '1rem',
        }
      };
  }
};

export const defaultConfig: EditorConfig = {
  blocks: [],
  globalStyles: {
    backgroundColor: '#ffffff',
    color: '#333333',
    fontFamily: 'sans-serif'
  }
};
