
import React, { createContext, useContext, ReactNode, useState } from 'react';

type QuizContextType = {
  startQuiz: () => void;
  isStarted: boolean;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isStarted, setIsStarted] = useState(false);
  
  const startQuiz = () => {
    setIsStarted(true);
  };
  
  return (
    <QuizContext.Provider value={{ startQuiz, isStarted }}>
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
