
import React, { useEffect, useState } from 'react';
import { StyleResult } from '@/types/quiz';
import { ContentContainer } from '../layout/ContentContainer';
import ResultHeader from './ResultHeader';
import StyleSection from './StyleSection';
import SalesHero from './sales/SalesHero';
import ProductShowcase from './sales/ProductShowcase';
import BenefitList from './sales/BenefitList';
import Testimonials from './sales/Testimonials';
import Guarantee from './sales/Guarantee';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles,
}) => {
  const [userName, setUserName] = useState<string>('Visitante');

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <ResultHeader userName={userName} />
      
      <ContentContainer>
        <div className="space-y-12 py-8">
          <StyleSection 
            primaryStyle={primaryStyle}
            secondaryStyles={secondaryStyles}
          />
          
          <SalesHero primaryStyle={primaryStyle} />
          
          <ProductShowcase />
          
          <BenefitList />
          
          <Testimonials />
          
          <Guarantee />
        </div>
      </ContentContainer>
    </div>
  );
};

export default QuizResult;
