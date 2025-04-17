
export const getFallbackStyle = (styleCategory: string) => {
  const colorMap: Record<string, string> = {
    'Natural': '#D2C1A5',
    'Clássico': '#1F456E',
    'Contemporâneo': '#7F7F7F',
    'Elegante': '#AF9F7F',
    'Romântico': '#F5D0E3',
    'Sexy': '#A82743',
    'Dramático': '#222222',
    'Criativo': '#F79862'
  };
  
  return {
    backgroundColor: colorMap[styleCategory] || '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ['Natural', 'Elegante', 'Romântico', 'Contemporâneo'].includes(styleCategory) ? '#333' : '#fff',
    fontSize: '1rem',
    textAlign: 'center' as const,
    padding: '1rem'
  };
};
