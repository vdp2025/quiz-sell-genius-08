
import { ResultPageConfig } from '@/types/resultPageConfig';
import { generateId } from '@/utils/idGenerator';

export interface UnifiedSection {
  id: string;
  type: string;
  content: Record<string, any>;
  style: Record<string, any>;
  visible: boolean;
  order: number;
}

export interface UnifiedTemplate extends ResultPageConfig {
  sections: UnifiedSection[];
}

const defaultStyleProps = {
  backgroundColor: "#fffaf7",
  padding: "40px 20px",
  borderRadius: "8px",
  textAlign: "center" as const,
  fontSize: "16px",
};

export const createUnifiedTemplate = (styleType: string): UnifiedTemplate => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: "Olá, seu estilo predominante é:",
        subtitle: ""
      },
      style: {
        ...defaultStyleProps,
        margin: "0 0 2rem 0"
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: "Você valoriza o conforto e a praticidade. seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia."
      },
      style: defaultStyleProps
    },
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        ...defaultStyleProps,
        margin: "1.5rem 0 0 0"
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: "Você descobriu seu estilo",
          subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
          price: "39,00",
          regularPrice: "175,00",
          ctaText: "Quero meu guia + bônus",
          ctaUrl: "https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912"
        },
        style: {
          ...defaultStyleProps,
          margin: "2rem 0 0 0"
        }
      },
      products: {
        visible: true,
        content: {},
        style: defaultStyleProps
      },
      pricing: {
        visible: true,
        content: {
          price: "39,00",
          regularPrice: "175,00",
          ctaText: "Quero meu guia + bônus",
          ctaUrl: "https://pay.hotmart.com/w98977034c?checkoutmode=10&bid=1744967466912",
          urgencyText: "Oferta por tempo limitado!"
        },
        style: defaultStyleProps
      },
      testimonials: {
        visible: true,
        content: {},
        style: defaultStyleProps
      },
      benefits: {
        visible: true,
        content: {},
        style: defaultStyleProps
      },
      guarantee: {
        visible: true,
        content: {},
        style: defaultStyleProps
      }
    },
    globalStyles: {
      primaryColor: "#B89B7A",
      secondaryColor: "#432818",
      textColor: "#1A1818",
      backgroundColor: "#fffaf7",
      fontFamily: "Playfair Display"
    },
    sections: [
      {
        id: generateId(),
        type: "hero",
        content: {
          title: "Seu estilo foi revelado. Agora é hora da transformação.",
          subtitle: "Você acabou de dar um passo essencial: descobrir o seu estilo predominante. Mas o verdadeiro poder dessa descoberta não está no resultado em si — e sim no que você faz com ele.",
          image1: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
          image2: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
        },
        style: defaultStyleProps,
        visible: true,
        order: 0
      },
      {
        id: generateId(),
        type: "products",
        content: {
          title: "O que você vai receber:",
          productImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp"
        },
        style: defaultStyleProps,
        visible: true,
        order: 1
      }
    ]
  };
};
