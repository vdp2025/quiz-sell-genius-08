
import { ResultPageConfig } from '@/types/resultPageConfig';

export const defaultTemplate: ResultPageConfig = {
  styleType: "Natural",
  header: {
    visible: true,
    content: {
      title: "Descubra seu Estilo Único",
      subtitle: "Veja como expressar sua verdadeira essência através da moda"
    },
    style: {
      textAlign: "center",
      padding: "2rem",
      backgroundColor: "#fffaf7"
    }
  },
  mainContent: {
    visible: true,
    content: {
      description: "Aprenda a valorizar sua beleza natural com escolhas que combinam com você"
    },
    style: {
      padding: "2rem",
      backgroundColor: "#fff",
      borderRadius: "8px"
    }
  },
  secondaryStyles: {
    visible: true,
    content: {},
    style: {
      margin: "2rem 0 0 0"
    }
  },
  offer: {
    hero: {
      visible: true,
      content: {
        title: "Transforme seu Guarda-Roupa",
        subtitle: "Guia completo para vestir seu estilo com confiança",
        price: "39,90",
        regularPrice: "197,00",
        ctaText: "Quero Meu Guia Personalizado",
        ctaUrl: "#"
      },
      style: {
        backgroundColor: "#fffaf7",
        padding: "3rem",
        borderRadius: "8px",
        textAlign: "center"
      }
    },
    pricing: {
      visible: true,
      content: {
        price: "39,90",
        regularPrice: "197,00",
        ctaText: "Comprar Agora",
        ctaUrl: "#",
        urgencyText: "Oferta por tempo limitado!"
      },
      style: {
        padding: "2rem",
        backgroundColor: "#fffaf7",
        borderRadius: "8px",
        textAlign: "center"
      }
    },
    products: {
      visible: true,
      content: {},
      style: {}
    },
    benefits: {
      visible: true,
      content: {},
      style: {}
    },
    testimonials: {
      visible: true,
      content: {},
      style: {}
    },
    guarantee: {
      visible: true,
      content: {},
      style: {}
    }
  },
  globalStyles: {
    primaryColor: "#B89B7A",
    secondaryColor: "#432818",
    textColor: "#1A1818",
    backgroundColor: "#fffaf7",
    fontFamily: "Playfair Display"
  }
};
