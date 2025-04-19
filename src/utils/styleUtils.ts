
import { StyleCategory } from '@/types/quiz';

export const getStyleColor = (category: StyleCategory): string => {
  const colorMap: Record<StyleCategory, string> = {
    'Natural': '#8F7A6A',
    'Contemporâneo': '#B89B7A',
    'Clássico': '#432818',
    'Elegante': '#AA6B5D',
    'Romântico': '#D4A5A5',
    'Sexy': '#9E2B2B',
    'Dramático': '#2B2B2B',
    'Criativo': '#F0A500'
  };
  
  return colorMap[category] || '#B89B7A';
};

export const getStyleConfig = (category: StyleCategory) => {
  return {
    Natural: {
      name: 'Natural',
      description: 'Seu estilo é caracterizado pela simplicidade e conforto.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/1_srgjwx.webp'
    },
    Contemporâneo: {
      name: 'Contemporâneo',
      description: 'Você combina modernidade com praticidade.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp'
    },
    // ... add other styles
  }[category] || {
    name: category,
    description: 'Seu estilo único e pessoal.',
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/1_srgjwx.webp'
  };
};
