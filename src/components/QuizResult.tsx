
import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/sales/OfferCard';

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
  const [config, setConfig] = useState<any>({});
  
  // Carregar configurações personalizadas
  useEffect(() => {
    try {
      const storedConfig = localStorage.getItem(`quiz_result_config_${primaryStyle.category}`);
      if (storedConfig) {
        setConfig(JSON.parse(storedConfig));
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

  // Título personalizado para o cabeçalho ou padrão
  const headerTitle = config?.header?.title || `Olá, ${userName}, seu Estilo Predominante é:`;
  
  // Descrição personalizada para o estilo primário ou padrão
  const primaryStyleWithConfig = {
    ...primaryStyle,
    description: config?.primaryStyle?.description
  };
  
  // Propriedades personalizadas para a oferta
  const offerConfig = config?.offer || {};

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      <div className="max-w-4xl mx-auto">
        <ResultHeader userName={userName} customTitle={headerTitle} />
        
        <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20 mb-8">
          <PrimaryStyleCard 
            primaryStyle={primaryStyle} 
            customDescription={config?.primaryStyle?.description}
            customImage={config?.primaryStyle?.customImage}
          />
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
        </Card>

        <OfferCard primaryStyle={primaryStyle} config={offerConfig} />
      </div>
    </div>
  );
};

export default QuizResult;
