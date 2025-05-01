
import { OfferSection } from '@/types/resultPageConfig';

export const createOfferConfig = (): OfferSection => ({
  hero: {
    visible: true,
    content: {
      title: "Conhecimento é clareza.",
      subtitle: "E clareza muda o jeito que você se vê, se escolhe, se posiciona.",
      description: `
      Mas é na ação que a verdadeira transformação acontece.
      É quando você aplica o que aprendeu… que o espelho começa a contar uma nova história.

      Não é sobre mudar quem você é.
      É sobre finalmente Vestir-se de Você.

      E pra isso, eu preparei o caminho completo.
      Simples. Prático. Estratégico.
      Pra você transformar estilo em presença.
      E imagem em poder.`,
      heroImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp",
      heroImage2: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
    },
    style: {
      backgroundColor: '#fffaf7',
      padding: '40px 20px',
      borderRadius: '8px'
    }
  },
  products: {
    visible: true,
    content: {
      title: "📘 O Guia de Estilo e Imagem + Bônus Exclusivos",
      subtitle: "Criado para mulheres que querem muito mais do que 'saber seu estilo'.",
      description: "Esse guia é pra quem está pronta pra viver seu estilo na prática — com consciência, direção e autenticidade.",
      benefitsList: [
        "Como montar looks com intenção (e não no improviso)",
        "Como usar suas cores, modelagens e tecidos a seu favor",
        "Como alinhar sua imagem com seus valores e objetivos",
        "Como parar de comprar por impulso e montar um guarda-roupa funcional"
      ],
      productImages: [
        {
          url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp",
          alt: "Guia de Estilo - 3 Revistas"
        },
        {
          url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp",
          alt: "Todos os produtos e bônus"
        },
        {
          url: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp",
          alt: "Mockup celular peças-chave"
        }
      ]
    },
    style: {
      padding: '20px'
    }
  },
  pricing: createPricingConfig(),
  benefits: createBenefitsConfig(),
  testimonials: createTestimonialsConfig(),
  guarantee: createGuaranteeConfig()
});

const createPricingConfig = () => ({
  visible: true,
  content: {
    price: "49,00",
    regularPrice: "185,00",
    ctaText: "QUERO TER ACESSO AGORA",
    ctaUrl: "https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912",
    installments: "ou 3x de R$ 16,33",
    urgencyText: "Oferta especial por tempo limitado",
    table: [
      { item: "Guias de Estilo e Imagem", value: "R$ 69,00" },
      { item: "Visagismo Facial Estratégico", value: "R$ 37,00" },
      { item: "Peças-Chave do Guarda-Roupa de Sucesso", value: "R$ 79,00" },
      { item: "Total real do conteúdo", value: "R$ 185,00" }
    ]
  },
  style: {
    padding: '20px'
  }
});

const createBenefitsConfig = () => ({
  visible: true,
  content: {
    title: "O que você vai transformar com esse material",
    items: [
      {
        title: "Peças que revelam sua essência",
        description: "Descobrir as roupas e acessórios que comunicam quem você realmente é, valorizando seu corpo e sua personalidade."
      },
      {
        title: "Cores e estampas em harmonia",
        description: "Usar cores e estampas que favorecem sua imagem, criando combinações que valorizam sua beleza natural."
      }
    ]
  },
  style: {
    padding: '20px'
  }
});

const createTestimonialsConfig = () => ({
  visible: true,
  content: {
    title: "Transformações reais de quem já aplicou esse conhecimento",
    items: [
      {
        name: "Mariangela",
        role: "Engenheira",
        text: "Antes, a roupa me vestia. Hoje, eu me visto de propósito. A consultoria me fez dar vida à mulher que sempre existiu em mim."
      },
      {
        name: "Patrícia Paranhos",
        role: "Advogada",
        text: "Aprendi a me valorizar e a dar valor para a imagem que transmito. As pessoas começaram a me olhar diferente — porque eu estava diferente."
      },
      {
        name: "Sônia Spier",
        role: "Terapeuta",
        text: "A Gisele me ensinou a entender o que comunico com as roupas. Hoje compro com consciência, estilo e propósito."
      }
    ],
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp"
  },
  style: {
    padding: '20px'
  }
});

const createGuaranteeConfig = () => ({
  visible: true,
  content: {
    title: "Garantia de 7 dias",
    text: "Você tem uma semana para acessar, aplicar e sentir. Se não fizer sentido pra você, devolvemos 100% do valor.",
    subtext: "Sem perguntas. Sem burocracia. Apenas respeito pela sua decisão.",
    image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
  },
  style: {
    padding: '20px'
  }
});
