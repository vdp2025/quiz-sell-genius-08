import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const [showingStrategicQuestions, setShowingStrategicQuestions] = React.useState(false);
  const [showingTransition, setShowingTransition] = React.useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = React.useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = React.useState(0);
  const [strategicAnswers, setStrategicAnswers] = React.useState<Record<string, string[]>>({});

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
  } = useQuizLogic();

  useEffect(() => {
    if (user?.userName) {
      localStorage.setItem('userName', user.userName);
      console.log('User name saved:', user.userName);
    }
  }, [user]);

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

  const handleNextClick = () => {
    if (!isLastQuestion) {
      handleNext();
    } else {
      calculateResults();
      setShowingTransition(true);
    }
  };

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
      )}
    </QuizContainer>
  );
};

export default QuizPage;
