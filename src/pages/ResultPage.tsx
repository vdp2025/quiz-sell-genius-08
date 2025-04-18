
import React from 'react';
import { useQuizContext } from '../context/QuizContext';
import QuizResult from '../components/QuizResult';
import { EditorButton } from '@/components/ui/EditorButton';

const ResultPage = () => {
  const { quizResult } = useQuizContext();
  console.log('Usando resultado do contexto:', quizResult);
  
  if (!quizResult || !quizResult.primaryStyle || !quizResult.secondaryStyles) {
    return (
      <div className="min-h-screen bg-[#fffaf7] flex items-center justify-center">
        <p>Sem resultado disponível. Por favor, complete o quiz primeiro.</p>
      </div>
    );
  }

  return (
    <>
      <QuizResult 
        primaryStyle={quizResult.primaryStyle} 
        secondaryStyles={quizResult.secondaryStyles.slice(0, 2)} 
      />
      <EditorButton />
    </>
  );
};

export default ResultPage;
