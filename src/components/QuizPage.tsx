import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { UserResponse } from '@/types/quiz';
import { toast } from './ui/use-toast';
import { QuizContainer } from './quiz/QuizContainer';
import { QuizContent } from './quiz/QuizContent';
import { QuizTransitionManager } from './quiz/QuizTransitionManager';
import { QuizNavigation } from './navigation/QuizNavigation';
import { strategicQuestions } from '@/data/strategicQuestions';
import { useNavigate } from 'react-router-dom';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
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
    }
  }, [user]);

  const handleStrategicAnswer = (response: UserResponse) => {
    try {
      setStrategicAnswers(prev => ({
        ...prev,
        [response.questionId]: response.selectedOptions
      }));
      saveStrategicAnswer(response.questionId, response.selectedOptions);

      // Avança imediatamente
      if (currentStrategicQuestionIndex === strategicQuestions.length - 1) {
        setShowingFinalTransition(true);
      } else {
        setCurrentStrategicQuestionIndex(prev => prev + 1);
      }
    } catch (error) {
      toast({
        title: "Erro no processamento da resposta",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleAnswerSubmit = (response: UserResponse) => {
    try {
      handleAnswer(response.questionId, response.selectedOptions);
      // Avança ou mostra transição imediatamente
      if (!isLastQuestion) {
        handleNext();
      } else {
        calculateResults();
        setShowingTransition(true);
      }
    } catch (error) {
      toast({
        title: "Erro na submissão da resposta",
        description: "Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  const handleShowResult = () => {
    try {
      submitQuizIfComplete();
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      // navegação imediata sem timeout
      navigate('/resultado');
    } catch (error) {
      toast({
        title: "Erro ao mostrar resultado",
        description: "Por favor, tente novamente.",
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
        <>
          <QuizContent
            user={user}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            currentQuestion={currentQuestion}
            currentAnswers={currentAnswers}
            handleAnswerSubmit={handleAnswerSubmit}
            handleNextClick={handleNextClick}
            handlePrevious={handlePrevious}
          />

          <QuizNavigation
            currentStep={currentQuestionIndex + 1}
            totalSteps={totalQuestions}
            onNext={() => handleAnswerSubmit({ questionId: currentQuestion.id, selectedOptions: currentAnswers })}
            onPrevious={handlePrevious}
          />
        </>
      )}
    </QuizContainer>
  );
};

export default QuizPage;