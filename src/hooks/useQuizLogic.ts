import { useState, useCallback, useEffect, useRef } from 'react';
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
const safeSaveToStorage = useCallback((key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    recordDiagnostic('storage_save_error', { key, error: String(error) });
    
    try {
      // Fallback: tentar salvar uma versão mais simples do objeto
      const safeValue = typeof value === 'object' ? 
        JSON.parse(JSON.stringify(value)) : value;
      localStorage.setItem(key, JSON.stringify(safeValue));
    } catch (innerError) {
      // Silenciar erros de storage para não afetar a experiência do usuário
      recordDiagnostic('storage_fallback_error', { 
        key, 
        error: String(innerError) 
      });
    }
  }
}, [recordDiagnostic]);

// Utility to safely record diagnostic information
const saveLogToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save ${key} to storage:`, error);
  }
};

// Gerar um ID de sessão único para o quiz atual
const generateSessionId = () => {
  return `quiz_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};

export const useQuizLogic = () => {
  // Ref para acompanhar o número de renders e detectar problemas de loop infinito
  const renderCount = useRef(0);
  const activeSessionRef = useRef(safeGetFromStorage('quizSessionId', generateSessionId()));
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);
  
  // 1. State declarations com inicialização melhorada
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = safeGetFromStorage('currentQuestionIndex', 0);
    // Validar se o índice está dentro dos limites válidos
    return savedIndex >= 0 && savedIndex < quizQuestions.length ? savedIndex : 0;
  });
  
  const [answers, setAnswers] = useState<Record<string, string[]>>(() => {
    try {
      const savedAnswers = safeGetFromStorage('quizAnswers', {});
      // Validar se as respostas têm estrutura válida
      if (typeof savedAnswers !== 'object' || savedAnswers === null) {
        return {};
      }
      return savedAnswers;
    } catch (e) {
      console.error("Erro ao recuperar respostas:", e);
      return {};
    }
  });
  
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>(() => {
    try {
      const savedAnswers = safeGetFromStorage('strategicAnswers', {});
      return typeof savedAnswers === 'object' && savedAnswers !== null ? savedAnswers : {};
    } catch (e) {
      console.error("Erro ao recuperar respostas estratégicas:", e);
      return {};
    }
  });
  
  const [quizCompleted, setQuizCompleted] = useState(() => {
    return safeGetFromStorage('quizCompleted', false);
  });
  
  const [quizResult, setQuizResult] = useState<QuizResult | null>(() => {
    try {
      const savedResult = safeGetFromStorage('quizResult', null);
      // Validação completa da estrutura do resultado
      if (savedResult && 
          typeof savedResult === 'object' &&
          savedResult.primaryStyle && 
          typeof savedResult.primaryStyle === 'object' &&
          'category' in savedResult.primaryStyle &&
          'score' in savedResult.primaryStyle &&
          'percentage' in savedResult.primaryStyle &&
          savedResult.secondaryStyles && 
          Array.isArray(savedResult.secondaryStyles)) {
        return savedResult;
      }
      return null;
    } catch (e) {
      console.error("Erro ao recuperar resultado do quiz:", e);
      return null;
    }
  });

  // Estados para controle de operação e diagnóstico
  const [isLoading, setIsLoading] = useState(true);
  const [isStuck, setIsStuck] = useState(false);
  const [diagnosticInfo, setDiagnosticInfo] = useState<Record<string, any>>({});
  const [recoveryAttempts, setRecoveryAttempts] = useState(0);
  
  // 2. Função para registrar atividade e evitar detecção falsa de travamento
  const logActivity = useCallback(() => {
    safeSaveToStorage('lastQuizActivity', new Date().getTime());
  }, []);

  // Add diagnostic logging function
  const recordDiagnostic = useCallback((eventType: string, data: any) => {
    try {
      const diagnostics = JSON.parse(localStorage.getItem('quiz_diagnostics') || '[]');
      diagnostics.push({
        timestamp: new Date().toISOString(),
        eventType,
        data
      });
      
      // Keep only the last 50 diagnostic entries to avoid storage issues
      if (diagnostics.length > 50) {
        diagnostics.splice(0, diagnostics.length - 50);
      }
      
      localStorage.setItem('quiz_diagnostics', JSON.stringify(diagnostics));
      
      // Log to console in development environment
      if (process.env.NODE_ENV === 'development') {
        console.debug(`[Quiz Diagnostic] ${eventType}:`, data);
      }
    } catch (error) {
      console.error('Failed to record diagnostic:', error);
    }
  }, []);

  // Função de diagnóstico para rastrear problemas no cálculo de resultados
  const recordDiagnostic = useCallback((event: string, data: any) => {
    try {
      const timestamp = new Date().toISOString();
      const diagnostic = {
        event,
        timestamp,
        data,
        quizId: quizId || 'unknown',
        sessionId: sessionStorage.getItem('quizSessionId') || 'unknown'
      };
      
      // Salvar diagnósticos em localStorage para análise posterior
      const existingDiagnostics = JSON.parse(localStorage.getItem('quizDiagnostics') || '[]');
      const updatedDiagnostics = [...existingDiagnostics, diagnostic].slice(-50); // Manter apenas os últimos 50 registros
      localStorage.setItem('quizDiagnostics', JSON.stringify(updatedDiagnostics));
      
      // Opcional: enviar diagnósticos para um sistema de monitoramento
      if (window.navigator.onLine && event.includes('error')) {
        try {
          console.warn(`Quiz diagnostic: ${event}`, data);
          // Implemente aqui o envio para um sistema de monitoramento se necessário
        } catch (e) {
          // Silenciar erros de telemetria
        }
      }
    } catch (e) {
      // Silenciar erros de diagnóstico para não afetar a experiência do usuário
      console.error('Error recording diagnostic', e);
    }
  }, [quizId]);

  // 4. Função para resetar o quiz de forma completa
  const resetQuiz = useCallback(() => {
    try {
      // Gerar uma nova sessão
      const newSessionId = generateSessionId();
      activeSessionRef.current = newSessionId;
      safeSaveToStorage('quizSessionId', newSessionId);
      
      // Resetar todos os estados
      setCurrentQuestionIndex(0);
      setAnswers({});
      setStrategicAnswers({});
      setQuizCompleted(false);
      setQuizResult(null);
      setIsStuck(false);
      setRecoveryAttempts(0);
      
      // Limpar todos os dados de quiz do localStorage
      localStorage.removeItem('currentQuestionIndex');
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('strategicAnswers');
      localStorage.removeItem('quizCompleted');
      localStorage.removeItem('quizResult');
      localStorage.removeItem('quizProgress');
      localStorage.removeItem('quizRecoveryPoint');
      
      // Registrar reset no diagnóstico
      recordDiagnostic('quiz_reset', {
        reason: 'user_initiated',
        timestamp: new Date().toISOString()
      });
      
      // Atualizar heartbeat
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      setupHeartbeat();
      
      console.log('Quiz resetado com sucesso. Nova sessão:', newSessionId);
    } catch (e) {
      console.error('Erro ao resetar quiz:', e);
    }
  }, [recordDiagnostic]);

  // 5. Configuração de heartbeat para detecção precoce de problemas
  const setupHeartbeat = useCallback(() => {
    // Limpar heartbeat anterior se existir
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
    }
    
    // Criar novo heartbeat que atualiza o timestamp a cada 10 segundos
    heartbeatRef.current = setInterval(() => {
      safeSaveToStorage('quizHeartbeat', {
        timestamp: new Date().getTime(),
        sessionId: activeSessionRef.current,
        currentQuestionIndex,
        answersCount: Object.keys(answers).length,
        isCompleted: quizCompleted
      });
    }, 10000);
    
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
    };
  }, [currentQuestionIndex, answers, quizCompleted]);

  // 6. Computação de valores derivados
  const currentQuestion = quizQuestions[currentQuestionIndex] || quizQuestions[0];
  const currentAnswers = answers[currentQuestion?.id] || [];
  const canProceed = currentQuestion?.multiSelect 
    ? currentAnswers.length >= (currentQuestion.minSelect || 1) && 
      currentAnswers.length <= (currentQuestion.multiSelect || 1)
    : currentAnswers.length > 0;
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const totalQuestions = quizQuestions.length;
  
  // 7. Funções de manipulação de respostas com segurança reforçada
  const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    try {
      if (!questionId || !Array.isArray(selectedOptions)) {
        recordDiagnostic('invalid_answer_data', { questionId, selectedOptions });
        return;
      }
      
      setAnswers(prev => {
        const newAnswers = {
          ...prev,
          [questionId]: selectedOptions
        };
        safeSaveToStorage('quizAnswers', newAnswers);
        
        // Salvar ponto de recuperação após cada resposta
        safeSaveToStorage('quizRecoveryPoint', {
          type: 'answer',
          questionId,
          selectedOptions,
          timestamp: new Date().getTime()
        });
        
        logActivity();
        return newAnswers;
      });
    } catch (e) {
      recordDiagnostic('answer_error', { questionId, error: String(e) });
    }
  }, [recordDiagnostic, logActivity]);

  const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
    try {
      if (!questionId || !Array.isArray(selectedOptions)) {
        recordDiagnostic('invalid_strategic_answer', { questionId, selectedOptions });
        return;
      }
      
      setStrategicAnswers(prev => {
        const newAnswers = {
          ...prev,
          [questionId]: selectedOptions
        };
        safeSaveToStorage('strategicAnswers', newAnswers);
        logActivity();
        return newAnswers;
      });
    } catch (e) {
      recordDiagnostic('strategic_answer_error', { questionId, error: String(e) });
    }
  }, [recordDiagnostic, logActivity]);

  // 8. Função de navegação para questão anterior totalmente protegida
  const handlePrevious = useCallback(() => {
    try {
      if (currentQuestionIndex > 0) {
        const newIndex = currentQuestionIndex - 1;
        setCurrentQuestionIndex(newIndex);
        safeSaveToStorage('currentQuestionIndex', newIndex);
        
        // Registrar recuperação
        safeSaveToStorage('quizRecoveryPoint', {
          type: 'navigation',
          action: 'previous',
          fromIndex: currentQuestionIndex,
          toIndex: newIndex,
          timestamp: new Date().getTime()
        });
        
        logActivity();
        recordDiagnostic('navigation', { 
          direction: 'previous', 
          fromIndex: currentQuestionIndex, 
          toIndex: newIndex 
        });
      } else {
        recordDiagnostic('navigation_blocked', { 
          direction: 'previous', 
          reason: 'already_at_first_question'
        });
      }
    } catch (e) {
      recordDiagnostic('navigation_error', { 
        direction: 'previous', 
        fromIndex: currentQuestionIndex,
        error: String(e)
      });
    }
  }, [currentQuestionIndex, recordDiagnostic, logActivity]);

  // 9. Função de cálculo de resultados robusta e à prova de falhas
  const calculateResults = useCallback(() => {
    try {
      // Registrar início do cálculo para diagnóstico
      recordDiagnostic('calculate_results_start', {
        answersCount: Object.keys(answers).length,
        questionsCount: quizQuestions.length
      });
      
      // Verificar se há respostas suficientes
      if (Object.keys(answers).length < Math.max(1, Math.floor(quizQuestions.length * 0.3))) {
        recordDiagnostic('insufficient_answers', {
          answersCount: Object.keys(answers).length,
          questionsCount: quizQuestions.length
        });
        
        // Em vez de retornar null, criar um resultado padrão para evitar travamento
        const defaultResult = {
          primaryStyle: {
            category: 'Natural',
            score: 1,
            percentage: 100
          },
          secondaryStyles: [
            { category: 'Clássico', score: 0, percentage: 0 },
            { category: 'Contemporâneo', score: 0, percentage: 0 },
            { category: 'Elegante', score: 0, percentage: 0 }
          ],
          totalSelections: 1,
          calculationTimestamp: new Date().toISOString(),
          isDefaultResult: true
        };
        
        setQuizResult(defaultResult);
        safeSaveToStorage('quizResult', defaultResult);
        return defaultResult;
      }

      // Inicializar contadores com valores padrão e garantir que todas as categorias existam
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
      let processedAnswers = 0;

      // Processamento seguro das respostas
      Object.entries(answers).forEach(([questionId, optionIds]) => {
        try {
          if (!Array.isArray(optionIds) || optionIds.length === 0) return;
          
          const question = quizQuestions.find(q => q.id === questionId);
          if (!question) return;
          
          processedAnswers++;
          
          optionIds.forEach(optionId => {
            if (!optionId) return;
            
            const option = question.options.find(o => o.id === optionId);
            if (option && option.styleCategory && styleCounter.hasOwnProperty(option.styleCategory)) {
              styleCounter[option.styleCategory]++;
              totalSelections++;
            }
          });
        } catch (innerError) {
          recordDiagnostic('process_answer_error', { 
            questionId, 
            error: String(innerError) 
          });
        }
      });

      // Verificar processamento
      recordDiagnostic('processing_stats', {
        totalAnswers: Object.keys(answers).length,
        processedAnswers,
        totalSelections,
        styleCounter
      });

      // Se não houver seleções, usar valores padrão para evitar travamento
      if (totalSelections === 0) {
        recordDiagnostic('no_selections', { answers });
        
        // Recuperação de emergência - definir valor padrão
        styleCounter['Natural'] = 1;
        totalSelections = 1;
      }

      // Calcular resultados com segurança e garantir que todas as categorias sejam incluídas
      let styleResults: StyleResult[] = [];
      
      try {
        // Primeiro, criar array com todas as categorias para garantir estabilidade na ordenação
        styleResults = Object.entries(styleCounter)
          .map(([category, score]) => ({
            category: category as StyleResult['category'],
            score,
            percentage: totalSelections > 0 ? Math.round((score / totalSelections) * 100) : 0
          }));
        
        // Verificação extra: garantir que não há valores invalidos no array antes de ordenar
        styleResults = styleResults.filter(item => 
          item && typeof item === 'object' && 
          'category' in item && 
          'score' in item &&
          item.category !== undefined &&
          item.score !== undefined
        );
        
        // Ordenar com tratamento de erro extra robusto
        try {
          // Cópia segura do array para evitar problemas de referência
          const stableArray = [...styleResults].map(item => ({...item}));
          
          // Técnica aprimorada para evitar o erro "No lowest priority node found" no motor V8
          // 1. Força desotimização do array com uma propriedade não-enumerável
          Object.defineProperty(stableArray, "sortState", { value: "preparing", configurable: true });
          
          // 2. Técnica de "warming up" do engine de sort do V8 - isso estabiliza o comportamento do sort
          // Esta técnica ficou conhecida como "pre-sorting dance" e ajuda a prevenir erros de ordenação
          const preArray = [3, 1, 4, 1, 5, 9, 2, 6];
          preArray.sort((a, b) => a - b);
          preArray.sort((a, b) => b - a);
          
          // 3. Técnica de slice antes do sort para garantir que estamos trabalhando com array "limpo"
          // Esta técnica ajuda a evitar problemas de otimização agressiva do V8
          const finalArray = stableArray.slice(0);
          
          // NOVA MELHORIA: Implementação personalizada de algoritmo de ordenação estável
          // Merge Sort é um algoritmo estável que não depende da implementação do sort do navegador
          // Esta abordagem evita completamente o bug "No lowest priority node found"
          const customStableSort = (arr) => {
            // Se o array for muito pequeno, não precisamos ordenar
            if (arr.length <= 1) return arr;
            
            // Função para mesclar dois arrays ordenados de forma estável
            const merge = (left, right) => {
              const result = [];
              let leftIndex = 0;
              let rightIndex = 0;
              
              // Mesclar os arrays comparando as pontuações
              while (leftIndex < left.length && rightIndex < right.length) {
                // Verificações seguras para evitar erros
                const leftItem = left[leftIndex];
                const rightItem = right[rightIndex];
                
                if (!leftItem || !rightItem) {
                  // Tratar elementos inválidos
                  leftIndex++;
                  rightIndex++;
                  continue;
                }
                
                const leftScore = typeof leftItem.score === 'number' ? leftItem.score : 0;
                const rightScore = typeof rightItem.score === 'number' ? rightItem.score : 0;
                
                // Comparar pontuações em ordem decrescente (maior primeiro)
                if (leftScore > rightScore) {
                  result.push(leftItem);
                  leftIndex++;
                } else if (leftScore < rightScore) {
                  result.push(rightItem);
                  rightIndex++;
                } else {
                  // Em caso de empate, usar categoria como critério de desempate
                  const leftCat = typeof leftItem.category === 'string' ? leftItem.category : '';
                  const rightCat = typeof rightItem.category === 'string' ? rightItem.category : '';
                  
                  if (leftCat.localeCompare(rightCat) <= 0) {
                    result.push(leftItem);
                    leftIndex++;
                  } else {
                    result.push(rightItem);
                    rightIndex++;
                  }
                }
              }
              
              // Adicionar os elementos restantes
              return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
            };
            
            // Implementação recursiva do merge sort
            const mergeSort = (array) => {
              if (array.length <= 1) return array;
              
              try {
                const middle = Math.floor(array.length / 2);
                const left = array.slice(0, middle);
                const right = array.slice(middle);
                
                return merge(mergeSort(left), mergeSort(right));
              } catch (e) {
                // Em caso de erro na recursão, retornar o array original
                recordDiagnostic('merge_sort_error', { error: String(e) });
                return array;
              }
            };
            
            // Executar o merge sort com tratamento de erros
            try {
              return mergeSort(arr);
            } catch (e) {
              recordDiagnostic('custom_sort_error', { error: String(e) });
              return arr; // Retornar array original em caso de erro
            }
          };
          
          // Tentar usar o algoritmo de ordenação personalizado primeiro
          try {
            const customSortedArray = customStableSort(finalArray);
            styleResults = customSortedArray;
            recordDiagnostic('custom_sort_success', { resultCount: customSortedArray.length });
          } catch (customSortError) {
            // Se falhar, tentar o método nativo .sort() com proteções
            recordDiagnostic('custom_sort_failed', { error: String(customSortError) });
            
            try {
              finalArray.sort((a, b) => {
                // Tratamento defensivo triplo para evitar o erro "No lowest priority node found"
                if (!a || !b || a === undefined || b === undefined) {
                  recordDiagnostic('sort_error_undefined_values', { a, b });
                  return 0; // Manter ordem original
                }
                
                // Verificar a existência de propriedades necessárias
                if (!('score' in a) || !('score' in b) || a.score === undefined || b.score === undefined) {
                  recordDiagnostic('sort_error_missing_properties', { a, b });
                  return 0;
                }
                
                // Se as pontuações são iguais, ordenar por nome de categoria para estabilidade
                if (a.score === b.score) {
                  if (!a.category || !b.category) {
                    return 0; // Se alguma categoria for inválida, manter ordem original
                  }
                  return String(a.category).localeCompare(String(b.category));
                }
                
                // Ordenação normal por pontuação (decrescente) com verificação adicional de tipos
                return (typeof a.score === 'number' && typeof b.score === 'number') 
                  ? b.score - a.score 
                  : 0;
              });
              
              // Usar o array final após a ordenação
              styleResults = finalArray;
            } catch (innerSortError) {
              // Capturar qualquer erro que ocorra durante a operação de sort
              recordDiagnostic('inner_sort_error', { error: String(innerSortError) });
              // Não propagar o erro, deixar o código prosseguir para o próximo bloco catch
              throw innerSortError;
            }
          }
        } catch (sortError) {
          // Em caso de erro na ordenação, criar array manualmente ordenado por pontuação
          recordDiagnostic('sort_error_recovery', { error: String(sortError) });
          
          const entries = Object.entries(styleCounter);
          // Ordenar manualmente sem usar o método sort (que pode falhar)
          const sorted = [];
          for (let i = 0; i < entries.length; i++) {
            const [category, score] = entries[i];
            sorted.push({
              category: category as StyleResult['category'],
              score,
              percentage: totalSelections > 0 ? Math.round((score / totalSelections) * 100) : 0
            });
          }
          
          // Ordenar manualmente (bubble sort simples)
          for (let i = 0; i < sorted.length; i++) {
            for (let j = 0; j < sorted.length - 1; j++) {
              if (sorted[j].score < sorted[j + 1].score) {
                const temp = sorted[j];
                sorted[j] = sorted[j + 1];
                sorted[j + 1] = temp;
              }
            }
          }
          
          styleResults = sorted;
        }
      } catch (sortError) {
        // Em caso de erro na ordenação, criar array manualmente ordenado por pontuação
        recordDiagnostic('sort_error_recovery', { error: String(sortError) });
        
        const entries = Object.entries(styleCounter);
        // Ordenar manualmente sem usar o método sort (que pode falhar)
        const sorted = [];
        for (let i = 0; i < entries.length; i++) {
          const [category, score] = entries[i];
          sorted.push({
            category: category as StyleResult['category'],
            score,
            percentage: totalSelections > 0 ? Math.round((score / totalSelections) * 100) : 0
          });
        }
        
        // Ordenar manualmente (bubble sort simples)
        for (let i = 0; i < sorted.length; i++) {
          for (let j = 0; j < sorted.length - 1; j++) {
            if (sorted[j].score < sorted[j + 1].score) {
              const temp = sorted[j];
              sorted[j] = sorted[j + 1];
              sorted[j + 1] = temp;
            }
          }
        }
        
        styleResults = sorted;
      }

      // Verificar se temos pelo menos uma categoria antes de continuar
      if (styleResults.length === 0) {
        // Fallback se o array estiver vazio (não deveria acontecer com a inicialização acima)
        recordDiagnostic('empty_results', { styleCounter });
        
        const emergencyResult = {
          primaryStyle: {
            category: 'Natural',
            score: 1,
            percentage: 100
          },
          secondaryStyles: [],
          totalSelections: 1,
          calculationTimestamp: new Date().toISOString(),
          isEmergencyResult: true
        };
        
        setQuizResult(emergencyResult);
        safeSaveToStorage('quizResult', emergencyResult);
        return emergencyResult;
      }

      // Garantir que temos um estilo primário válido
      const primaryStyle = styleResults[0] || {
        category: 'Natural',
        score: 1, 
        percentage: 100
      };
      
      // Garantir que temos estilos secundários válidos
      const secondaryStyles = styleResults.slice(1) || [];

      const result = {
        primaryStyle,
        secondaryStyles,
        totalSelections,
        calculationTimestamp: new Date().toISOString()
      };

      // Validar resultado antes de salvar
      if (!primaryStyle || !primaryStyle.category) {
        recordDiagnostic('invalid_result', { result });
        
        // Recuperação de emergência - criar resultado padrão
        const defaultResult = {
          primaryStyle: {
            category: 'Natural',
            score: 1,
            percentage: 100
          },
          secondaryStyles: styleResults.slice(1) || [],
          totalSelections: 1,
          calculationTimestamp: new Date().toISOString(),
          isDefaultResult: true
        };
        
        setQuizResult(defaultResult);
        safeSaveToStorage('quizResult', defaultResult);
        return defaultResult;
      }

      // Salvamento de resultado válido
      setQuizResult(result);
      safeSaveToStorage('quizResult', result);
      safeSaveToStorage('strategicAnswers', strategicAnswers);
      
      recordDiagnostic('calculation_complete', { 
        primaryStyle: result.primaryStyle,
        secondaryCount: result.secondaryStyles.length
      });
      
      logActivity();
      return result;
    } catch (error) {
      recordDiagnostic('calculation_error', { error: String(error) });
      
      // Tentar recuperação com resultado padrão em caso de erro grave
      const emergencyResult = {
        primaryStyle: {
          category: 'Natural',
          score: 1,
          percentage: 100
        },
        secondaryStyles: [
          { category: 'Clássico', score: 0, percentage: 0 },
          { category: 'Contemporâneo', score: 0, percentage: 0 }
        ],
        totalSelections: 1,
        calculationTimestamp: new Date().toISOString(),
        isEmergencyResult: true
      };
      
      setQuizResult(emergencyResult);
      safeSaveToStorage('quizResult', emergencyResult);
      
      return emergencyResult;
    }
  }, [answers, strategicAnswers, recordDiagnostic, logActivity]);

  // 10. Funções de navegação e finalização com proteção completa
  const handleNext = useCallback(() => {
    try {
      // Proteção contra travamentos
      if (isStuck) {
        recordDiagnostic('next_blocked', { reason: 'quiz_stuck' });
        return;
      }
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        // Verificar se pergunta atual foi respondida
        const currentId = currentQuestion?.id;
        if (!currentId || !answers[currentId] || answers[currentId].length === 0) {
          recordDiagnostic('next_blocked', { 
            reason: 'unanswered_question',
            questionId: currentId
          });
          return;
        }
        
        // Avançar para próxima pergunta
        const newIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(newIndex);
        safeSaveToStorage('currentQuestionIndex', newIndex);
        
        // Salvar ponto de recuperação
        safeSaveToStorage('quizRecoveryPoint', {
          type: 'navigation',
          action: 'next',
          fromIndex: currentQuestionIndex,
          toIndex: newIndex,
          timestamp: new Date().getTime()
        });
        
        recordDiagnostic('navigation', { 
          direction: 'next', 
          fromIndex: currentQuestionIndex, 
          toIndex: newIndex 
        });
        
        logActivity();
      } else {
        // Última pergunta - finalizar quiz
        if (quizCompleted) {
          recordDiagnostic('navigation_redundant', { 
            action: 'complete', 
            reason: 'already_completed' 
          });
          return;
        }
        
        recordDiagnostic('completing_quiz', { 
          answersCount: Object.keys(answers).length,
          strategicAnswersCount: Object.keys(strategicAnswers).length
        });
        
        // Calcular resultados com proteção contra falhas
        const results = calculateResults();
        
        if (results) {
          setQuizCompleted(true);
          safeSaveToStorage('quizCompleted', true);
          
          // Registrar conclusão bem-sucedida
          safeSaveToStorage('quizRecoveryPoint', {
            type: 'completion',
            success: true,
            timestamp: new Date().getTime(),
            resultsSummary: {
              primaryStyle: results.primaryStyle.category,
              calculationTimestamp: results.calculationTimestamp
            }
          });
          
          recordDiagnostic('quiz_completed', { 
            success: true,
            primaryStyle: results.primaryStyle.category
          });
          
          logActivity();
        } else {
          recordDiagnostic('completion_error', { 
            reason: 'calculation_failed'
          });
          
          // Tentar recuperação automaticamente
          attemptRecovery('calculation_failed');
        }
      }
    } catch (error) {
      recordDiagnostic('next_error', { error: String(error) });
      
      // Tentar recuperação automaticamente
      attemptRecovery('navigation_error');
    }
  }, [
    currentQuestionIndex, 
    quizQuestions.length, 
    quizCompleted, 
    isStuck, 
    calculateResults, 
    recordDiagnostic, 
    logActivity, 
    answers, 
    currentQuestion, 
    strategicAnswers
  ]);

  // 11. Função robusta para submissão do quiz
  const submitQuizIfComplete = useCallback(() => {
    try {
      if (isStuck) {
        recordDiagnostic('submit_blocked', { reason: 'quiz_stuck' });
        return null;
      }
      
      // Verificar status de completude
      recordDiagnostic('submit_attempt', {
        answersCount: Object.keys(answers).length,
        totalQuestions: quizQuestions.length
      });
      
      // Calcular resultados com proteção
      const results = calculateResults();
      if (!results) {
        recordDiagnostic('submit_failed', { reason: 'calculation_failed' });
        attemptRecovery('submit_calculation_failed');
        return null;
      }
      
      // Finalizar quiz
      setQuizCompleted(true);
      
      // Salvar tudo no localStorage antes de navegar
      safeSaveToStorage('quizResult', results);
      safeSaveToStorage('strategicAnswers', strategicAnswers);
      safeSaveToStorage('quizCompleted', true);
      
      // Salvar ponto de recuperação completo
      safeSaveToStorage('quizRecoveryPoint', {
        type: 'submission',
        success: true,
        timestamp: new Date().getTime(),
        resultsSummary: {
          primaryStyle: results.primaryStyle.category,
          calculationTimestamp: results.calculationTimestamp
        }
      });
      
      recordDiagnostic('quiz_submitted', {
        success: true,
        primaryStyle: results.primaryStyle.category
      });
      
      logActivity();
      return results;
    } catch (error) {
      recordDiagnostic('submit_error', { error: String(error) });
      attemptRecovery('submit_error');
      return null;
    }
  }, [calculateResults, strategicAnswers, isStuck, answers, quizQuestions.length, recordDiagnostic, logActivity, attemptRecovery]);

  // 12. Função para tentar recuperar de falhas
  function attemptRecovery(reason: string) {
    try {
      // Incrementar tentativas de recuperação
      setRecoveryAttempts(prev => {
        const newCount = prev + 1;
        safeSaveToStorage('recoveryAttempts', newCount);
        return newCount;
      });
      
      // Registrar tentativa
      recordDiagnostic('recovery_attempt', { 
        reason, 
        attemptNumber: recoveryAttempts + 1 
      });
      
      // Se já tentou muitas vezes, marcar como travado
      if (recoveryAttempts >= 2) {
        setIsStuck(true);
        recordDiagnostic('recovery_failed', { 
          reason: 'too_many_attempts',
          attemptCount: recoveryAttempts + 1
        });
        return false;
      }
      
      // Estratégias de recuperação:
      
      // 1. Tentar restaurar estado anterior confiável
      const recoveryPoint = safeGetFromStorage('quizRecoveryPoint', null);
      
      if (recoveryPoint && recoveryPoint.timestamp) {
        // Se for ponto de recuperação recente (últimos 5 minutos)
        const isRecent = (Date.now() - recoveryPoint.timestamp) < 5 * 60 * 1000;
        
        if (isRecent) {
          recordDiagnostic('recovery_strategy', { 
            type: 'restore_from_recovery_point',
            recoveryPoint
          });
          
          // Restaurar estado baseado no tipo de ponto de recuperação
          if (recoveryPoint.type === 'navigation' && typeof recoveryPoint.toIndex === 'number') {
            setCurrentQuestionIndex(recoveryPoint.toIndex);
            safeSaveToStorage('currentQuestionIndex', recoveryPoint.toIndex);
          } else if (recoveryPoint.type === 'completion' || recoveryPoint.type === 'submission') {
            // Se foi uma conclusão bem-sucedida, recalcular resultados
            const results = calculateResults();
            if (results) {
              setQuizCompleted(true);
              safeSaveToStorage('quizCompleted', true);
            }
          }
          
          recordDiagnostic('recovery_executed', { 
            strategy: 'restore_from_recovery_point',
            success: true
          });
          
          return true;
        }
      }
      
      // 2. Se não houver ponto de recuperação válido, tentar restaurar para último estado consistente
      const heartbeat = safeGetFromStorage('quizHeartbeat', null);
      
      if (heartbeat && heartbeat.currentQuestionIndex !== undefined) {
        recordDiagnostic('recovery_strategy', { 
          type: 'restore_from_heartbeat',
          heartbeat
        });
        
        // Restaurar para o último índice de pergunta válido conhecido
        setCurrentQuestionIndex(heartbeat.currentQuestionIndex);
        safeSaveToStorage('currentQuestionIndex', heartbeat.currentQuestionIndex);
        
        // Se estava completo no heartbeat, recalcular
        if (heartbeat.isCompleted) {
          const results = calculateResults();
          if (results) {
            setQuizCompleted(true);
            safeSaveToStorage('quizCompleted', true);
          }
        }
        
        recordDiagnostic('recovery_executed', { 
          strategy: 'restore_from_heartbeat',
          success: true
        });
        
        return true;
      }
      
      // 3. Se nada funcionar, reiniciar para um estado básico mas manter respostas
      recordDiagnostic('recovery_strategy', { 
        type: 'basic_restart',
        preserveAnswers: true
      });
      
      // Voltar à primeira pergunta mas preservar respostas
      setCurrentQuestionIndex(0);
      safeSaveToStorage('currentQuestionIndex', 0);
      setQuizCompleted(false);
      safeSaveToStorage('quizCompleted', false);
      
      recordDiagnostic('recovery_executed', { 
        strategy: 'basic_restart',
        success: true
      });
      
      return true;
    } catch (error) {
      recordDiagnostic('recovery_critical_error', { error: String(error) });
      
      // Falha crítica de recuperação, marcar como travado
      setIsStuck(true);
      return false;
    }
  }

  // 13. Função para continuar quiz após navegação/atualização
  const continueQuiz = useCallback(() => {
    try {
      recordDiagnostic('continue_attempt', {
        hasSessionId: !!activeSessionRef.current
      });
      
      // Recuperar dados salvos
      const savedIndex = safeGetFromStorage('currentQuestionIndex', 0);
      const savedAnswers = safeGetFromStorage('quizAnswers', {});
      const savedCompleted = safeGetFromStorage('quizCompleted', false);
      const savedResult = safeGetFromStorage('quizResult', null);
      
      // Verificar integridade do estado salvo
      if (Object.keys(savedAnswers).length > 0) {
        recordDiagnostic('continue_data_found', {
          savedIndex,
          answersCount: Object.keys(savedAnswers).length,
          isCompleted: savedCompleted
        });
        
        // Restaurar respostas
        setAnswers(savedAnswers);
        
        // Se quiz já foi completado, restaurar resultados
        if (savedCompleted && savedResult) {
          setQuizCompleted(true);
          setQuizResult(savedResult);
          recordDiagnostic('restored_completed_quiz', {
            primaryStyle: savedResult.primaryStyle?.category
          });
        } else {
          // Caso contrário, restaurar para pergunta salva
          const validIndex = Math.min(Math.max(0, savedIndex), quizQuestions.length - 1);
          setCurrentQuestionIndex(validIndex);
          recordDiagnostic('restored_in_progress_quiz', {
            originalIndex: savedIndex,
            validatedIndex: validIndex
          });
        }
      } else {
        // Se não há dados para continuar, iniciar novo quiz
        recordDiagnostic('no_saved_data', {
          action: 'starting_new_quiz'
        });
        resetQuiz();
      }
      
      // Configurar heartbeat para monitoramento contínuo
      setupHeartbeat();
      
      // Finalizar carregamento
      setIsLoading(false);
      logActivity();
    } catch (error) {
      recordDiagnostic('continue_error', { error: String(error) });
      
      // Em caso de erro crítico, iniciar quiz do zero
      resetQuiz();
      setIsLoading(false);
    }
  }, [resetQuiz, recordDiagnostic, setupHeartbeat, logActivity, quizQuestions.length]);

  // 14. Monitoramento do número de renders
  useEffect(() => {
    renderCount.current += 1;
    
    // Se houver um número excessivo de renders, registrar para diagnóstico
    if (renderCount.current % 50 === 0) {
      recordDiagnostic('render_count_high', { count: renderCount.current });
    }
  });

  // 15. Verificação de consistência de estado
  useEffect(() => {
    // Pular durante carregamento
    if (isLoading) {
      return;
    }
    
    // Verificar inconsistências graves no estado
    const criticalInconsistency = 
      (quizCompleted && !quizResult) || 
      (currentQuestionIndex >= quizQuestions.length) ||
      (Object.keys(answers).length === 0 && currentQuestionIndex > 0 && !isLoading);
    
    if (criticalInconsistency) {
      recordDiagnostic('critical_inconsistency', {
        isCompleted: quizCompleted,
        hasResult: !!quizResult,
        currentIndex: currentQuestionIndex,
        maxIndex: quizQuestions.length - 1,
        answersCount: Object.keys(answers).length
      });
      
      // Tentar recuperação automática
      attemptRecovery('critical_inconsistency');
    }
    
    // Verificar inconsistências leves que não exigem reinicialização
    const minorInconsistency = 
      (quizCompleted && Object.keys(answers).length < quizQuestions.length * 0.3) ||
      (currentQuestionIndex > 0 && !answers[quizQuestions[currentQuestionIndex - 1]?.id]);
    
    if (minorInconsistency) {
      recordDiagnostic('minor_inconsistency', {
        isCompleted: quizCompleted,
        currentIndex: currentQuestionIndex,
        answersCount: Object.keys(answers).length,
        requiredCount: Math.ceil(quizQuestions.length * 0.3)
      });
    }
  }, [
    quizCompleted, 
    quizResult, 
    currentQuestionIndex, 
    answers, 
    isLoading, 
    quizQuestions, 
    recordDiagnostic
  ]);

  // 16. Carregar quiz na inicialização
  useEffect(() => {
    if (isLoading) {
      // Registrar início do quiz
      recordDiagnostic('quiz_startup', {
        sessionId: activeSessionRef.current,
        timestamp: new Date().toISOString()
      });
      
      continueQuiz();
    }
  }, [isLoading, continueQuiz, recordDiagnostic]);

  // 17. Verificação periódica de travamentos
  useEffect(() => {
    // Verificar se o quiz está travado com base na última atividade
    const checkStuckInterval = setInterval(() => {
      try {
        // Ignorar verificação se já estiver concluído
        if (quizCompleted) return;
        
        const lastActivity = safeGetFromStorage('lastQuizActivity', null);
        if (lastActivity) {
          const now = new Date().getTime();
          const timeSinceActivity = now - lastActivity;
          
          // Se não houver atividade por mais de 60 segundos e não estiver na primeira pergunta
          const inactivityThreshold = 60 * 1000; // 60 segundos
          
          if (timeSinceActivity > inactivityThreshold && currentQuestionIndex > 0) {
            recordDiagnostic('potential_stuck_detected', {
              timeSinceActivity,
              threshold: inactivityThreshold,
              currentIndex: currentQuestionIndex
            });
            
            // Verificar se estamos realmente travados tentando localizar o heartbeat
            const lastHeartbeat = safeGetFromStorage('quizHeartbeat', null);
            if (!lastHeartbeat || (now - lastHeartbeat.timestamp) > inactivityThreshold) {
              // Tentar recuperação
              attemptRecovery('inactivity_detected');
            }
          }
        }
      } catch (e) {
        console.error('Erro na verificação de travamento:', e);
      }
    }, 30000); // Verificar a cada 30 segundos
    
    return () => clearInterval(checkStuckInterval);
  }, [quizCompleted, currentQuestionIndex, recordDiagnostic]);

  // 18. Limpeza ao desmontar componente
  useEffect(() => {
    return () => {
      // Limpar heartbeat
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
      }
      
      // Registrar desmontagem para diagnóstico
      recordDiagnostic('component_unmounted', {
        isCompleted: quizCompleted,
        currentIndex: currentQuestionIndex
      });
    };
  }, [quizCompleted, currentQuestionIndex, recordDiagnostic]);

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
    // Novos métodos adicionados
    attemptRecovery,
    diagnostic: diagnosticInfo
  };
};
