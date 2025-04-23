
// Utility functions for style-related operations
import { StyleResult } from '@/types/quiz';

export type StyleCategory =
  | 'Natural'
  | 'Clássico'
  | 'Contemporâneo'
  | 'Elegante'
  | 'Romântico'
  | 'Sexy'
  | 'Dramático'
  | 'Criativo';

/**
 * Returns style properties for a fallback display when image loading fails
 */
export const getStyleFallbackColor = (styleCategory: string): string => {
  const colorMap: Record<string, string> = {
    'Natural': '#D2C5B0',
    'Clássico': '#8C9AAF',
    'Contemporâneo': '#B0C5D2',
    'Elegante': '#C5B0D2',
    'Romântico': '#F4D0DC',
    'Sexy': '#D2B0B0',
    'Dramático': '#303030',
    'Criativo': '#D2B0C5',
    'default': '#F5F5F5'
  };
  
  return colorMap[styleCategory] || colorMap.default;
};

/**
 * Returns a complete style object for fallback display
 */
export const getStyleFallbackStyles = (styleCategory: string): React.CSSProperties => {
  const backgroundColor = getStyleFallbackColor(styleCategory);
  
  return {
    backgroundColor,
    color: styleCategory === 'Dramático' ? '#FFFFFF' : '#432818',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center' as const,
    fontWeight: 500,
    fontSize: '0.8rem',
    padding: '0.5rem'
  };
};

/**
 * Gets configuration for a specific style category
 */
export const getStyleConfig = (category: string) => {
  const styleConfig: Record<string, { image: string, guideImage: string, description: string }> = {
    'Natural': {
      image: '/lovable-uploads/24f7dc2c-ab37-41ba-a154-786b0626ae04.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Natural é caracterizado por peças confortáveis, práticas e de baixa manutenção.'
    },
    'Clássico': {
      image: '/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Clássico é atemporal, elegante e discreto, com peças de qualidade que nunca saem de moda.'
    },
    'Contemporâneo': {
      image: '/lovable-uploads/22d18ed7-b1fc-4fb4-9538-f0ab93fe5c75.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Contemporâneo combina elementos modernos com clássicos, criando um visual atual mas sem exageros.'
    },
    'Elegante': {
      image: '/lovable-uploads/e779494d-0c8d-408d-b034-1964a3b76469.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Elegante é sofisticado e refinado, com tecidos nobres e acabamentos impecáveis.'
    },
    'Romântico': {
      image: '/lovable-uploads/94638e1c-0180-4cfd-80be-26db97a1e58f.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Romântico é delicado e feminino, com estampas florais, babados e cores suaves.'
    },
    'Sexy': {
      image: '/lovable-uploads/919b184d-940d-4a4f-b53c-36792cbd6114.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Sexy destaca as curvas do corpo com decotes, fendas e peças justas.'
    },
    'Dramático': {
      image: '/lovable-uploads/84341867-0bff-402e-a89f-be5747b706ba.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Dramático é caracterizado por peças marcantes, estruturadas e com impacto visual.'
    },
    'Criativo': {
      image: '/lovable-uploads/d633e490-d0f2-4429-998e-bceeeda790f8.png',
      guideImage: '/lovable-uploads/ce883c46-80e0-4171-9c2d-9288f44f88eb.png',
      description: 'O estilo Criativo é ousado, colorido e mistura elementos inesperados de forma harmoniosa.'
    }
  };
  
  return styleConfig[category] || styleConfig['Natural'];
};

/**
 * Gets fallback style for image display
 */
export const getFallbackStyle = (styleCategory: string): React.CSSProperties => {
  return getStyleFallbackStyles(styleCategory);
};

/**
 * Gets style color
 */
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

/**
 * Gets default style
 */
export const getDefaultStyle = (): StyleResult => {
  return {
    category: 'Natural',
    score: 100,
    percentage: 100
  };
};
