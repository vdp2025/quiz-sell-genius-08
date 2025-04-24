
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuiz } from '../context/QuizContext';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';
import { QuizNavigation } from './navigation/QuizNavigation';
import { strategicQuestions } from '@/data/strategicQuestions';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  // State declarations
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [showingTransition, setShowingTransition] = useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});

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
    submitQuizIfComplete
  } = useQuiz();

  // Handle strategic answer
  const handleStrategicAnswer = (response: UserResponse) => {
    try {
      console.log('Strategic Answer Received:', response);
      setStrategicAnswers(prev => ({
        ...prev,
        [response.questionId]: response.selectedOptions
      }));
      
      saveStrategicAnswer(response.questionId, response.selectedOptions);
      
      if (currentStrategicQuestionIndex === strategicQuestions.length - 1) {
        setTimeout(() => {
          setShowingFinalTransition(true);
        }, 500);
      } else {
        setTimeout(() => {
          setCurrentStrategicQuestionIndex(prev => prev + 1);
        }, 500);
      }
    } catch (error) {
      console.error('Error processing strategic answer:', error);
      toast({
        title: "Erro no processamento da resposta",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Handle answer submission
  const handleAnswerSubmit = (response: UserResponse) => {
    try {
      handleAnswer(response.questionId, response.selectedOptions);
      
      if (response.selectedOptions.length === currentQuestion.multiSelect) {
        if (!isLastQuestion) {
          setTimeout(() => {
            handleNext();
          }, 500);
        } else {
          console.log('Last question reached, showing transition...');
          setTimeout(() => {
            calculateResults();
            setShowingTransition(true);
          }, 800);
        }
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      toast({
        title: "Erro na submissão da resposta",
        description: "Não foi possível processar sua resposta. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Handle showing result
  const handleShowResult = () => {
    try {
      const results = submitQuizIfComplete();
      console.log('Final results being saved:', results);
      
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      
      setTimeout(() => {
        console.log('Navigating to /resultado page...');
        window.location.href = '/resultado';
      }, 500);
    } catch (error) {
      console.error('Error showing result:', error);
      toast({
        title: "Erro ao mostrar resultado",
        description: "Não foi possível carregar o resultado. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  // Handle next click
  const handleNextClick = () => {
    if (!isLastQuestion) {
      handleNext();
    } else {
      calculateResults();
      setShowingTransition(true);
    }
  };

  // Save user name to localStorage
  useEffect(() => {
    if (user?.userName) {
      localStorage.setItem('userName', user.userName);
      console.log('User name saved:', user.userName);
    }
  }, [user]);

  return (
    <QuizContainer>
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
            currentStep={currentQuestionIndex + 1}
            totalSteps={totalQuestions}
            onNext={handleNextClick}
            onPrevious={handlePrevious}
          />
        </>
      )}
    </QuizContainer>
  );
};

export default QuizPage;
