
import React, { useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion } from './QuizQuestion';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserResponse } from '../types/quiz';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Progress } from './ui/progress';
import { AnimatedWrapper } from './ui/animated-wrapper';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions,
    submitQuizIfComplete
  } = useQuizLogic();

  // Reference to the quiz container for scrolling
  const quizContainerRef = useRef<HTMLDivElement>(null);

  // Handle answer submission and auto-advance
  const handleAnswerSubmit = (response: UserResponse) => {
    handleAnswer(response.questionId, response.selectedOptions);
    
    // Auto-advance to next question if exactly 3 options are selected
    if (response.selectedOptions.length === currentQuestion.multiSelect && !isLastQuestion) {
      setTimeout(() => {
        handleNext();
      }, 500); // Small delay for visual feedback
    } else if (response.selectedOptions.length === currentQuestion.multiSelect && isLastQuestion) {
      // Auto-submit the quiz on the last question
      console.log('Last question answered, submitting quiz...');
      setTimeout(() => {
        console.log('Triggering submission after delay');
        submitQuizIfComplete();
      }, 800); // Slightly longer delay for the final question
    }
  };

  // Log state on each render for debugging
  useEffect(() => {
    console.log('QuizPage rendered:', {
      currentQuestionIndex,
      totalQuestions,
      isLastQuestion,
      currentAnswers
    });
  }, [currentQuestionIndex, totalQuestions, isLastQuestion, currentAnswers]);

  // Add a manual submit button for the last question
  useEffect(() => {
    if (isLastQuestion && canProceed) {
      console.log('Last question can proceed:', canProceed);
    }
  }, [isLastQuestion, canProceed]);

  // Smooth scroll to the current question when it changes
  useEffect(() => {
    if (quizContainerRef.current) {
      const questionElement = document.getElementById(`question-${currentQuestion.id}`);
      if (questionElement) {
        questionElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
  }, [currentQuestionIndex, currentQuestion.id]);

  // Make sure images are pre-loaded for all questions
  useEffect(() => {
    // Function to preload an image
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    // Get all questions with images and preload them
    import('../data/quizQuestions').then(module => {
      const questions = module.quizQuestions;
      questions.forEach(question => {
        if (question.type !== 'text') {
          question.options.forEach(option => {
            if (option.imageUrl) {
              preloadImage(option.imageUrl);
            }
          });
        }
      });
    });
  }, []);

  const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8" ref={quizContainerRef}>
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

        <div className="flex justify-between mt-8">
          {currentQuestionIndex > 0 && (
            <AnimatedWrapper className="flex">
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="flex items-center gap-2 border-[#B89B7A]/30 text-[#432818] transition-all duration-200 hover:border-[#B89B7A]"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </AnimatedWrapper>
          )}
          
          {isLastQuestion && canProceed && (
            <AnimatedWrapper className="flex ml-auto">
              <Button
                onClick={() => submitQuizIfComplete()}
                className="bg-[#B89B7A] hover:bg-[#B89B7A]/90 text-white"
              >
                Ver Resultado
              </Button>
            </AnimatedWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
