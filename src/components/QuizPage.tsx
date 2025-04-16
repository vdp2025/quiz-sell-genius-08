
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion } from './QuizQuestion';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserResponse } from '../types/quiz';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useNavigate } from 'react-router-dom';
import { Progress } from './ui/progress';
import { AnimatedWrapper } from './ui/animated-wrapper';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions
  } = useQuizLogic();

  const handleAnswerSubmit = (response: UserResponse) => {
    handleAnswer(response.questionId, response.selectedOptions);
  };

  const handleNextClick = () => {
    if (isLastQuestion) {
      navigate('/resultado');
    } else {
      handleNext();
    }
  };

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedWrapper className="mb-4">
          <Progress value={progressPercentage} className="w-full h-2 bg-[#B89B7A]/20" />
        </AnimatedWrapper>
        
        <AnimatedWrapper className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-playfair text-[#432818]">
            Olá, {user?.userName || 'Visitante'}!
          </h1>
          <div className="text-sm text-[#1A1818]/60">
            Questão {currentQuestionIndex + 1} de {totalQuestions}
          </div>
        </AnimatedWrapper>

        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswerSubmit}
          currentAnswers={currentAnswers}
        />

        <AnimatedWrapper className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            variant="outline"
            className="flex items-center gap-2 border-[#B89B7A]/30 text-[#432818] transition-all duration-200 hover:border-[#B89B7A]"
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </Button>

          <Button
            onClick={handleNextClick}
            disabled={!canProceed}
            className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#B89B7A]/90 transition-all duration-200"
          >
            {isLastQuestion ? 'Ver Resultado' : 'Próxima'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default QuizPage;
