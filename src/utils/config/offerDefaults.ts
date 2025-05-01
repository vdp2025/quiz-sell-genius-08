
import { OfferSection } from '@/types/resultPageConfig';

export const createOfferConfig = (): OfferSection => ({
  visible: true,
  hero: {
    visible: true,
    content: {
      title: "VOCÊ DESCOBRIU SEU ESTILO",
      subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
      price: "39,00",
      regularPrice: "175,00",
      ctaText: "Quero meu Guia + Bônus por R$39,00",
      ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
      heroImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
      heroImage2: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"
    }
  },
  benefits: {
    visible: true,
    content: {
      items: [
        {
          title: "Guia de Estilo Personalizado",
          description: "Descubra as peças, cores e estilos que valorizam sua personalidade e tipo físico."
        },
        {
          title: "Consultoria de Guarda-Roupa",
          description: "Aprenda a criar looks incríveis com as peças que você já possui."
        },
        {
          title: "Acesso Vitalício",
          description: "Atualizações e conteúdos adicionais sem custos extras."
        }
      ]
    }
  },
  testimonials: {
    visible: true,
    content: {
      items: [
        {
          name: "Maria Silva",
          role: "Cliente desde 2022",
          testimonialText: "Este guia de estilo mudou completamente a forma como me visto. Agora tenho confiança para escolher roupas que realmente combinam com minha personalidade.",
          rating: 5
        },
        {
          name: "Juliana Mendes",
          role: "Cliente desde 2023",
          testimonialText: "Investir neste guia foi a melhor decisão que tomei para minha autoestima. Economizei dinheiro parando de comprar roupas que não me valorizavam.",
          rating: 5
        }
      ]
    }
  },
  guarantee: {
    visible: true,
    content: {
      title: "Garantia de 7 dias",
      text: "Se você não ficar 100% satisfeita com o conteúdo nos primeiros 7 dias, devolvemos seu dinheiro integralmente, sem burocracia."
    }
  }
});
