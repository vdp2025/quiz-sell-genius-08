export interface StyleConfig {
  [key: string]: {
    image: string;
    guideImage: string;
    description: string;
  };
}

export const styleConfig: StyleConfig = {
  Natural: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    description: 'Você valoriza o conforto, a simplicidade e a liberdade de movimento. Seu estilo é leve, prático e natural.',
  },
  Clássico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
    description: 'Você preza pela elegância atemporal, qualidade e discrição. Seu visual transmite segurança e sobriedade.',
  },
  Contemporâneo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
    description: 'Você combina o moderno com o sofisticado de forma equilibrada. Seu estilo é atual, versátil e refinado.',
  },
  Elegante: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    description: 'Você transmite sofisticação e poder com discrição. Prefere cortes impecáveis e tons neutros e refinados.',
  },
  Romântico: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
    description: 'Você é delicada, feminina e sensível. Gosta de detalhes suaves, tecidos leves e uma estética mais suave.',
  },
  Sexy: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
    description: 'Você valoriza a sensualidade, presença e ousadia. Seu estilo revela confiança e poder de atração.',
  },
  Dramático: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
    description: 'Você é marcante, ousada e expressiva. Gosta de impacto visual, contrastes fortes e produções modernas.',
  },
  Criativo: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp',
    description: 'Você ama se expressar com liberdade e autenticidade. Mistura cores, estilos e peças fora do comum.',
  }
};
