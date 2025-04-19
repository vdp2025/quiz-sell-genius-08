
import { useEffect, useState } from 'react';

interface GlobalStyles {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  logoHeight?: number;
}

export const useGlobalStyles = () => {
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>(() => {
    const saved = localStorage.getItem('global_styles');
    return saved ? JSON.parse(saved) : {
      backgroundColor: '#fff',
      textColor: '#432818',
      fontFamily: 'inherit',
      logoHeight: 56
    };
  });

  useEffect(() => {
    localStorage.setItem('global_styles', JSON.stringify(globalStyles));
  }, [globalStyles]);

  const updateGlobalStyles = (newStyles: Partial<GlobalStyles>) => {
    setGlobalStyles(prev => ({ ...prev, ...newStyles }));
  };

  return { globalStyles, updateGlobalStyles };
};
