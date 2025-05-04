import React, { createContext, useContext, useState, useEffect } from 'react';
import { trackButtonClick } from '@/utils/analytics';

type ABTestContextType = {
  variant: string;
  setVariant: (variant: string) => void;
  trackConversion: (eventName: string, value: number) => void;
};

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (!context) {
    throw new Error('useABTest must be used within an ABTestProvider');
  }
  return context;
};

type ABTestProviderProps = {
  children: React.ReactNode;
};

export const ABTestProvider: React.FC<ABTestProviderProps> = ({ children }) => {
  const [variant, setVariant] = useState<string>('A');

  useEffect(() => {
    // Distribuição aleatória entre variantes A e B
    const randomVariant = Math.random() < 0.5 ? 'A' : 'B';
    setVariant(randomVariant);

    // Registrar visualização da variante
    trackButtonClick('variant_view', `Variant ${randomVariant} View`, 'results_page');
  }, []);

  const trackConversion = (eventName: string, value: number) => {
    trackButtonClick(
      `${eventName}_${variant.toLowerCase()}`,
      `${eventName} - Variant ${variant}`,
      'results_page',
      value
    );
  };

  return (
    <ABTestContext.Provider value={{ variant, setVariant, trackConversion }}>
      {children}
    </ABTestContext.Provider>
  );
};