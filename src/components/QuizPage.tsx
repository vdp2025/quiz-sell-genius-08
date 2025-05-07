import React, { useEffect, useState, useCallback } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';
import QuizNavigation from './quiz/QuizNavigation';
import { strategicQuestions } from '@/data/strategicQuestions';
import { useAuth } from '../context/AuthContext';
import { trackQuizStart, trackQuizAnswer, trackQuizComplete, trackResultView } from '@/utils/analytics';

const QuizPage: React.FC = () => {
  // Get auth context
  const { user } = useAuth();
  
  // State declarations
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [showingTransition, setShowingTransition] = useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});
  const [quizStartTracked, setQuizStartTracked] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Get quiz logic functions
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    calculateResults,
    handleStrategicAnswer: saveStrategicAnswer,
    submitQuizIfComplete,
    canProceed
  } = useQuizLogic();

  // Calcular e atualizar a porcentagem de progresso
  useEffect(() => {
    const totalSteps = totalQuestions + strategicQuestions.length;
    let currentStep = 0;
    
    if (showingStrategicQuestions) {
      currentStep = totalQuestions + currentStrategicQuestionIndex;
    } else {
      currentStep = currentQuestionIndex;
    }
    
    const percentage = Math.round((currentStep / totalSteps) * 100);
    setProgressPercentage(percentage);
  }, [currentQuestionIndex, currentStrategicQuestionIndex, showingStrategicQuestions, totalQuestions]);

  // Track quiz start on component mount and save start time
  useEffect(() => {
    if (!quizStartTracked) {
      // Salvar o timestamp de início para calcular o tempo decorrido
      localStorage.setItem('quiz_start_time', Date.now().toString());
      
      // Obter informações do usuário, se disponível
      const userName = user?.userName || localStorage.getItem('userName') || 'Anônimo';
      // Obter o email do usuário se disponível, com segurança para tipos
      const userEmail = user?.email || localStorage.getItem('userEmail');
      
      trackQuizStart(userName, userEmail);
      setQuizStartTracked(true);
      
      console.log('Quiz iniciado por', userName, userEmail ? `(${userEmail})` : '');
    }
  }, [quizStartTracked, user]);

  // Handle strategic answer - Remover todos os timeouts
  const handleStrategicAnswer = useCallback((response: UserResponse) => {
    try {
      setStrategicAnswers(prev => ({
        ...prev,
        [response.questionId]: response.selectedOptions
      }));
      
      saveStrategicAnswer(response.questionId, response.selectedOptions);
      
      // Track strategic answer with additional progress info
      trackQuizAnswer(
        response.questionId, 
        response.selectedOptions,
        currentStrategicQuestionIndex + totalQuestions,
        totalQuestions + strategicQuestions.length
      );
      
      // Calculate completion percentage for funnel tracking
      const currentProgress = ((currentStrategicQuestionIndex + totalQuestions + 1) / 
                              (totalQuestions + strategicQuestions.length)) * 100;
      
      // Track funnel milestone if this is approximately halfway through
      if (currentProgress >= 45 && currentProgress <= 55) {
        trackQuizAnswer('quiz_middle_point', ['reached'], 
                       currentStrategicQuestionIndex + totalQuestions,
                       totalQuestions + strategicQuestions.length);
      }
      
      if (currentStrategicQuestionIndex === strategicQuestions.length - 1) {
        setShowingFinalTransition(true);
        // Track quiz completion
        trackQuizComplete();
      } else {
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      }
    } catch (error) {
      toast({
        title: "Erro no processamento da resposta",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [currentStrategicQuestionIndex, saveStrategicAnswer, totalQuestions]);

  // Handle answer submission - Remover todos os timeouts
  const handleAnswerSubmit = useCallback((response: UserResponse) => {
    try {
      handleAnswer(response.questionId, response.selectedOptions);
      
      // Track answer submission with more detailed info
      trackQuizAnswer(
        response.questionId, 
        response.selectedOptions, 
        currentQuestionIndex, 
        totalQuestions
      );
      
      // Calculate completion percentage for funnel tracking
      const currentProgress = ((currentQuestionIndex + 1) / 
                              (totalQuestions + strategicQuestions.length)) * 100;
      
      // Track funnel milestone if this is approximately halfway through the main questions
      if (currentProgress >= 20 && currentProgress <= 30) {
        trackQuizAnswer('quiz_first_quarter', ['reached'], 
                       currentQuestionIndex,
                       totalQuestions + strategicQuestions.length);
      }
    } catch (error) {
      toast({
        title: "Erro na submissão da resposta",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [currentQuestionIndex, handleAnswer, totalQuestions]);

  // Handle showing result - Remover timeout
  const handleShowResult = useCallback(() => {
    try {
      const results = submitQuizIfComplete();
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      
      if (results?.primaryStyle) {
        // Track result view with primary style
        trackResultView(results.primaryStyle.category);
      }
      
      window.location.href = '/resultado';
    } catch (error) {
      toast({
        title: "Erro ao mostrar resultado",
        description: "Não foi possível carregar o resultado. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [strategicAnswers, submitQuizIfComplete]);

  // Handle next click - Remover timeout
  const handleNextClick = useCallback(() => {
    if (!isLastQuestion) {
      handleNext();
    } else {
      calculateResults();
      setShowingTransition(true);
      // Track quiz main part completion with more context
      trackQuizAnswer(
        "quiz_main_complete", 
        ["completed"], 
        totalQuestions, 
        totalQuestions + strategicQuestions.length
      );
    }
  }, [calculateResults, handleNext, isLastQuestion, totalQuestions]);

  // Determine if we can proceed based on the question type and selected answers
  const getCurrentCanProceed = useCallback(() => {
    if (!currentQuestion) return false;
    
    const requiredSelections = currentQuestion.multiSelect || 1;
    const currentAnswersLength = currentAnswers?.length || 0;
    
    // Simplificar a verificação para evitar cálculos desnecessários
    return currentAnswersLength >= requiredSelections;
  }, [currentAnswers?.length, currentQuestion]);

  return (
    <div className="relative">
      {/* Barra de progresso */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-[#b29670]"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
      
      <QuizContainer>
        <div>
          <QuizTransitionManager
            showingTransition={showingTransition}
            showingFinalTransition={showingFinalTransition}
            handleStrategicAnswer={handleStrategicAnswer}
            strategicAnswers={strategicAnswers}
            handleShowResult={handleShowResult}
          />

          {!showingTransition && !showingFinalTransition && (
            <>
              <QuizContent
                user={user}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={totalQuestions}
                showingStrategicQuestions={showingStrategicQuestions}
                currentStrategicQuestionIndex={currentStrategicQuestionIndex}
                currentQuestion={currentQuestion}
                currentAnswers={currentAnswers}
                handleAnswerSubmit={handleAnswerSubmit}
                handleNextClick={handleNextClick}
                handlePrevious={handlePrevious}
              />
              
              <QuizNavigation
                currentQuestionType={currentQuestion?.id?.startsWith('strategic') ? 'strategic' : 'normal'}
                selectedOptionsCount={currentAnswers?.length || 0}
                isLastQuestion={isLastQuestion}
                onNext={handleNextClick}
                onPrevious={handlePrevious}
                canProceed={getCurrentCanProceed()}
              />
            </>
          )}
        </div>
      </QuizContainer>
    </div>
  );
};

export default QuizPage;
