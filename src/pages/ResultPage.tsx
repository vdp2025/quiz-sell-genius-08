
import React from 'react';
import QuizResult from '@/components/QuizResult';
import { useQuiz } from '@/hooks/useQuiz';
import ErrorState from '@/components/result/ErrorState';

const ResultPage = () => {
  const { primaryStyle, secondaryStyles, completed } = useQuiz();

  // Se o quiz não foi completado, mostrar mensagem de erro
  if (!completed || !primaryStyle) {
    return <ErrorState />;
  }
  
  return <QuizResult primaryStyle={primaryStyle} secondaryStyles={secondaryStyles} />;
};

export default ResultPage;
