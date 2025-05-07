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

  // Adicionando estado para controlar se o quiz está carregando
  const [isLoading, setIsLoading] = useState(true);
  // Estado para rastrear se o quiz está travado
  const [isStuck, setIsStuck] = useState(false);

  // Função para resetar o quiz - adicionada no topo para evitar problemas com dependências
  const resetQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStrategicAnswers({});
    setQuizCompleted(false);
    setQuizResult(null);
    setIsStuck(false);
    
    // Limpar localStorage
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('strategicAnswers');
    localStorage.removeItem('quizCompleted');
    localStorage.removeItem('quizResult');
    localStorage.removeItem('quizProgress');
    
    console.log('Quiz resetado com sucesso');
  }, []);

  // 2. Computed values
  const currentQuestion = quizQuestions[currentQuestionIndex] || quizQuestions[0];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentQuestion?.multiSelect 
    ? currentAnswers.length === currentQuestion.multiSelect 
    : currentAnswers.length > 0;
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

  // Melhoria na função handlePrevious para protegê-la contra estados inválidos
  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      safeSaveToStorage('currentQuestionIndex', newIndex);
      
      // Registrar progresso para prevenção de travamentos
      safeSaveToStorage('quizProgress', {
        timestamp: new Date().getTime(),
        action: 'previous',
        fromIndex: currentQuestionIndex,
        toIndex: newIndex
      });
    }
  }, [currentQuestionIndex]);

  // 4. Complex function that others depend on
  // Melhoria na função calculateResults para evitar loops e lidar melhor com erros
  const calculateResults = useCallback(() => {
    // Verificar se há respostas suficientes para calcular resultados
    if (Object.keys(answers).length < Math.max(1, Math.floor(quizQuestions.length * 0.5))) {
      console.warn('Respostas insuficientes para calcular resultado. O quiz deve ser completado primeiro.');
      return null;
    }

    try {
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
          if (option && option.styleCategory) {
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
    } catch (error) {
      console.error('Erro ao calcular resultados do quiz:', error);
      return null;
    }
  }, [answers, strategicAnswers]);

  // 5. Functions that depend on other complex functions
  // Melhorias na função handleNext para evitar travamentos e estados inconsistentes
  const handleNext = useCallback(() => {
    try {
      // Se estiver travado, não permitir avançar até que seja reiniciado
      if (isStuck) {
        console.warn('Quiz está travado, precisa ser reiniciado');
        return;
      }
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        const newIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(newIndex);
        safeSaveToStorage('currentQuestionIndex', newIndex);
        
        // Registrar progresso para prevenção de travamentos
        safeSaveToStorage('quizProgress', {
          timestamp: new Date().getTime(),
          action: 'next',
          fromIndex: currentQuestionIndex,
          toIndex: newIndex
        });
      } else {
        // Proteger contra chamadas repetidas
        if (quizCompleted) {
          console.log('Quiz já está completo, ignorando nova chamada');
          return;
        }
        
        const results = calculateResults();
        if (results) {
          setQuizCompleted(true);
          safeSaveToStorage('quizCompleted', true);
          
          // Registrar conclusão
          safeSaveToStorage('quizProgress', {
            timestamp: new Date().getTime(),
            action: 'completed',
            results: true
          });
        } else {
          console.error('Falha ao calcular resultados');
          setIsStuck(true);
          safeSaveToStorage('quizProgress', {
            timestamp: new Date().getTime(),
            action: 'error',
            message: 'Falha ao calcular resultados'
          });
        }
      }
    } catch (error) {
      console.error('Erro ao avançar para a próxima pergunta:', error);
      // Em caso de erro, tentar restaurar um estado consistente
      const savedIndex = safeGetFromStorage('currentQuestionIndex', 0);
      setCurrentQuestionIndex(savedIndex);
      setIsStuck(true);
    }
  }, [currentQuestionIndex, calculateResults, quizQuestions.length, quizCompleted, isStuck]);

  const submitQuizIfComplete = useCallback(() => {
    if (isStuck) {
      console.warn('Quiz está travado, não é possível enviar');
      return null;
    }
    
    // Calculate final results
    const results = calculateResults();
    if (!results) {
      console.error('Falha ao calcular resultados para submissão');
      setIsStuck(true);
      return null;
    }
    
    setQuizCompleted(true);
    
    // Save everything to localStorage before navigating
    safeSaveToStorage('quizResult', results);
    safeSaveToStorage('strategicAnswers', strategicAnswers);
    safeSaveToStorage('quizCompleted', true);
    
    console.log('Results saved to localStorage before redirect:', results);
    
    return results;
  }, [calculateResults, strategicAnswers, isStuck]);

  // Função para continuar o quiz de onde parou após atualização da página
  const continueQuiz = useCallback(() => {
    const savedIndex = safeGetFromStorage('currentQuestionIndex', 0);
    const savedAnswers = safeGetFromStorage('quizAnswers', {});
    const savedCompleted = safeGetFromStorage('quizCompleted', false);
    const savedResult = safeGetFromStorage('quizResult', null);
    
    // Verificar se temos dados para continuar
    if (Object.keys(savedAnswers).length > 0) {
      console.log('Continuando quiz do índice:', savedIndex);
      setAnswers(savedAnswers);
      
      // Se já foi completado, ir direto para resultados
      if (savedCompleted && savedResult) {
        setQuizCompleted(true);
        setQuizResult(savedResult);
      } else {
        // Caso contrário, ir para a pergunta salva
        const validIndex = Math.min(savedIndex, quizQuestions.length - 1);
        setCurrentQuestionIndex(validIndex);
      }
    } else {
      // Se não há dados para continuar, resetar
      console.log('Nenhum progresso anterior encontrado, iniciando novo quiz');
      resetQuiz();
    }
    
    setIsLoading(false);
  }, [resetQuiz]);

  // 6. Validação de estado do quiz ao inicializar
  // Melhoria no efeito de validação para verificar consistência de estado na inicialização e após atualizações
  useEffect(() => {
    // Verificar se o quiz está carregando
    if (isLoading) {
      continueQuiz();
      return;
    }
    
    // Verificar se o quiz está em um estado inconsistente
    const isStateInconsistent = 
      (quizCompleted && !quizResult) || 
      (currentQuestionIndex >= quizQuestions.length) ||
      (Object.keys(answers).length === 0 && quizCompleted) ||
      (currentQuestionIndex > 0 && Object.keys(answers).length === 0);
    
    if (isStateInconsistent) {
      console.warn('Estado do quiz inconsistente detectado, resetando...');
      resetQuiz();
      setIsLoading(false);
    }
  }, [quizCompleted, quizResult, currentQuestionIndex, answers, resetQuiz, quizQuestions.length, isLoading, continueQuiz]);

  // Novo efeito para salvar estado e evitar perda durante atualizações
  useEffect(() => {
    // Pular salvamento durante carregamento inicial
    if (isLoading) return;
    
    // Garantir que o estado atual é sempre salvo
    safeSaveToStorage('currentQuestionIndex', currentQuestionIndex);
    safeSaveToStorage('quizAnswers', answers);
    safeSaveToStorage('quizCompleted', quizCompleted);
    
    // Condicional para evitar salvar estado parcial de quizResult
    if (quizResult) {
      safeSaveToStorage('quizResult', quizResult);
    }
  }, [currentQuestionIndex, answers, quizCompleted, quizResult, isLoading]);

  // Verificar travamentos no quiz
  useEffect(() => {
    // Verificar se o quiz está travado após um período sem progresso
    const lastProgress = safeGetFromStorage('quizProgress', null);
    if (lastProgress && !quizCompleted) {
      const now = new Date().getTime();
      const lastTimestamp = lastProgress.timestamp || 0;
      
      // Se passar mais de 2 minutos sem progresso e não estiver na primeira pergunta
      if ((now - lastTimestamp) > 2 * 60 * 1000 && currentQuestionIndex > 0) {
        console.warn('Quiz pode estar travado, verificando...');
        
        // Se a última ação foi um erro, considerar travado
        if (lastProgress.action === 'error') {
          setIsStuck(true);
        }
      }
    }
  }, [currentQuestionIndex, quizCompleted]);

  return {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    currentAnswers,
    answers,
    strategicAnswers,
    canProceed,
    isLastQuestion,
    quizCompleted,
    quizResult,
    isLoading,
    isStuck,
    handleAnswer,
    handleStrategicAnswer,
    handleNext,
    handlePrevious,
    resetQuiz,
    submitQuizIfComplete,
    calculateResults,
    continueQuiz,
  };
};
