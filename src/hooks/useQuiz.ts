
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { saveParticipant, saveAnswers, saveResults } from '@/services/quizService';
import { QuizResult, StyleResult } from '@/types/quiz';

export const useQuiz = () => {
  const [participantId, setParticipantId] = useState<string | null>(null);
  const [primaryStyle, setPrimaryStyle] = useState<StyleResult | null>(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);
      return parsedResult.primaryStyle || null;
    }
    return null;
  });
  const [secondaryStyles, setSecondaryStyles] = useState<StyleResult[]>(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);
      return parsedResult.secondaryStyles || [];
    }
    return [];
  });
  const { toast } = useToast();

  // Load quiz results from localStorage on component mount
  useEffect(() => {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        if (parsedResult.primaryStyle) {
          setPrimaryStyle(parsedResult.primaryStyle);
        }
        if (parsedResult.secondaryStyles) {
          setSecondaryStyles(parsedResult.secondaryStyles);
        }
        console.log('Loaded quiz results from localStorage:', parsedResult);
      } catch (error) {
        console.error('Error parsing quiz results from localStorage:', error);
      }
    }
  }, []);

  const startQuiz = async (name: string, email: string, quizId: string) => {
    try {
      const participant = await saveParticipant(name, email, quizId);
      setParticipantId(participant.id);
      return participant;
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
    if (!participantId) {
      throw new Error('Participant ID not found');
    }

    try {
      await saveAnswers(participantId, answers);
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
    if (!participantId) {
      throw new Error('Participant ID not found');
    }

    try {
      await saveResults(participantId, [results.primaryStyle, ...results.secondaryStyles]);
      
      // Update the local state with the submitted results
      setPrimaryStyle(results.primaryStyle);
      setSecondaryStyles(results.secondaryStyles);
      
      // Save to localStorage for persistence
      localStorage.setItem('quizResult', JSON.stringify(results));
      
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

  return {
    startQuiz,
    submitAnswers,
    submitResults,
    primaryStyle,
    secondaryStyles
  };
};
