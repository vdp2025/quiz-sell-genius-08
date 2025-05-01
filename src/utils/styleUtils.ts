
import { BorderRadiusType } from '@/types/resultPageConfig';

/**
 * Ensures borderRadius values conform to the BorderRadiusType
 * @param value The borderRadius value to sanitize
 * @returns A valid BorderRadiusType value
 */
export const sanitizeBorderRadius = (value: string | BorderRadiusType): BorderRadiusType => {
  if (value === 'none' || value === 'small' || value === 'medium' || value === 'large') {
    return value;
  }
  
  // Default value if not valid
  return 'medium';
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
