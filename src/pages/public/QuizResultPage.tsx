
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QuizResult from '@/components/QuizResult';
import { StyleResult } from '@/types/quiz';

const QuizResultPage = () => {
  const navigate = useNavigate();
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(null);
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    try {
      // Load quiz results from localStorage
      const resultData = localStorage.getItem('quizResults');
      
      if (!resultData) {
        console.error('No results found');
        navigate('/quiz');
        return;
      }
      
      const parsedData = JSON.parse(resultData);
      
      if (parsedData && parsedData.primaryStyle && parsedData.secondaryStyles) {
        setPrimaryStyle(parsedData.primaryStyle);
        setSecondaryStyles(parsedData.secondaryStyles);
      } else {
        console.error('Invalid result data format');
        navigate('/quiz');
      }
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <p className="text-[#432818]">Carregando seu resultado...</p>
        </div>
      </div>
    );
  }
  
  if (!primaryStyle || secondaryStyles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F7]">
        <div className="text-center">
          <p className="text-[#432818]">Não foi possível encontrar seu resultado. Por favor, faça o quiz novamente.</p>
          <a 
            href="/quiz"
            className="inline-block mt-4 px-4 py-2 bg-[#B89B7A] hover:bg-[#A38A69] text-white rounded-md"
          >
            Refazer o Quiz
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <QuizResult
      primaryStyle={primaryStyle}
      secondaryStyles={secondaryStyles}
    />
  );
};

export default QuizResultPage;
