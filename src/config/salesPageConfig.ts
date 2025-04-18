
import { StyleResult } from '@/types/quiz';

export interface SalesPageConfig {
  title: string;
  subtitle: string;
  price: string;
  regularPrice: string;
  ctaText: string;
  ctaUrl: string;
  benefits: string[];
  bonuses: string[];
  guaranteeDays: number;
}

export const getSalesPageConfig = (style: StyleResult): SalesPageConfig => {
  return {
    title: "TRANSFORME SEU ESTILO",
    subtitle: `Aprenda a expressar seu estilo ${style.category} com autenticidade`,
    price: "39,00",
    regularPrice: "175,00",
    ctaText: "Quero Transformar Meu Estilo",
    ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
    benefits: [
      "Descubra como valorizar sua imagem usando seu estilo natural",
      "Aprenda a criar looks autênticos e poderosos",
      "Entenda as cores e modelagens que mais combinam com você",
      "Maximize seu guarda-roupa com peças versáteis"
    ],
    bonuses: [
      "Guia de Visagismo Facial",
      "Cartela de Cores Digital",
      "Planilha de Guarda-Roupa Cápsula",
      "Acesso ao Grupo VIP no Telegram"
    ],
    guaranteeDays: 7
  };
};
