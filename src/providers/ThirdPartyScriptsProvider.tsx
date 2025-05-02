
import React, { ReactNode } from 'react';

interface ThirdPartyScriptsProviderProps {
  children: ReactNode;
}

export const ThirdPartyScriptsProvider: React.FC<ThirdPartyScriptsProviderProps> = ({ children }) => {
  // This provider can be used to load third-party scripts like Google Analytics, Facebook Pixel, etc.
  // For now, it's just a placeholder
  
  return <>{children}</>;
};
