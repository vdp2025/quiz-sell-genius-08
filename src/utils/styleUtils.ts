
import { StyleResult } from '@/types/quiz';

export const getDefaultStyle = (category: string = 'Natural'): StyleResult => {
  return {
    category,
    score: 100,
    percentage: 100
  };
};

export const getStyleColor = (styleType: string): string => {
  switch (styleType) {
    case 'Natural':
      return '#8D9779';
    case 'Clássico':
      return '#7E94B4';
    case 'Contemporâneo':
      return '#5A7D9A';
    case 'Elegante':
      return '#B9995E';
    case 'Romântico':
      return '#E4A9A9';
    case 'Sexy':
      return '#AB0E1E';
    case 'Dramático':
      return '#1A1818';
    case 'Criativo':
      return '#CA7D60';
    default:
      return '#8D9779';
  }
};
