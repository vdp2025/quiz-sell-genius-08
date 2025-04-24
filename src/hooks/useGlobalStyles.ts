
import { useState, useEffect } from 'react';

interface GlobalStyles {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  logoHeight?: number;
  logo?: string;
  logoAlt?: string;
}

export const useGlobalStyles = () => {
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>({
    backgroundColor: '#fffaf7',
    textColor: '#432818',
    fontFamily: 'inherit',
    logoHeight: 60,
    logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
    logoAlt: 'Logo do Quiz de Estilo'
  });

  useEffect(() => {
    // Futuramente poderia carregar estilos de uma configuração
    const loadGlobalStyles = async () => {
      // Por enquanto, apenas usamos os valores padrão
    };

    loadGlobalStyles();
  }, []);

  return { globalStyles, setGlobalStyles };
};
