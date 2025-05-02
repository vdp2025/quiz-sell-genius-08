
interface StyleConfigItem {
  image: string;
  guideImage: string;
  description: string;
}

interface StyleConfigType {
  [key: string]: StyleConfigItem;
  default: StyleConfigItem;
}

export const styleConfig: StyleConfigType = {
  Natural: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    description: 'O estilo Natural reflete sua personalidade autêntica e espontânea. Você valoriza o conforto e a praticidade, mas sem abrir mão do estilo. Sua postura é descontraída e você costuma demonstrar simpatia e acessibilidade. Na sua imagem, é importante que tudo pareça natural e sem muito esforço.'
  },
  Clássico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    description: 'O estilo Clássico reflete qualidade e elegância atemporal. Você valoriza peças bem estruturadas e de qualidade superior. Sua presença é refinada e transmite credibilidade e autoridade. Na sua imagem, você preza pela tradição e por elementos que nunca saem de moda.'
  },
  Contemporâneo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    description: 'O estilo Contemporâneo reflete modernidade e praticidade. Você valoriza peças versáteis e atuais, sem excessos ou exageros. Sua presença é atualizada e transmite eficiência e objetividade. Na sua imagem, o equilíbrio entre o clássico e o moderno é fundamental.'
  },
  Criativo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp',
    description: 'O estilo Criativo reflete originalidade e experimentação. Você valoriza peças fora do comum e não tem medo de misturar cores, estampas e texturas. Sua presença é marcante e desperta curiosidade, pois você não segue tendências - você as cria! Na sua imagem, a expressão pessoal e a originalidade são fundamentais.'
  },
  Sexy: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
    description: 'O estilo Sexy reflete confiança e sensualidade. Você valoriza roupas que destacam as curvas do corpo e não tem medo de exibir a sua beleza natural. Sua presença é magnética e você costuma atrair olhares por onde passa. Na sua imagem, detalhes que valorizam a silhueta são essenciais.'
  },
  Elegante: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    description: 'O estilo Elegante reflete sofisticação e graciosidade. Você valoriza peças refinadas e detalhes bem pensados. Sua presença é distinta e transmite classe e bom gosto. Na sua imagem, a sutileza e o equilíbrio são fundamentais, evitando excessos e preferindo a elegância discreta.'
  },
  Romântico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    description: 'O estilo Romântico reflete delicadeza e feminilidade. Você valoriza peças com detalhes suaves, como babados, laços e estampas florais. Sua presença é doce e acolhedora, transmitindo afetividade e gentileza. Na sua imagem, elementos que remetem à nostalgia e ao romantismo são essenciais.'
  },
  Dramático: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    description: 'O estilo Dramático reflete impacto e audácia. Você valoriza peças marcantes e estruturadas com linhas definidas. Sua presença é poderosa e você não tem medo de se destacar. Na sua imagem, elementos que comunicam força e ousadia são fundamentais para expressar sua personalidade.'
  },
  // Default case for any style not explicitly defined
  default: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    description: 'Seu estilo reflete sua personalidade única. Este é um estilo personalizado que combina diferentes elementos para criar uma expressão visual que é verdadeiramente sua.'
  }
};

// Helper function to get style config with fallback to default
export const getStyleConfig = (style: string): StyleConfigItem => {
  if (!style) return styleConfig.default;
  return styleConfig[style] || styleConfig.default;
};

export default styleConfig;
