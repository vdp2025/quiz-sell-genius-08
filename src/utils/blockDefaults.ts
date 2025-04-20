
import { EditableContent } from '@/types/editor';

export const getDefaultContentForType = (type: string): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu estilo foi revelado',
        subtitle: 'Descubra como aplicar esse conhecimento no seu dia a dia',
        style: {
          textAlign: 'center',
          padding: '20px'
        }
      };
    
    case 'headline':
      return {
        title: 'Título da seção',
        subtitle: 'Subtítulo ou descrição breve',
        style: {
          textAlign: 'center',
          fontSize: '24px',
          color: '#432818'
        }
      };
      
    case 'text':
      return {
        text: 'Adicione seu texto aqui. Este é um parágrafo de exemplo que pode ser editado conforme necessário.',
        style: {
          fontSize: '16px',
          color: '#1A1818',
          lineHeight: '1.6'
        }
      };
      
    case 'image':
      return {
        imageUrl: '',
        imageAlt: 'Imagem descritiva',
        style: {
          width: '100%',
          borderRadius: '8px'
        }
      };
      
    case 'benefits':
      return {
        title: 'Benefícios',
        items: [
          'Benefício 1',
          'Benefício 2',
          'Benefício 3',
          'Benefício 4'
        ],
        style: {
          backgroundColor: '#fffaf7',
          padding: '20px',
          borderRadius: '8px'
        }
      };
      
    case 'pricing':
      return {
        regularPrice: '175,00',
        salePrice: '39,00',
        buttonText: 'Comprar agora',
        ctaUrl: '#',
        urgencyText: 'Oferta por tempo limitado!',
        style: {
          backgroundColor: '#fffaf7',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }
      };
      
    case 'guarantee':
      return {
        title: 'Garantia de 7 dias',
        text: 'Se você não ficar satisfeito, devolvemos seu dinheiro integralmente em até 7 dias, sem burocracia.',
        image: '',
        style: {
          backgroundColor: '#ffefec',
          padding: '20px',
          borderRadius: '8px',
          textAlign: 'center'
        }
      };
      
    case 'hero-section':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        heroImage: '',
        heroImage2: '',
        style: {
          backgroundColor: '#fffaf7',
          padding: '40px 20px',
          borderRadius: '8px'
        }
      };
      
    case 'products':
      return {
        title: 'O que você vai receber:',
        images: [
          {
            url: '',
            alt: 'Produto 1'
          },
          {
            url: '',
            alt: 'Produto 2'
          }
        ],
        style: {
          backgroundColor: '#fffaf7',
          padding: '20px',
          borderRadius: '8px'
        }
      };
      
    case 'cta':
      return {
        buttonText: 'Clique Aqui',
        ctaUrl: '#',
        style: {
          backgroundColor: '#B89B7A',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }
      };
      
    default:
      return {
        title: 'Novo componente',
        description: 'Descrição do componente',
        style: {
          padding: '20px'
        }
      };
  }
};
