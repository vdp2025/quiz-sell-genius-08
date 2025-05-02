
export const styleConfig = {
  Natural: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/Natural_jcneit.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919951/Padroes_Roupa_Estilo_Natural_b0ihjh.webp',
    description: 'O estilo Natural reflete sua personalidade autêntica e espontânea. Você valoriza o conforto e a praticidade, mas sem abrir mão do estilo. Sua postura é descontraída e você costuma demonstrar simpatia e acessibilidade. Na sua imagem, é importante que tudo pareça natural e sem muito esforço.'
  },
  Clássico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/Classico_vgv21z.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919957/Guia_de_Estilo_Cl%C3%A1ssico_kbz5nq.webp',
    description: 'O estilo Clássico reflete qualidade e elegância atemporal. Você valoriza peças bem estruturadas e de qualidade superior. Sua presença é refinada e transmite credibilidade e autoridade. Na sua imagem, você preza pela tradição e por elementos que nunca saem de moda.'
  },
  Criativo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/CRIATIVO_c9lyrs.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919952/Guia_de_Estilo_Criativo_yl8cnj.webp',
    description: 'O estilo Criativo reflete originalidade e experimentação. Você valoriza peças fora do comum e não tem medo de misturar cores, estampas e texturas. Sua presença é marcante e desperta curiosidade, pois você não segue tendências - você as cria! Na sua imagem, a expressão pessoal e a originalidade são fundamentais.'
  },
  Sexy: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/Sexy_owu6nv.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919953/Guia_de_Estilo_Sexy_tm7tj9.webp',
    description: 'O estilo Sexy reflete confiança e sensualidade. Você valoriza roupas que destacam as curvas do corpo e não tem medo de exibir a sua beleza natural. Sua presença é magnética e você costuma atrair olhares por onde passa. Na sua imagem, detalhes que valorizam a silhueta são essenciais.'
  },
  Elegante: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/Elegante_r5e1n0.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919952/Guia_de_Estilo_Elegante_m1ez3r.webp',
    description: 'O estilo Elegante reflete sofisticação e graciosidade. Você valoriza peças refinadas e detalhes bem pensados. Sua presença é distinta e transmite classe e bom gosto. Na sua imagem, a sutileza e o equilíbrio são fundamentais, evitando excessos e preferindo a elegância discreta.'
  },
  Romântico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/Romantica_wungp7.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919953/Guia_de_Estilo_Rom%C3%A2ntico_hsn6wz.webp',
    description: 'O estilo Romântico reflete delicadeza e feminilidade. Você valoriza peças com detalhes suaves, como babados, laços e estampas florais. Sua presença é doce e acolhedora, transmitindo afetividade e gentileza. Na sua imagem, elementos que remetem à nostalgia e ao romantismo são essenciais.'
  },
  // Default case for any style not explicitly defined
  default: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911729/Natural_jcneit.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744919951/Padroes_Roupa_Estilo_Natural_b0ihjh.webp',
    description: 'Seu estilo reflete sua personalidade única. Este é um estilo personalizado que combina diferentes elementos para criar uma expressão visual que é verdadeiramente sua.'
  }
};

// Helper function to get style config with fallback to default
export const getStyleConfig = (style) => {
  return styleConfig[style] || styleConfig.default;
};

export default styleConfig;
