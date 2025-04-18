import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { StyleResult } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import ResultHeader from './quiz-result/ResultHeader';
import PrimaryStyleCard from './quiz-result/PrimaryStyleCard';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import OfferCard from './quiz-result/OfferCard';

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
  const {
    user
  } = useAuth();
  const [userName, setUserName] = useState<string>('Visitante');

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF9F7] to-white px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <ResultHeader userName={userName} />
        
        <Card className="p-6 bg-white shadow-md border border-[#B89B7A]/20">
          <PrimaryStyleCard primaryStyle={primaryStyle} />
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
        </Card>

        <OfferCard primaryStyle={primaryStyle} />
      </div>
    </div>
  );
};

export default QuizResult;
