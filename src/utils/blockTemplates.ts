
import { EditableContent, Block } from '@/types/editor';
import { getDefaultContentForType } from './blockDefaults';

export interface BlockTemplate {
  id: string;
  name: string;
  type: Block['type'];
  category: 'checkout' | 'lead-generation' | 'content' | 'conversion' | 'quiz-result';
  content: EditableContent;
  preview?: string;
}

export const blockTemplates: BlockTemplate[] = [
  // Header Templates
  {
    id: 'header-logo-center',
    name: 'Logo Centralizado',
    type: 'header',
    category: 'content',
    content: {
      title: 'Olá, seu Estilo Predominante é:',
      logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
      logoAlt: 'Logo Gisele Galvão',
      style: {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: '#ffffff'
      }
    }
  },
  
  // Headline Templates
  {
    id: 'headline-large-center',
    name: 'Título Grande Centralizado',
    type: 'headline',
    category: 'content',
    content: {
      title: 'VOCÊ DESCOBRIU SEU ESTILO',
      subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
      style: {
        textAlign: 'center',
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#432818',
        padding: '40px 20px'
      }
    }
  },
  
  // Style Result Templates
  {
    id: 'style-result-featured',
    name: 'Resultado em Destaque',
    type: 'style-result',
    category: 'quiz-result',
    content: {
      title: 'Seu estilo predominante é {{primaryStyle}}',
      description: 'Você possui características únicas que refletem sua personalidade através do seu estilo pessoal.',
      style: {
        padding: '30px',
        backgroundColor: '#FAF9F7',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  
  // Pricing Templates
  {
    id: 'pricing-highlight',
    name: 'Preço em Destaque',
    type: 'pricing',
    category: 'checkout',
    content: {
      regularPrice: '175,00',
      salePrice: '39,00',
      buttonText: 'Quero Transformar Meu Estilo',
      ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
      urgencyText: 'Oferta por tempo limitado!',
      style: {
        padding: '40px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
      }
    }
  },
  
  // Benefits Templates
  {
    id: 'benefits-columns',
    name: 'Benefícios em Colunas',
    type: 'benefits',
    category: 'content',
    content: {
      title: 'O que você vai aprender:',
      items: [
        'Aplicar seus estilos com autenticidade',
        'Montar looks práticos para o dia a dia, trabalho e eventos',
        'Usar cores e modelagens que valorizam quem você é',
        'Parar de errar nas compras e economizar tempo'
      ],
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        padding: '30px',
        backgroundColor: '#FAF9F7'
      }
    }
  }
];
