
import { useCallback, useEffect, useState } from 'react';
import { QuizResult, StyleResult } from '@/types/quiz';
import { useToast } from '@/components/ui/use-toast';
import { styleConfig } from '@/config/styleConfig';

export const useQuiz = () => {
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    try {
      const savedResult = localStorage.getItem('quizResult');
      return savedResult ? JSON.parse(savedResult) : null;
    } catch (error) {
      console.error('Erro ao carregar resultado do quiz:', error);
      return null;
    }
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('userName') || 'Visitante';
  });

  const { toast } = useToast();

  useEffect(() => {
    if (!quizResult) {
      console.log('Tentando carregar resultados do localStorage...');
      try {
        const savedResult = localStorage.getItem('quizResult');
        if (savedResult) {
          const parsed = JSON.parse(savedResult);
          console.log('Loaded quiz results from localStorage:', parsed);
          setQuizResult(parsed);
        }
      } catch (error) {
        console.error('Erro ao carregar resultado do quiz:', error);
      }
    }
  }, []);

  // Valores padrão caso não haja resultado
  const primaryStyle: StyleResult = quizResult?.primaryStyle || {
    category: 'Contemporâneo',
    score: 0,
    percentage: 0
  };

  const secondaryStyles: StyleResult[] = quizResult?.secondaryStyles || [];

  const getStyleImage = useCallback((category: string) => {
    return styleConfig[category]?.image || 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/Espanhol_Portugu%C3%AAs_8_cgrhuw.webp';
  }, []);

  const getStyleDescription = useCallback((category: string) => {
    return styleConfig[category]?.description || 'Descrição não disponível para este estilo.';
  }, []);

  const startQuiz = async (name: string, quizId: string) => {
    try {
      console.log(`Starting quiz for ${name} with quiz ID ${quizId}`);
      localStorage.setItem('userName', name);
      setUserName(name);
      return { id: '1', name, utmParams: {} };
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
      localStorage.setItem('quizResult', JSON.stringify(results));
      setQuizResult(results);
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
    quizResult,
    primaryStyle,
    secondaryStyles,
    userName,
    startQuiz,
    submitAnswers,
    submitResults,
    getStyleImage,
    getStyleDescription
  };
};
