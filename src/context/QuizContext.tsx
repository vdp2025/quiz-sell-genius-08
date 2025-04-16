
import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useToast } from '@/components/ui/use-toast';
import { QuizResult } from '@/types/quiz';

// We'll define types for our context functions
type QuizContextType = ReturnType<typeof useQuizLogic> & {
  startQuiz: (name: string, email: string, quizId: string) => Promise<any>;
  submitAnswers: (answers: Array<{ questionId: string; optionId: string; points: number }>) => Promise<void>;
  submitResults: (results: QuizResult) => Promise<void>;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  const { toast } = useToast();
  
  // Simplified versions of the functions from useQuiz without router dependency
  const startQuiz = async (name: string, email: string, quizId: string) => {
    try {
      // Mock implementation for now
      console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
      return { id: '1', name, email };
    } catch (error) {
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitAnswers = async (
    answers: Array<{ questionId: string; optionId: string; points: number }>
  ) => {
    try {
      // Mock implementation for now
      console.log('Submitting answers:', answers);
    } catch (error) {
      toast({
        title: "Erro ao salvar respostas",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitResults = async (results: QuizResult) => {
    try {
      // Mock implementation without navigate
      console.log("Results submitted:", results);
      // Redirect to results page
      window.location.href = '/resultado';
    } catch (error) {
      toast({
        title: "Erro ao salvar resultados",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
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
        console.log(`Starting quiz for ${name} (${email}) with quiz ID ${quizId}`);
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
        console.log('Submitting answers:', answers);
      } catch (error) {
        toast({
          title: "Erro ao salvar respostas",
          description: "Por favor, tente novamente.",
          variant: "destructive",
        });
        throw error;
      }
    },
    
    submitResults: async (results: QuizResult) => {
      try {
        console.log("Results submitted:", results);
        window.location.href = '/resultado';
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
