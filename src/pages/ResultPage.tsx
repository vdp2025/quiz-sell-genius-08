
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizLogic } from '../hooks/useQuizLogic';
import QuizResult from '../components/QuizResult';
import { QuizResult as QuizResultType } from '../types/quiz';

const ResultPage = () => {
  const { quizResult, resetQuiz } = useQuizLogic();
  const navigate = useNavigate();
  const [localResult, setLocalResult] = useState<QuizResultType | null>(null);

  useEffect(() => {
    // If there's no result from context, try to load from localStorage
    if (!quizResult) {
      try {
        const savedResult = localStorage.getItem('quizResult');
        if (savedResult) {
          setLocalResult(JSON.parse(savedResult));
        } else {
          // No result found, redirect to homepage
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading quiz result:", error);
        navigate('/');
      }
    }
  }, [quizResult, navigate]);

  const resultToUse = quizResult || localResult;

  if (!resultToUse) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold mb-2">Carregando resultado...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <QuizResult 
        primaryStyle={resultToUse.primaryStyle}
        secondaryStyles={resultToUse.secondaryStyles}
        onReset={resetQuiz}
      />
    </div>
  );
};

export default ResultPage;
