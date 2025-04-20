
import { ResultPageConfig } from '@/types/resultPageConfig';

export const defaultResultTemplate: ResultPageConfig = {
  styleType: '',
  header: {
    visible: true,
    content: {
      logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
      logoAlt: 'Logo Gisele Galvão',
      title: 'Seu Estilo Predominante é:'
    },
    style: {
      padding: '20px',
      textAlign: 'center'
    }
  },
  mainContent: {
    visible: true,
    content: {
      introText: `Você já descobriu seu Estilo e isso é muito poderoso. 
      Conhecimento é clareza. E clareza muda o jeito que você se vê, se escolhe, se posiciona.`,
      benefits: [
        'Como montar looks com intenção (e não no improviso)',
        'Como usar suas cores, modelagens e tecidos a seu favor',
        'Como alinhar sua imagem com seus valores e objetivos',
        'Como parar de comprar por impulso e montar um guarda-roupa funcional'
      ],
      tabletImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp',
      styleImages: {
        'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
        'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
        'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
        'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
        'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
        'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
        'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
        'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
      }
    }
  },
  offer: {
    hero: {
      visible: true,
      content: {
        title: '📘 O Guia de Estilo e Imagem + Bônus Exclusivos',
        subtitle: 'Criado para mulheres que querem muito mais do que "saber seu estilo".',
        description: 'Esse guia é pra quem está pronta pra viver seu estilo na prática — com consciência, direção e autenticidade.',
        heroImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp',
        heroImage2: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_14_oxegnd.webp'
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
    products: {
      visible: true,
      content: {
        bonusItems: [
          {
            title: 'Peças-chave do Guarda-Roupa de Sucesso',
            description: 'Itens essenciais que descomplicam a rotina e valorizam o seu estilo pessoal.',
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp'
          },
          {
            title: 'Mini Guia de Visagismo Facial',
            description: 'Para alinhar seu rosto, cabelo e maquiagem com a sua identidade visual.',
            image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp'
          }
        ],
        allProductsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp'
      }
    },
    testimonials: {
      visible: true,
      content: {
        testimonials: [
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
        ],
        testimonialsImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/Mockups_p%C3%A1gina_de_venda_Guia_de_Estilo_1_vostj4.webp'
      }
    },
    guarantee: {
      visible: true,
      content: {
        title: '🛡️ Garantia de 7 dias',
        text: 'Você tem uma semana para acessar o conteúdo completo, testar e aplicar. Se não fizer sentido pra você, devolvemos 100% do seu investimento. Sem burocracia.',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp'
      }
    },
    pricing: {
      visible: true,
      content: {
        regularPrice: '175,00',
        salePrice: '39,00',
        ctaText: 'Quero meu Guia + Bônus por R$39,00',
        ctaUrl: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
        urgencyText: '⏳ Oferta válida apenas nesta página'
      }
    }
  },
  mentor: {
    visible: true,
    content: {
      title: 'Sobre sua mentora',
      name: 'Gisele Galvão',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp',
      beforeAfterImage: 'https://res.cloudinary.com/dzt2fe3ij/image/upload/v1745104587/Captura_de_tela_2025-03-31_034319_peuoc8.webp',
      stylesImage: 'https://res.cloudinary.com/dzt2fe3ij/image/upload/e_sharpen/v1745104620/Sem_nome_1000_x_1000_px_1280_x_720_px_itv2ri.webp',
      bio: [
        'Consultora de Imagem e Estilo, Personal Branding, Estrategista de Marca pessoal e Especialista em coloração pessoal com Certificação internacional.',
        'Advogada de formação. Mãe da Victória, esposa do Fabrício.',
        'Apaixonada pela vida, pelos detalhes, viagens e tudo que me proporcione crescer como ser humano. Colérica, virginiana, paciente, pacificadora e muito empata.'
      ]
    }
  },
  globalStyles: {
    primaryColor: '#B89B7A',
    secondaryColor: '#432818',
    backgroundColor: '#fffaf7',
    textColor: '#432818',
    fontFamily: 'Inter, sans-serif'
  }
};
