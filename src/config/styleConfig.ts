// quiz-sell-genius/src/config/styleConfig.ts
export interface StyleConfig {
  [key: string]: {
    image: string;
    description: string;
    characteristics: string[];
    colors: string[];
  };
}

export const styleConfig: StyleConfig = {
  'Natural': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    description: 'Seu estilo Natural valoriza o conforto e a praticidade. Você prefere roupas que não restringem seus movimentos e tecidos com toque agradável. Em seu guarda-roupa predominam peças básicas e versáteis, em uma paleta de cores neutras e terrosas.',
    characteristics: [
      'Valoriza conforto e praticidade',
      'Prefere tecidos macios e naturais',
      'Favorece formas simples e relaxadas',
      'Gosta de uma aparência "sem esforço"'
    ],
    colors: ['#E8DCC4', '#B6A58B', '#617560', '#3A4A3E']
  },
  'Clássico': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
    description: 'Seu estilo Clássico aprecia a tradição e a elegância atemporal. Você valoriza roupas de qualidade e cortes refinados, que permanecem relevantes independentemente das tendências da moda. Sua paleta é frequentemente composta por cores neutras e refinadas.',
    characteristics: [
      'Valoriza qualidade e atemporalidade',
      'Prefere cortes limpos e refinados',
      'Investe em peças duradouras',
      'Aprecia elegância discreta'
    ],
    colors: ['#2C3544', '#657589', '#A3B3C7', '#D7E2EA']
  },
  'Contemporâneo': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
    description: 'Seu estilo Contemporâneo combina o clássico com o moderno de maneira equilibrada. Você valoriza peças atuais, mas evita modismos passageiros. Sua abordagem é sofisticada mas acessível, com uma paleta versátil que combina tons neutros e acentos coloridos.',
    characteristics: [
      'Combina elementos clássicos e modernos',
      'Segue tendências com moderação',
      'Valoriza versatilidade e funcionalidade',
      'Mantém-se atual sem extremismos'
    ],
    colors: ['#E9E6E1', '#C4BBB3', '#76828E', '#2D3540']
  },
  'Elegante': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
    description: 'Seu estilo Elegante prioriza a sofisticação e o refinamento. Você aprecia peças com excelente caimento e acabamentos impecáveis. Sua imagem transmite poder e prestígio, com uma paleta predominante de cores ricas e profundas.',
    characteristics: [
      'Valoriza sofisticação e excelência',
      'Prefere caimentos impecáveis',
      'Investe em materiais nobres',
      'Transmite autoridade e prestígio'
    ],
    colors: ['#1C1E22', '#40434A', '#85878F', '#D3D5DA']
  },
  'Romântico': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
    description: 'Seu estilo Romântico celebra a feminilidade e a delicadeza. Você é atraída por peças com detalhes suaves como babados, laços e estampas florais. Sua paleta favorece tons pastéis e suaves que reforçam sua aura gentil e acolhedora.',
    characteristics: [
      'Valoriza feminilidade e suavidade',
      'Aprecia detalhes decorativos',
      'Prefere tecidos fluidos e delicados',
      'Favorece silhuetas que realçam a cintura'
    ],
    colors: ['#F8E7E9', '#EFC4CA', '#BB8E9A', '#8F636B']
  },
  'Sexy': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
    description: 'Seu estilo Sexy valoriza a confiança e a sensualidade. Você não tem medo de mostrar suas curvas e gosta de peças que realçam sua silhueta. Sua paleta tende a incluir cores vibrantes e dramáticas que chamam a atenção.',
    characteristics: [
      'Valoriza sensualidade e autoconfiança',
      'Prefere peças que destacam a silhueta',
      'Aprecia detalhes que chamam atenção',
      'Não teme mostrar a personalidade'
    ],
    colors: ['#1F1417', '#641F34', '#A4304E', '#DA748E']
  },
  'Dramático': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
    description: 'Seu estilo Dramático é ousado e impactante. Você aprecia peças com formas estruturadas, angulares e inovadoras. Sua abordagem é contemporânea e urbana, com uma paleta que frequentemente se baseia em contrastes marcantes e cores intensas.',
    characteristics: [
      'Valoriza impacto visual e originalidade',
      'Prefere formas estruturadas e geométricas',
      'Aprecia contrastes marcantes',
      'Adota uma estética vanguardista'
    ],
    colors: ['#171718', '#282A2D', '#5D5E63', '#ABACB0']
  },
  'Criativo': {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
    description: 'Seu estilo Criativo expressa sua individualidade e originalidade. Você adora misturar elementos inesperados e criar combinações únicas. Sua paleta é eclética e colorida, refletindo sua personalidade expressiva e seu pensamento inovador.',
    characteristics: [
      'Valoriza originalidade e expressão pessoal',
      'Combina elementos diversos e inusitados',
      'Aprecia variedade e experimentação',
      'Não segue regras convencionais'
    ],
    colors: ['#CBA5DB', '#F0D67F', '#E57D70', '#6FB2D2']
  }
};