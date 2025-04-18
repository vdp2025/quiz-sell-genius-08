
import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/sales/OfferCard';
import { resultPageStorage } from '@/services/resultPageStorage';

interface QuizResultProps {
  primaryStyle: StyleResult;
  secondaryStyles: StyleResult[];
}

const QuizResult: React.FC<QuizResultProps> = ({
  primaryStyle,
  secondaryStyles
}) => {
  console.log('Rendering QuizResult with:', {
    primaryStyle,
    secondaryStyles
  });
  
  const { user } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');
  const [config, setConfig] = useState<any>(null);
  
  // Carregar configurações personalizadas
  useEffect(() => {
    try {
      const savedConfig = resultPageStorage.load(primaryStyle.category);
      if (savedConfig) {
        setConfig(savedConfig);
      }
    } catch (error) {
      console.error('Erro ao carregar configurações personalizadas:', error);
    }
  }, [primaryStyle.category]);

  useEffect(() => {
    if (user && user.userName) {
      setUserName(user.userName);
      console.log("Setting name from auth context:", user.userName);
    } else {
      const storedName = localStorage.getItem('userName');
      if (storedName) {
        setUserName(storedName);
        console.log("Setting name from localStorage:", storedName);
      }
    }
  }, [user]);

  if (!primaryStyle || !secondaryStyles) {
    console.error('Missing required props:', {
      primaryStyle,
      secondaryStyles
    });
    return <div>Erro ao carregar os resultados. Por favor, refaça o quiz.</div>;
  }

  // Se ainda não carregou as configurações, mostra versão padrão
  if (!config) {
    return (
      <div className="min-h-screen bg-[#fffaf7]">
        <div className="max-w-4xl mx-auto">
          <ResultHeader userName={userName} />
          
          <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8">
            <PrimaryStyleCard primaryStyle={primaryStyle} />
            <SecondaryStylesSection secondaryStyles={secondaryStyles} />
          </Card>

          <OfferCard primaryStyle={primaryStyle} />
        </div>
      </div>
    );
  }

  // Versão com configurações personalizadas
  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <div className="max-w-4xl mx-auto">
        <ResultHeader 
          userName={userName}

          customTitle={config.header?.content?.title} 
        />
        
        <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8">
          <PrimaryStyleCard 
            primaryStyle={primaryStyle} 
            customDescription={config.mainContent?.content?.description}
            customImage={config.mainContent?.content?.customImage}
          />
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
        </Card>

        <OfferCard 
          primaryStyle={primaryStyle} 
          config={config.offer?.hero?.content} 
        />
      </div>
    </div>
  );
};

export default QuizResult;
