import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion } from './QuizQuestion';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useNavigate } from 'react-router-dom';
import QuizFinalTransition from './QuizFinalTransition';
import { QuizHeader } from './quiz/QuizHeader';
import { QuizNavigation } from './quiz/QuizNavigation';
import { StrategicQuestions } from './quiz/StrategicQuestions';
import { MainTransition } from './quiz/MainTransition';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';
import { toast } from './ui/use-toast';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    handleStrategicAnswer: saveStrategicAnswer
  } = useQuizLogic();

  const quizContainerRef = useRef<HTMLDivElement>(null);

  const handleStrategicAnswer = (response: UserResponse) => {
    try {
      console.log('Strategic Answer Received:', response);
      setStrategicAnswers(prev => ({
        ...prev,
        [response.questionId]: response.selectedOptions
      }));
      
      saveStrategicAnswer(response.questionId, response.selectedOptions);
      
      // Check if we've answered the last strategic question
      if (response.questionId === strategicQuestions[strategicQuestions.length - 1].id) {
        setTimeout(() => {
          setShowingFinalTransition(true);
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
      localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
      navigate('/resultado');
    } catch (error) {
      console.error('Error showing result:', error);
      toast({
        title: "Erro ao mostrar resultado",
        description: "Não foi possível carregar o resultado. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!quizContainerRef.current) return;

    const questionElement = document.getElementById(
      showingStrategicQuestions && currentStrategicQuestionIndex < strategicQuestions.length
        ? `question-${strategicQuestions[currentStrategicQuestionIndex].id}`
        : currentQuestion ? `question-${currentQuestion.id}` : ''
    );
    
    if (questionElement) {
      questionElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [currentQuestionIndex, currentStrategicQuestionIndex, showingStrategicQuestions, currentQuestion]);

  return (
    <div className="min-h-screen bg-[#FEFEFE] px-4 py-8" ref={quizContainerRef}>
      <div className="max-w-4xl mx-auto">
        {showingTransition ? (
          <MainTransition
            onAnswer={handleStrategicAnswer}
            strategicAnswers={strategicAnswers}
          />
        ) : showingFinalTransition ? (
          <QuizFinalTransition onShowResult={handleShowResult} />
        ) : (
          <>
            <QuizHeader
              userName={user?.userName}
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={totalQuestions}
              showingStrategicQuestions={showingStrategicQuestions}
              currentStrategicQuestionIndex={currentStrategicQuestionIndex}
            />

            {showingStrategicQuestions ? (
              <StrategicQuestions
                currentQuestionIndex={currentStrategicQuestionIndex}
                answers={strategicAnswers}
                onAnswer={handleStrategicAnswer}
              />
            ) : currentQuestion ? (
              <QuizQuestion
                question={currentQuestion}
                onAnswer={handleAnswerSubmit}
                currentAnswers={currentAnswers}
              />
            ) : null}

            <QuizNavigation
              showPrevious={!showingStrategicQuestions && currentQuestion && currentQuestionIndex > 0}
              onPrevious={handlePrevious}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
