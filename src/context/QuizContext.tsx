
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useQuiz } from '../hooks/useQuiz';

type QuizContextType = ReturnType<typeof useQuizLogic> & ReturnType<typeof useQuiz>;

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  const quizActions = useQuiz();
  
  return (
    <QuizContext.Provider value={{ ...quizLogic, ...quizActions }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizProvider');
  }
  return context;
};
