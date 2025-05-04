import React, { createContext, useContext, useState, useEffect } from 'react';

type TestVariant = 'A' | 'B';

interface ABTestContextType {
  variant: TestVariant;
  setVariant: (variant: TestVariant) => void;
  trackConversion: (action: string, value?: number) => void;
}

const ABTestContext = createContext<ABTestContextType | undefined>(undefined);

export const ABTestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<TestVariant>('A');

  useEffect(() => {
    // Verificar se o usuário já tem uma variante atribuída
    const storedVariant = localStorage.getItem('ab_test_variant');
    
    if (storedVariant === 'A' || storedVariant === 'B') {
      setVariant(storedVariant);
    } else {
      // Atribuir aleatoriamente uma variante (50/50)
      const newVariant: TestVariant = Math.random() < 0.5 ? 'A' : 'B';
      setVariant(newVariant);
      localStorage.setItem('ab_test_variant', newVariant);
    }
    
    // Registrar visualização da variante
    const eventData = {
      event: 'ab_test_view',
      variant: variant,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };
    
    // Enviar para analytics (você pode adaptar para seu sistema de analytics)
    if (window.gtag) {
      window.gtag('event', 'ab_test_view', {
        'event_category': 'A/B Test',
        'event_label': variant,
        'value': 1
      });
    }
    
    // Também podemos salvar localmente para análise posterior
    const abTestEvents = JSON.parse(localStorage.getItem('ab_test_events') || '[]');
    abTestEvents.push(eventData);
    localStorage.setItem('ab_test_events', JSON.stringify(abTestEvents));
    
  }, []);

  const trackConversion = (action: string, value?: number) => {
    // Registrar conversão
    const conversionData = {
      event: 'ab_test_conversion',
      variant: variant,
      action: action,
      value: value,
      timestamp: new Date().toISOString(),
      page: window.location.pathname
    };
    
    // Enviar para analytics
    if (window.gtag) {
      window.gtag('event', 'ab_test_conversion', {
        'event_category': 'A/B Test',
        'event_label': `${variant}_${action}`,
        'value': value || 1
      });
    }
    
    // Salvar localmente
    const abTestConversions = JSON.parse(localStorage.getItem('ab_test_conversions') || '[]');
    abTestConversions.push(conversionData);
    localStorage.setItem('ab_test_conversions', JSON.stringify(abTestConversions));
  };

  return (
    <ABTestContext.Provider value={{ variant, setVariant, trackConversion }}>
      {children}
    </ABTestContext.Provider>
  );
};

export const useABTest = () => {
  const context = useContext(ABTestContext);
  if (context === undefined) {
    throw new Error('useABTest deve ser usado dentro de um ABTestProvider');
  }
  return context;
};