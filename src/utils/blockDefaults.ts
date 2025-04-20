
import { EditableContent, BlockType } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Seu Resultado de Estilo',
        subtitle: 'Descubra como expressar seu estilo único'
      };
    
    case 'hero':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp'
      };
    
    case 'styleResult':
      return {
        title: 'Seu Estilo Predominante',
        description: 'Uma descrição detalhada do seu estilo principal'
      };
    
    case 'secondaryStyles':
      return {
        title: 'Seus Estilos Secundários',
        description: 'Uma análise dos seus estilos complementares'
      };
    
    case 'benefitsList':
      return {
        title: 'Benefícios do Guia',
        items: [
          'Entenda seu tipo de corpo e o que valoriza você',
          'Aprenda a criar looks autênticos e poderosos',
          'Descubra as cores que harmonizam com você',
          'Maximize seu guarda-roupa com peças versáteis'
        ]
      };
    
    case 'testimonials':
      return {
        title: 'O que Dizem As Alunas',
        testimonials: [
          {
            name: 'Mariana Silva',
            text: 'O guia de estilo mudou completamente minha relação com as roupas. Agora eu sei exatamente o que combina comigo!',
            style: 'Natural'
          }
        ]
      };
    
    case 'pricing':
      return {
        title: 'Guia de Estilo Personalizado',
        price: '39,00',
        regularPrice: '175,00',
        ctaText: 'Quero meu Guia + Bônus',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'
      };
    
    case 'guarantee':
      return {
        title: 'Garantia de Satisfação',
        text: 'Se você não ficar completamente satisfeita com o seu Guia de Estilo Personalizado, basta solicitar o reembolso em até 7 dias após a compra.',
        days: 7
      };
    
    case 'callToAction':
      return {
        title: 'Transforme seu Estilo Agora!',
        text: 'Não perca mais tempo com roupas que não combinam com você.',
        ctaText: 'Quero Transformar Meu Estilo',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912'
      };
    
    case 'authorInfo':
      return {
        title: 'Sobre a Autora',
        name: 'Gisele Galvão',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
        bio: 'Com mais de 10 anos de experiência em consultoria de imagem e estilo pessoal, ajudei centenas de mulheres a descobrirem sua verdadeira essência através das roupas.'
      };
    
    default:
      return {
        title: 'Novo Bloco',
        text: 'Conteúdo do bloco'
      };
  }
};
