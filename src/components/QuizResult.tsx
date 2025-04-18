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
  return <div className="md:px-4 md:py-8 px-[5px] py-[15px] bg-[#fefefe]">
      <div className="max-w-4xl mx-auto space-y-4 md:space-y-8">
        <ResultHeader userName={userName} />
        
        <Card className="p-3 md:p-6 bg-white shadow-md">
          <PrimaryStyleCard primaryStyle={primaryStyle} />
          <SecondaryStylesSection secondaryStyles={secondaryStyles} />
        </Card>

        <OfferCard primaryStyle={primaryStyle} />
      </div>
    </div>;
};
export default QuizResult;