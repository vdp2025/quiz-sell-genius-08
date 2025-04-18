import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion } from './QuizQuestion';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';
import { UserResponse } from '../types/quiz';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { Progress } from './ui/progress';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { useNavigate } from 'react-router-dom';
import { toast } from './ui/use-toast';
import QuizTransition from './QuizTransition';
import QuizFinalTransition from './QuizFinalTransition';
import { strategicQuestions } from '../data/strategicQuestions';
import { quizQuestions } from '../data/quizQuestions';

const QuizPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [showingTransition, setShowingTransition] = useState(false);
  const [showingFinalTransition, setShowingFinalTransition] = useState(false);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [strategicAnswers, setStrategicAnswers] = useState<Record<string, string[]>>({});
  
  const {
    currentQuestion,
    currentQuestionIndex,
    currentAnswers,
    canProceed,
    isLastQuestion,
    handleAnswer,
    handleNext,
    handlePrevious,
    totalQuestions: mainQuizTotalQuestions,
    submitQuizIfComplete,
    calculateResults,
    handleStrategicAnswer: saveStrategicAnswer
  } = useQuizLogic();

  const quizContainerRef = useRef<HTMLDivElement>(null);

  // Calculate total questions: main quiz + strategic questions
  const totalQuestions = quizQuestions.length + strategicQuestions.length;

  const handleStrategicAnswer = (response: UserResponse) => {
    console.log('Strategic question answered:', response);
    
    // Save the answer
    setStrategicAnswers(prev => ({
      ...prev,
      [response.questionId]: response.selectedOptions
    }));
    
    // Also save to the persistent storage through context
    saveStrategicAnswer(response.questionId, response.selectedOptions);
    
    // Add a slight delay before moving to the next strategic question
    setTimeout(() => {
      if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
        setCurrentStrategicQuestionIndex(prev => prev + 1);
        console.log('Moving to next strategic question:', currentStrategicQuestionIndex + 1);
      } else {
        console.log('All strategic questions answered, showing final transition');
        setShowingFinalTransition(true);
      }
    }, 500);
  };

  const handleAnswerSubmit = (response: UserResponse) => {
    handleAnswer(response.questionId, response.selectedOptions);
    
    // Verificamos se o número de opções selecionadas é igual ao número requerido
    if (response.selectedOptions.length === currentQuestion.multiSelect) {
      if (!isLastQuestion) {
        setTimeout(() => {
          handleNext();
        }, 500);
      } else {
        // Garantir que o quiz não trave na última questão
        setTimeout(() => {
          const results = calculateResults();
          console.log('Results calculated before transition:', results);
          setShowingTransition(true);
        }, 800);
      }
    }
  };

  useEffect(() => {
    if (quizContainerRef.current) {
      // Adicionando verificação para garantir que o elemento de questão exista
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
    }
  }, [currentQuestionIndex, currentStrategicQuestionIndex, showingStrategicQuestions, currentQuestion]);

  const handleTransitionContinue = () => {
    console.log('Transition continue clicked, showing strategic questions');
    setShowingTransition(false);
    setShowingStrategicQuestions(true);
  };

  const handleShowResult = () => {
    console.log('Saving strategic answers and navigating to result page');
    localStorage.setItem('strategicAnswers', JSON.stringify(strategicAnswers));
    navigate('/resultado');
  };

  if (showingTransition) {
    return (
      <QuizTransition 
        onContinue={handleTransitionContinue} 
        onAnswer={handleStrategicAnswer}
        currentAnswers={strategicAnswers[strategicQuestions[0].id] || []}
      />
    );
  }

  if (showingFinalTransition) {
    return <QuizFinalTransition onShowResult={handleShowResult} />;
  }

  // Garantir que temos questões para mostrar
  const hasStrategicQuestion = showingStrategicQuestions && 
                              currentStrategicQuestionIndex < strategicQuestions.length;
  
  const currentProgress = showingStrategicQuestions
    ? Math.round(((currentStrategicQuestionIndex + 1) / strategicQuestions.length) * 100)
    : Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-[#FEFEFE] px-4 py-8" ref={quizContainerRef}>
      <div className="max-w-4xl mx-auto">
        <AnimatedWrapper>
          <Progress 
            value={Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)} 
            className="w-full h-2 bg-[#B89B7A]/20" 
            indicatorClassName="bg-[#B89B7A]" 
          />
        </AnimatedWrapper>
        
        <AnimatedWrapper className="flex justify-between items-center mb-8">
          <h1 className="text-base font-playfair text-[#432818]"> {/* Reduced font size */}
            Olá, {user?.userName || 'Visitante'}!
          </h1>
          <div className="text-sm text-[#1A1818]/60">
            Ex: {showingStrategicQuestions 
              ? currentStrategicQuestionIndex + 1 
              : currentQuestionIndex + 1} de {totalQuestions}
          </div>
        </AnimatedWrapper>

        {hasStrategicQuestion ? (
          <QuizQuestion
            question={strategicQuestions[currentStrategicQuestionIndex]}
            onAnswer={handleStrategicAnswer}
            currentAnswers={strategicAnswers[strategicQuestions[currentStrategicQuestionIndex].id] || []}
            autoAdvance={true}
          />
        ) : !showingStrategicQuestions && currentQuestion ? (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswerSubmit}
            currentAnswers={currentAnswers}
          />
        ) : null}

        {!showingStrategicQuestions && currentQuestion && currentQuestionIndex > 0 && (
          <div className="flex justify-between mt-8">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
