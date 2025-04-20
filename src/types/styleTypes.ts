
export interface StyleOptions {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  paddingY?: string;
  paddingX?: string;
  margin?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontFamily?: string;
}

export type StyleCategory = 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo';

export interface StyleCategoryInfo {
  category: StyleCategory;
  color: string;
  description: string;
  imageUrl?: string;
}

export const styleCategoryColors: Record<StyleCategory, string> = {
  'Natural': '#A0A083',
  'Clássico': '#264653',
  'Contemporâneo': '#2A9D8F',
  'Elegante': '#8E6C88',
  'Romântico': '#E76F51',
  'Sexy': '#9D0208',
  'Dramático': '#001219',
  'Criativo': '#F4A261'
};

export const styleCategories: StyleCategoryInfo[] = [
  {
    category: 'Natural',
    color: '#A0A083',
    description: 'Estilo descontraído, confortável e despretensioso.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp'
  },
  {
    category: 'Clássico',
    color: '#264653',
    description: 'Estilo tradicional, discreto e elegante.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp'
  },
  {
    category: 'Contemporâneo',
    color: '#2A9D8F',
    description: 'Estilo moderno, prático e atual.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp'
  },
  {
    category: 'Elegante',
    color: '#8E6C88',
    description: 'Estilo sofisticado, refinado e imponente.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp'
  },
  {
    category: 'Romântico',
    color: '#E76F51',
    description: 'Estilo delicado, feminino e detalhista.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp'
  },
  {
    category: 'Sexy',
    color: '#9D0208',
    description: 'Estilo sensual, chamativo e ousado.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp'
  },
  {
    category: 'Dramático',
    color: '#001219',
    description: 'Estilo marcante, estruturado e impactante.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp'
  },
  {
    category: 'Criativo',
    color: '#F4A261',
    description: 'Estilo autêntico, original e artístico.',
    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp'
  }
];
