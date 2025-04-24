export interface SalesPageBenefitItem {
  title: string;
  description: string;
}

export interface SalesPageTestimonial {
  text: string;
  name: string;
  role: string;
}

export interface SalesPageConfig {
  header: {
    title?: string;
    subtitle?: string;
    logo?: string;
    logoAlt?: string;
    logoHeight?: number;
  };
  hero: {
    title?: string;
    subtitle?: string;
    image?: string;
    imageAlt?: string;
  };
  product: {
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    regularPrice?: string;
    salePrice?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  benefits: {
    title?: string;
    items?: SalesPageBenefitItem[];
  };
  bonus: {
    bonusImage?: string;
    bonusImageAlt?: string;
    mentorImage?: string;
    mentorImageAlt?: string;
  };
  testimonials: {
    title?: string;
    items?: SalesPageTestimonial[];
  };
  guarantee: {
    title?: string;
    text?: string;
    image?: string;
    imageAlt?: string;
  };
  style: {
    backgroundColor?: string;
    cardBackgroundColor?: string;
    primaryColor?: string;
    accentColor?: string;
    textColor?: string;
    testimonialBgColor?: string;
    iconColor?: string;
    iconBgColor?: string;
  };
}

export const defaultSalesPageConfig: SalesPageConfig = {
  header: {
    title: "Descubra seu Estilo Único",
    subtitle: "E transforme sua imagem com consciência e propósito",
    logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
    logoAlt: "Logo Gisele Galvão",
    logoHeight: 56
  },
  hero: {
    title: "Como seria sua vida com um guarda-roupa que realmente reflete quem você é?",
    subtitle: "Descubra como construir seu estilo de forma autêntica e prática",
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911666/C%C3%B3pia_de_Template_Dossi%C3%AA_Completo_2024_15_-_Copia_ssrhu3.webp",
    imageAlt: "Guia de Estilo"
  },
  product: {
    title: "Guia de Estilo e Imagem + Bônus Exclusivos",
    description: "Criado para mulheres que querem muito mais do que apenas \"saber seu estilo\"",
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp",
    imageAlt: "Produto e bônus mockup",
    regularPrice: "175,00",
    salePrice: "39,00",
    ctaText: "Quero meu Guia + Bônus por R$39,00",
    ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
  },
  benefits: {
    title: "O que você vai transformar com esse material:",
    items: [
      {
        title: "Peças que revelam sua essência",
        description: "Descobrir as roupas e acessórios que comunicam quem você realmente é, valorizando seu corpo e sua personalidade."
      },
      {
        title: "Compras com propósito",
        description: "Parar de acumular peças que não combinam e investir no que faz sentido para o seu momento."
      },
      {
        title: "Versatilidade sem esforço",
        description: "Criar combinações que expressam quem você é com menos esforço e mais impacto."
      },
      {
        title: "Autoconfiança visível",
        description: "Sentir segurança no que veste porque cada escolha tem harmonia com quem você é."
      }
    ]
  },
  bonus: {
    bonusImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp",
    bonusImageAlt: "Mockup celular peças-chave por dentro",
    mentorImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp",
    mentorImageAlt: "Foto Gisele Galvão"
  },
  testimonials: {
    title: "O que dizem quem já transformou seu estilo:",
    items: [
      {
        text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim.",
        name: "Mariangela",
        role: "Engenheira"
      },
      {
        text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente.",
        name: "Patrícia Paranhos",
        role: "Advogada"
      },
      {
        text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito.",
        name: "Sônia Spier",
        role: "Terapeuta"
      }
    ]
  },
  guarantee: {
    title: "Garantia de 7 dias",
    text: "Você tem uma semana para acessar o conteúdo completo, testar e aplicar. Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia.",
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp",
    imageAlt: "Garantia de 7 dias"
  },
  style: {
    backgroundColor: "#fffaf7",
    cardBackgroundColor: "white",
    primaryColor: "#432818",
    accentColor: "#aa6b5d",
    textColor: "#6b605a",
    testimonialBgColor: "#fef5f2",
    iconColor: "#aa6b5d",
    iconBgColor: "#fce8e3"
  }
};
