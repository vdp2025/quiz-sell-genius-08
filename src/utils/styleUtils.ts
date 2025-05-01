import { BorderRadiusType } from '@/types/resultPageConfig';

/**
 * Ensures borderRadius values conform to the BorderRadiusType
 * @param value The borderRadius value to sanitize
 * @returns A valid BorderRadiusType value
 */
export const sanitizeBorderRadius = (value: string | undefined): BorderRadiusType => {
  if (!value) return 'md';
  
  // Convert string values to our enum type
  switch(value.toLowerCase()) {
    case 'none': return 'none';
    case 'sm': 
    case 'small': return 'sm';
    case 'md': 
    case 'medium': return 'md';
    case 'lg': 
    case 'large': return 'lg';
    case 'full': return 'full';
    case 'custom': return 'custom';
    default: 
      // Try to parse numeric values with units like '8px' or '0.5rem'
      return /^\d+(\.\d+)?(px|rem|em|%)?$/.test(value) ? 'custom' : 'md';
  }
};

/**
 * Gets a fallback style for a specific style category
 * @param category The style category
 * @returns CSS style object
 */
export const getFallbackStyle = (category: string) => {
  // Assign a background color based on the style category
  const styleColors: Record<string, string> = {
    'Natural': '#E5DEFF',
    'Clássico': '#D3E4FD',
    'Contemporâneo': '#F2FCE2',
    'Elegante': '#FFDEE2',
    'Romântico': '#FDE1D3',
    'Sexy': '#FEC6A1',
    'Dramático': '#D6BCFA',
    'Criativo': '#FEF7CD',
  };

  const backgroundColor = styleColors[category] || '#F1F0FB';

  return {
    backgroundColor,
    color: '#432818',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    fontWeight: 'bold',
    borderRadius: '4px',
  };
};
