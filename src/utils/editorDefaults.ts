
import { EditableContent, EditorConfig } from "@/types/editor";

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'Seu título aqui',
        subtitle: 'Subtítulo opcional',
        style: {
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#432818',
          margin: '1rem 0'
        }
      };
    case 'text':
      return {
        text: 'Digite seu texto aqui. Este é um parágrafo de exemplo que você pode editar.',
        style: {
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#3A3A3A'
        }
      };
    case 'image':
      return {
        imageUrl: 'https://placehold.co/600x400/png',
        imageAlt: 'Descrição da imagem',
        caption: 'Legenda da imagem',
        style: {
          width: '100%',
          borderRadius: '0.5rem'
        }
      };
    case 'header':
      return {
        title: 'Cabeçalho da Página',
        logo: '',
        style: {
          backgroundColor: '#FAF9F7',
          padding: '1rem',
          textAlign: 'center'
        }
      };
    case 'hero-section':
      return {
        title: 'Seu Resultado de Estilo',
        subtitle: 'Descubra como expressar sua personalidade através da moda',
        imageUrl: 'https://placehold.co/800x600/png',
        style: {
          backgroundColor: '#FAF9F7',
          padding: '2rem'
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
          backgroundColor: '#FFFFFF',
          padding: '2rem'
        }
      };
    case 'testimonials':
      return {
        title: 'O que nossos clientes dizem',
        items: [
          { name: 'Cliente 1', text: 'Depoimento do cliente 1', imageUrl: '' },
          { name: 'Cliente 2', text: 'Depoimento do cliente 2', imageUrl: '' }
        ],
        style: {
          backgroundColor: '#FAF9F7',
          padding: '2rem'
        }
      };
    case 'pricing':
      return {
        title: 'Adquira agora',
        price: 'R$ 97,00',
        regularPrice: 'R$ 197,00',
        buttonText: 'Comprar agora',
        buttonUrl: '#',
        style: {
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          textAlign: 'center'
        }
      };
    case 'guarantee':
      return {
        title: 'Garantia de Satisfação',
        text: 'Se você não ficar satisfeito, devolvemos o seu dinheiro em até 7 dias.',
        imageUrl: 'https://placehold.co/200x200/png',
        style: {
          backgroundColor: '#FAF9F7',
          padding: '2rem',
          textAlign: 'center'
        }
      };
    case 'cta':
      return {
        title: 'Faça sua transformação de estilo agora',
        buttonText: 'Começar',
        buttonUrl: '#',
        style: {
          backgroundColor: '#B89B7A',
          color: '#FFFFFF',
          padding: '2rem',
          textAlign: 'center'
        }
      };
    case 'style-result':
      return {
        title: 'Seu Estilo Principal',
        description: 'Descrição personalizada do estilo predominante.',
        customImage: '',
        style: {
          backgroundColor: '#FAF9F7',
          padding: '2rem',
          textAlign: 'center'
        }
      };
    case 'secondary-styles':
      return {
        title: 'Seus Estilos Secundários',
        description: 'Estes são os estilos que complementam seu estilo principal.',
        style: {
          backgroundColor: '#FFFFFF',
          padding: '2rem'
        }
      };
    case 'spacer':
      return {
        height: '2rem',
        style: {
          margin: '1rem 0'
        }
      };
    case 'two-column':
      return {
        leftContent: 'Conteúdo da coluna da esquerda',
        rightContent: 'Conteúdo da coluna da direita',
        style: {
          gap: '1rem'
        }
      };
    default:
      return {
        text: 'Bloco personalizado',
        style: {}
      };
  }
};

// Adicionando a configuração padrão do editor
export const defaultConfig: EditorConfig = {
  blocks: [],
  globalStyles: {
    fontFamily: 'Inter, sans-serif',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    headingColor: '#432818',
    accentColor: '#B89B7A',
    fontSize: '16px',
    borderRadius: '0.5rem',
    padding: '1rem'
  }
};
