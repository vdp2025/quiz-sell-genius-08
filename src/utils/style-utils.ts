
// Utility functions for style-related operations

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
export const getStyleFallbackStyles = (styleCategory: string) => {
  const backgroundColor = getStyleFallbackColor(styleCategory);
  
  return {
    backgroundColor,
    color: styleCategory === 'Dramático' ? '#FFFFFF' : '#432818',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 500,
    fontSize: '0.8rem',
    padding: '0.5rem'
  };
};
