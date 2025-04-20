import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: "VOCÊ DESCOBRIU SEU ESTILO",
        subtitle: "Agora é hora de aplicar com clareza — e se vestir de você",
        logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp",
        logoAlt: "Logo Gisele Galvão"
      },
      style: {
        textAlign: 'center',
        margin: '0 0 2rem 0'
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: getDefaultDescription(styleType),
        mainImage: getStyleImage(styleType),
        tabletImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
      },
      style: {
        padding: '20px'
      }
    },
    secondaryStyles: {
      visible: true,
      content: {},
      style: {
        padding: '20px'
      }
    },
    offer: {
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
          subtitle: "Criado para mulheres que querem muito mais do que "saber seu estilo".",
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
      pricing: {
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
      },
      benefits: {
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
      },
      testimonials: {
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
      },
      guarantee: {
        visible: true,
        content: {
          title: "Garantia de 7 dias",
          text: "Você tem uma semana para acessar, aplicar e sentir. Se não fizer sentido, devolvemos 100% do valor.",
          subtext: "Sem perguntas. Sem burocracia. Apenas respeito pela sua decisão.",
          image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
        },
        style: {
          padding: '20px'
        }
      }
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#1A1818',
      backgroundColor: '#fffaf7',
      fontFamily: 'Playfair Display'
    },
    blocks: []
  };
};

function getStyleImage(styleType: string): string {
  const styleImages = {
    'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
    'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
  };
  
  return styleImages[styleType] || styleImages['Natural'];
}

function getDefaultDescription(styleType: string): string {
  switch (styleType) {
    case 'Natural':
      return 'Você valoriza o conforto e a praticidade. seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.';
    case 'Clássico':
      return 'Você valoriza o equilíbrio e a tradição. Seu estilo é elegante e atemporal, com peças que não saem de moda.';
    case 'Contemporâneo':
      return 'Você valoriza o equilíbrio entre moda e praticidade. Seu estilo é atual e adaptativo, com peças que transitam bem entre várias ocasiões.';
    case 'Elegante':
      return 'Você valoriza a sofisticação e o requinte. Seu estilo é refinado e imponente, com peças que exalam qualidade e status.';
    case 'Romântico':
      return 'Você valoriza a delicadeza e a feminilidade. Seu estilo é suave e gracioso, com peças que transmitem leveza e romantismo.';
    case 'Sexy':
      return 'Você valoriza a sensualidade e a expressão corporal. Seu estilo é provocante e ousado, com peças que destacam suas curvas.';
    case 'Dramático':
      return 'Você valoriza o impacto visual e a originalidade. Seu estilo é marcante e poderoso, com peças estruturadas e de design diferenciado.';
    case 'Criativo':
      return 'Você valoriza a expressão artística e a liberdade. Seu estilo é único e eclético, com peças que refletem sua personalidade multifacetada.';
    default:
      return 'Seu estilo pessoal reflete sua personalidade autêntica e única.';
  }
}
