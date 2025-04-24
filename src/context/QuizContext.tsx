
import React, { createContext, useContext } from 'react';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { QuizQuestion } from '@/types/quiz';

type QuizContextType = ReturnType<typeof useQuizLogic>;

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  
  return (
    <QuizContext.Provider value={quizLogic}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

// Alias for useQuiz for backward compatibility
export const useQuizContext = useQuiz;
