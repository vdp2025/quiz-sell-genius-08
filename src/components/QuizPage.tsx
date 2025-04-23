
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuizLogic } from '../hooks/useQuizLogic';
import QuizHeader from './quiz/QuizHeader';
import QuestionCard from './quiz/QuestionCard';
import QuizProgress from './quiz/QuizProgress';
import QuizNav from './quiz/QuizNav';
import { QuizContainer } from './quiz/QuizContainer';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    quizCompleted,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetQuiz,
    submitQuizIfComplete,
    totalQuestions
  } = useQuizLogic();

  // Effect to handle navigation after quiz completion
  useEffect(() => {
    if (quizCompleted) {
      // Make sure we navigate to the correct route: /quiz/result
      navigate('/quiz/result');
      console.log('Navigating to /quiz/result page...');
    }
  }, [quizCompleted, navigate]);

  if (!currentQuestion) {
    return (
      <QuizContainer>
        <div className="text-center">
          <p className="text-xl text-[#432818]">Quiz não disponível no momento.</p>
          <Button 
            onClick={resetQuiz}
            className="mt-4 bg-[#B89B7A] hover:bg-[#A38A69]"
          >
            Tentar novamente
          </Button>
        </div>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer>
      <QuizHeader
        question={currentQuestion} 
        questionIndex={currentQuestionIndex} 
        totalQuestions={totalQuestions}
      />

      <QuestionCard
        question={currentQuestion}
        selectedOptions={currentAnswers}
        onSelect={handleAnswer}
      />

      <QuizProgress 
        currentStep={currentQuestionIndex} 
        totalSteps={totalQuestions}
      />

      <QuizNav
        onNext={isLastQuestion ? submitQuizIfComplete : handleNext}
        onPrev={handlePrevious}
        canProceed={canProceed}
        isLastQuestion={isLastQuestion}
        isFirstQuestion={currentQuestionIndex === 0}
      />
    </QuizContainer>
  );
};

export default QuizPage;
