
import React, { createContext, useContext, ReactNode, useState } from 'react';

type GlobalStyles = {
  backgroundColor?: string;
  textColor?: string;
  fontFamily?: string;
  logoHeight?: string;
  logo?: string;
  logoAlt?: string;
};

type GlobalStylesContextType = {
  globalStyles: GlobalStyles;
  updateStyles: (styles: Partial<GlobalStyles>) => void;
};

const GlobalStylesContext = createContext<GlobalStylesContextType | undefined>(undefined);

export const GlobalStylesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>({
    backgroundColor: '#fffaf7',
    textColor: '#432818',
    fontFamily: 'inherit',
    logoHeight: '60px',
    logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1681774457/Logo_k80o9d.png',
    logoAlt: 'Logo Quiz de Estilo'
  });
  
  const updateStyles = (styles: Partial<GlobalStyles>) => {
    setGlobalStyles(prev => ({ ...prev, ...styles }));
  };
  
  return (
    <GlobalStylesContext.Provider value={{ globalStyles, updateStyles }}>
      {children}
    </GlobalStylesContext.Provider>
  );
};

export const useGlobalStyles = () => {
  const context = useContext(GlobalStylesContext);
  if (context === undefined) {
    throw new Error('useGlobalStyles must be used within a GlobalStylesProvider');
  }
  return context;
};
