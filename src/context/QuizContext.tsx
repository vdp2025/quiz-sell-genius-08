
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useToast } from '@/components/ui/use-toast';

// We'll remove useQuiz hook import since it uses useNavigate which causes problems outside Router
// We'll reintroduce needed functions without router dependency

type QuizContextType = ReturnType<typeof useQuizLogic> & {
  startQuiz: (name: string, email: string, quizId: string) => Promise<any>;
  submitAnswers: (answers: Array<{ questionId: string; optionId: string; points: number }>) => Promise<void>;
  submitResults: (results: any) => Promise<void>;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  const { toast } = useToast();
  
  // Simplified versions of the functions from useQuiz without router dependency
  const startQuiz = async (name: string, email: string, quizId: string) => {
    // We'll implement this when needed
    return { id: '1', name, email };
  };

  const submitAnswers = async (
    answers: Array<{ questionId: string; optionId: string; points: number }>
  ) => {
    // We'll implement this when needed
  };

  const submitResults = async (results: any) => {
    // We'll implement this without navigate dependency
  };
  
  return (
    <QuizContext.Provider value={{ 
      ...quizLogic, 
      startQuiz,
      submitAnswers,
      submitResults 
    }}>
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

// Export a modified version without Router dependency
export const useQuiz = () => {
  const { toast } = useToast();
  
  return {
    startQuiz: async (name: string, email: string, quizId: string) => {
      try {
        // Mock implementation
        return { id: '1', name, email };
      } catch (error) {
        toast({
          title: "Erro ao iniciar o quiz",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        throw error;
      }
    },
    
    submitAnswers: async (
      answers: Array<{ questionId: string; optionId: string; points: number }>
    ) => {
      try {
        // Mock implementation
      } catch (error) {
        toast({
          title: "Erro ao salvar respostas",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        throw error;
      }
    },
    
    submitResults: async (results: any) => {
      try {
        // Mock implementation without navigate
        console.log("Results submitted:", results);
      } catch (error) {
        toast({
          title: "Erro ao salvar resultados",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        throw error;
      }
    }
  };
};
