
import React, { useEffect } from 'react';
import { useQuiz } from '@/hooks/useQuiz';
import { Header } from '@/components/result/Header';
import { StyleResultSection } from '@/components/result/StyleResult';
import OfferCard from '@/components/quiz-result/sales/OfferCard';
import { styleConfig } from '@/config/styleConfig';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';

const ResultPage = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { globalStyles } = useGlobalStyles();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!primaryStyle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-[#432818] mb-4">
            Resultados não encontrados
          </h1>
          <p className="text-[#8F7A6A] mb-6">
            Parece que você ainda não completou o quiz.
          </p>
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors"
          >
            Fazer o Quiz
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{
      backgroundColor: globalStyles.backgroundColor || '#fff',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      <Header 
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
      />
      
      <div className="container mx-auto px-3 py-2 max-w-2xl">
        <div className="space-y-3">
          <StyleResultSection 
            primaryStyle={primaryStyle}
            description={styleConfig[primaryStyle.category].description}
            image={styleConfig[primaryStyle.category].image}
            secondaryStyles={secondaryStyles}
          />
          
          <OfferCard primaryStyle={primaryStyle} />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
