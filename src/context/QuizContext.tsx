import React, { createContext, useContext, ReactNode } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useToast } from '@/components/ui/use-toast';
import { QuizResult } from '@/types/quiz';
import { saveParticipant } from '@/services/quizService';

// Define the context type
type QuizContextType = ReturnType<typeof useQuizLogic> & {
  startQuiz: (name: string, quizId: string) => Promise<{ 
    id: string; 
    name: string; 
    utmParams: Record<string, string> 
  }>;
  submitAnswers: (answers: Array<{ questionId: string; optionId: string; points: number }>) => Promise<void>;
  submitResults: (results: QuizResult) => Promise<void>;
};

// Create context with undefined default
const QuizContext = createContext<QuizContextType | undefined>(undefined);

// Provider component
export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const quizLogic = useQuizLogic();
  const { toast } = useToast();
  
  const startQuiz = async (name: string, quizId: string) => {
    try {
      // Capture UTM parameters from useQuizLogic
      const { utmParams } = quizLogic;
      
      console.log(`Starting quiz for ${name} with quiz ID ${quizId}`);
      
      // Save participant with UTM parameters
      const participant = await saveParticipant(name, null, quizId, utmParams);
      
      return { 
        id: participant.id, 
        name, 
        utmParams 
      };
    } catch (error) {
      toast({
        title: "Erro ao iniciar o quiz",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const submitAnswers = async (answers: Array<{ questionId: string; optionId: string; points: number }>) => {
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
  };

  const submitResults = async (results: QuizResult) => {
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
  };
  
  // Create a new object that matches the expected type structure
  const contextValue: QuizContextType = {
    ...quizLogic,
    startQuiz,
    submitAnswers,
    submitResults
  };
  
  // Return the provider
  return (
    <QuizContext.Provider value={contextValue}>
      {children}
    </QuizContext.Provider>
  );
};

// Hook for using the context
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
    startQuiz: async (name: string, quizId: string) => {
      try {
        console.log(`Starting quiz for ${name} with quiz ID ${quizId}`);
        return { id: '1', name };
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

export { QuizContext };
