
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
    image: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
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
    image: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
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
    image: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
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
    image: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
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
    image: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
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
    image: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
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
    image: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
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
    image: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png',
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
