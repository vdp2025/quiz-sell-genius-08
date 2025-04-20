
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Header } from './result/Header';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { QuizResultHeader } from './quiz-result/QuizResultHeader';
import { MainContentSection } from './quiz-result/MainContentSection';
import { OfferSection } from './quiz-result/OfferSection';
import { styleConfig } from '@/config/styleConfig';
import { SecondaryStylesSection } from './quiz-result/SecondaryStylesSection';
import { useNavigation } from '@/hooks/useNavigation';
import { OfferContent } from '@/types/resultPageConfig';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({ 
  primaryStyle, 
  secondaryStyles 
}) => {
  const { globalStyles } = useGlobalStyles();
  const { navigateToEditor } = useNavigation();
  
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
    <div className="min-h-screen bg-[#fffaf7]" style={{
      backgroundColor: globalStyles.backgroundColor || '#fffaf7',
      color: globalStyles.textColor || '#432818',
      fontFamily: globalStyles.fontFamily || 'inherit'
    }}>
      <Header 
        primaryStyle={primaryStyle}
        logoHeight={globalStyles.logoHeight}
        logo={globalStyles.logo}
        logoAlt={globalStyles.logoAlt}
      />
      
      <div className="container mx-auto px-4 py-6">
        <QuizResultHeader 
          primaryStyle={primaryStyle}
          styleDescription={styleConfig[primaryStyle.category]?.description}
        />
        
        <MainContentSection primaryStyle={primaryStyle} />
        
        <SecondaryStylesSection
          secondaryStyles={secondaryStyles}
        />
        
        <OfferSection 
          primaryStyle={primaryStyle}
        />
      </div>
    </div>
  );
};

export default QuizResult;
