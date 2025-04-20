
import { SectionConfig } from '@/types/resultPageConfig';

export const getDefaultOfferConfig = (): SectionConfig => {
  return {
    visible: true,
    content: {
      title: 'Guia Completo do Estilo',
      subtitle: 'Transforme seu visual com nosso guia personalizado',
      description: 'Um guia exclusivo para você aproveitar ao máximo seu estilo pessoal',
      price: '39,00',
      regularPrice: '175,00',
      ctaText: 'Quero meu Guia + Bônus',
      ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
      heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp',
      heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg'
    },
    style: {
      backgroundColor: '#f0e6dd',
      textColor: '#4a3828',
      padding: '60px 20px',
      textAlign: 'center'
    }
  };
};
