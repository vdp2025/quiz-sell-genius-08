import { useState, useCallback, useEffect } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { QuizResult, StyleResult } from '../types/quiz';

export const useQuizLogic = () => {
  // 1. State declarations (all at the top) - Melhorada a recuperação de estado
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    try {
      const savedIndex = localStorage.getItem('currentQuestionIndex');
      return savedIndex ? parseInt(savedIndex, 10) : 0;
    } catch (e) {
      console.error('Erro ao recuperar índice da questão:', e);
      return 0;
    }
  });
  
  const [answers, setAnswers] = useState<Record<string, string[]>>(() => {
    try {
      const savedAnswers = localStorage.getItem('quizAnswers');
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    } catch (e) {
      console.error('Erro ao recuperar respostas:', e);
      return {};
    }
  });
  
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>(() => {
    try {
      const savedAnswers = localStorage.getItem('strategicAnswers');
      return savedAnswers ? JSON.parse(savedAnswers) : {};
    } catch (e) {
      console.error('Erro ao recuperar respostas estratégicas:', e);
      return {};
    }
  });
  
  const [quizCompleted, setQuizCompleted] = useState(() => {
    try {
      return localStorage.getItem('quizCompleted') === 'true';
    } catch (e) {
      console.error('Erro ao verificar conclusão do quiz:', e);
      return false;
    }
  });
  
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    try {
      const savedResult = localStorage.getItem('quizResult');
      return savedResult ? JSON.parse(savedResult) : null;
    } catch (e) {
      console.error('Erro ao recuperar resultado do quiz:', e);
      return null;
    }
  });

  // 2. Computed values
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentAnswers.length === (currentQuestion?.multiSelect || 0);
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const totalQuestions = quizQuestions.length;

  // 3. Simple utility functions that don't depend on other functions
  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: selectedOptions
      };
      try {
        localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
      } catch (e) {
        console.error('Erro ao salvar respostas:', e);
      }
      console.log(`Question ${questionId} answered with options:`, selectedOptions);
      return newAnswers;
    });
  }, []);

  const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    setStrategicAnswers(prev => {
      const newAnswers = {
        ...prev,
        [questionId]: selectedOptions
      };
      try {
        localStorage.setItem('strategicAnswers', JSON.stringify(newAnswers));
      } catch (e) {
        console.error('Erro ao salvar respostas estratégicas:', e);
      }
      return newAnswers;
    });
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      try {
        localStorage.setItem('currentQuestionIndex', newIndex.toString());
      } catch (e) {
        console.error('Erro ao salvar índice da questão:', e);
      }
    }
  }, [currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setQuizResult(null);
    try {
      localStorage.removeItem('quizResult');
      localStorage.removeItem('strategicAnswers');
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('currentQuestionIndex');
      localStorage.removeItem('quizCompleted');
    } catch (e) {
      console.error('Erro ao resetar quiz:', e);
    }
    setStrategicAnswers({});
    console.log('Quiz reset');
  }, []);

  // 4. Complex function that others depend on
  const calculateResults = useCallback(() => {
    const styleCounter: Record<string, number> = {
      'Natural': 0,
      'Clássico': 0,
      'Contemporâneo': 0,
      'Elegante': 0,
      'Romântico': 0,
      'Sexy': 0,
      'Dramático': 0,
      'Criativo': 0
    };

    let totalSelections = 0;

    // Garantir que todas as respostas sejam contabilizadas
    Object.entries(answers).forEach(([questionId, optionIds]) => {
      const question = quizQuestions.find(q => q.id === questionId);
      if (!question) return;

      optionIds.forEach(optionId => {
        const option = question.options.find(o => o.id === optionId);
        if (option) {
          styleCounter[option.styleCategory]++;
          totalSelections++;
        }
      });
    });

    console.log('Style counts:', styleCounter);
    console.log('Total selections:', totalSelections);

    // Calcular resultados
    const styleResults: StyleResult[] = Object.entries(styleCounter)
      .map(([category, score]) => ({
        category: category as StyleResult['category'],
        score,
        percentage: totalSelections > 0 ? Math.round((score / totalSelections) * 100) : 0
      }))
      .sort((a, b) => b.score - a.score);

    const primaryStyle = styleResults[0];
    const secondaryStyles = styleResults.slice(1);

    const result = {
      primaryStyle,
      secondaryStyles,
      totalSelections
    };

    setQuizResult(result);
    // Save to localStorage immediately
    localStorage.setItem('quizResult', JSON.stringify(result));
    // Also save strategic answers
    localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
    console.log('Results calculated and saved to localStorage:', result);

    return result;
  }, [answers, strategicAnswers]);

  // 5. Functions that depend on other complex functions
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      try {
        localStorage.setItem('currentQuestionIndex', newIndex.toString());
      } catch (e) {
        console.error('Erro ao salvar índice da questão:', e);
      }
    } else {
      calculateResults();
      setQuizCompleted(true);
      try {
        localStorage.setItem('quizCompleted', 'true');
      } catch (e) {
        console.error('Erro ao marcar quiz como completo:', e);
      }
    }
  }, [currentQuestionIndex, calculateResults, quizQuestions.length]);

  const submitQuizIfComplete = useCallback(() => {
    // Calculate final results
    const results = calculateResults();
    setQuizCompleted(true);
    
    // Save everything to localStorage before navigating
    try {
      localStorage.setItem('quizResult', JSON.stringify(results));
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      localStorage.setItem('quizCompleted', 'true');
    } catch (e) {
      console.error('Erro ao salvar resultados finais:', e);
    }
    console.log('Results saved to localStorage before redirect:', results);
    
    return results;
  }, [calculateResults, strategicAnswers]);

  // 6. Side effects - Melhorada a consistência do estado
  useEffect(() => {
    if (quizResult) {
      try {
        localStorage.setItem('quizResult', JSON.stringify(quizResult));
      } catch (e) {
        console.error('Erro ao salvar resultado do quiz:', e);
      }
    }
  }, [quizResult]);

  useEffect(() => {
    if (Object.keys(strategicAnswers).length > 0) {
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      console.log('Strategic answers saved to localStorage:', strategicAnswers);
    }
  }, [strategicAnswers]);

  // 7. Return all needed functions and values
  return {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    quizCompleted,
    quizResult,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetQuiz,
    submitQuizIfComplete,
    calculateResults,
    totalQuestions,
    strategicAnswers,
    handleStrategicAnswer
  };
};
