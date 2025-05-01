
import React from 'react';
import QuizResult from '@/components/QuizResult';
import ErrorState from '@/components/result/ErrorState';
import { useQuizContext } from '@/context/QuizContext';

const ResultPage = () => {
  // We'll always display the result instead of checking "completed"
  const { primaryStyle, secondaryStyles } = useQuizContext();

  // If there's no primaryStyle, show error state
  if (!primaryStyle) {
    return <ErrorState />;
  }
  
  return <QuizResult primaryStyle={primaryStyle} secondaryStyles={secondaryStyles} />;
};

export default ResultPage;
