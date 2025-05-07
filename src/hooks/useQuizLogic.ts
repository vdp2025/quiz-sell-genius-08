import { useState, useCallback, useEffect } from 'react';
import { quizQuestions } from '../data/quizQuestions';
import { QuizResult, StyleResult } from '../types/quiz';

// Função utilitária para recuperar dados do localStorage com segurança
const safeGetFromStorage = (key: string, fallback: any) => {
  try {
    const data = localStorage.getItem(key);
    // Verificar se o dado existe
    if (!data) return fallback;
    
    // Tentar fazer parse para JSON se necessário
    if (typeof fallback === 'object') {
      try {
        const parsed = JSON.parse(data);
        return parsed;
      } catch (e) {
        console.error(`Erro ao fazer parse de ${key}:`, e);
        return fallback;
      }
    }
    
    // Conversão para o tipo apropriado
    if (typeof fallback === 'number') return Number(data) || fallback;
    if (typeof fallback === 'boolean') return data === 'true';
    
    return data;
  } catch (e) {
    console.error(`Erro ao acessar localStorage para ${key}:`, e);
    return fallback;
  }
};

// Função utilitária para salvar dados no localStorage com segurança
const safeSaveToStorage = (key: string, value: any) => {
  try {
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
    localStorage.setItem(key, valueToStore);
    return true;
  } catch (e) {
    console.error(`Erro ao salvar ${key} no localStorage:`, e);
    return false;
  }
};

export const useQuizLogic = () => {
  // 1. State declarations (all at the top) - Melhorada a recuperação de estado
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = safeGetFromStorage('currentQuestionIndex', 0);
    // Validar se o índice está dentro dos limites
    return savedIndex >= 0 && savedIndex < quizQuestions.length ? savedIndex : 0;
  });
  
  const [answers, setAnswers] = useState<Record<string, string[]>>(() => {
    const savedAnswers = safeGetFromStorage('quizAnswers', {});
    // Validar se as respostas são válidas verificando a estrutura
    return typeof savedAnswers === 'object' ? savedAnswers : {};
  });
  
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>(() => {
    const savedAnswers = safeGetFromStorage('strategicAnswers', {});
    return typeof savedAnswers === 'object' ? savedAnswers : {};
  });
  
  const [quizCompleted, setQuizCompleted] = useState(() => {
    return safeGetFromStorage('quizCompleted', false);
  });
  
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    const savedResult = safeGetFromStorage('quizResult', null);
    // Validar se o resultado tem a estrutura esperada
    if (savedResult && 
        savedResult.primaryStyle && 
        savedResult.secondaryStyles && 
        Array.isArray(savedResult.secondaryStyles)) {
      return savedResult;
    }
    return null;
  });

  // 2. Computed values
  const currentQuestion = quizQuestions[currentQuestionIndex] || quizQuestions[0];
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
      safeSaveToStorage('quizAnswers', newAnswers);
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
      safeSaveToStorage('strategicAnswers', newAnswers);
      return newAnswers;
    });
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      safeSaveToStorage('currentQuestionIndex', newIndex);
    }
  }, [currentQuestionIndex]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setQuizCompleted(false);
    setQuizResult(null);
    setStrategicAnswers({});

    // Limpar dados do localStorage
    try {
      localStorage.removeItem('quizResult');
      localStorage.removeItem('strategicAnswers');
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('currentQuestionIndex');
      localStorage.removeItem('quizCompleted');
    } catch (e) {
      console.error('Erro ao resetar quiz no localStorage:', e);
    }
    
    console.log('Quiz reset');
  }, []);

  // 4. Complex function that others depend on
  const calculateResults = useCallback(() => {
    // Verificar se há respostas antes de calcular
    if (Object.keys(answers).length === 0) {
      console.warn('Tentativa de calcular resultados sem respostas.');
      return null;
    }

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

    // Verificar se há seleções antes de calcular
    if (totalSelections === 0) {
      console.warn('Nenhuma seleção encontrada para calcular resultados.');
      return null;
    }

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
    safeSaveToStorage('quizResult', result);
    // Also save strategic answers
    safeSaveToStorage('strategicAnswers', strategicAnswers);
    console.log('Results calculated and saved to localStorage:', result);

    return result;
  }, [answers, strategicAnswers]);

  // 5. Functions that depend on other complex functions
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      safeSaveToStorage('currentQuestionIndex', newIndex);
    } else {
      const results = calculateResults();
      if (results) {
        setQuizCompleted(true);
        safeSaveToStorage('quizCompleted', true);
      }
    }
  }, [currentQuestionIndex, calculateResults, quizQuestions.length]);

  const submitQuizIfComplete = useCallback(() => {
    // Calculate final results
    const results = calculateResults();
    if (!results) {
      console.error('Falha ao calcular resultados para submissão');
      return null;
    }
    
    setQuizCompleted(true);
    
    // Save everything to localStorage before navigating
    safeSaveToStorage('quizResult', results);
    safeSaveToStorage('strategicAnswers', strategicAnswers);
    safeSaveToStorage('quizCompleted', true);
    
    console.log('Results saved to localStorage before redirect:', results);
    
    return results;
  }, [calculateResults, strategicAnswers]);

  // 6. Validação de estado do quiz ao inicializar
  useEffect(() => {
    // Verificar se o quiz está em um estado inconsistente
    const isStateInconsistent = 
      (quizCompleted && !quizResult) || 
      (currentQuestionIndex >= quizQuestions.length) ||
      (Object.keys(answers).length === 0 && quizCompleted);
    
    if (isStateInconsistent) {
      console.warn('Estado do quiz inconsistente detectado, resetando...');
      resetQuiz();
    }
  }, [quizCompleted, quizResult, currentQuestionIndex, answers, resetQuiz]);

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
