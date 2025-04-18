import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { QuizQuestion } from './QuizQuestion';
import { useQuizLogic } from '../hooks/useQuizLogic';
import { useNavigate } from 'react-router-dom';
import { UserResponse } from '../types/quiz';
import QuizTransition from './QuizTransition';
import QuizFinalTransition from './QuizFinalTransition';
import { strategicQuestions } from '../data/strategicQuestions';
import { quizQuestions } from '../data/quizQuestions';
import { QuizHeader } from './quiz/QuizHeader';
import { QuizNavigation } from './quiz/QuizNavigation';
import { Card } from './ui/card';
import { AnimatedWrapper } from './ui/animated-wrapper';

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
  const transitionTitleRef = useRef<HTMLHeadingElement>(null);
  
  const totalQuestions = quizQuestions.length + strategicQuestions.length;

  const handleStrategicAnswer = (response: UserResponse) => {
    console.log('Strategic question answered:', response);
    
    setStrategicAnswers(prev => ({
      ...prev,
      [response.questionId]: response.selectedOptions
    }));
    
    saveStrategicAnswer(response.questionId, response.selectedOptions);
    
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
    
    if (response.selectedOptions.length === currentQuestion.multiSelect) {
      if (!isLastQuestion) {
        setTimeout(() => {
          handleNext();
        }, 500);
      } else {
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
      if (showingTransition && transitionTitleRef.current) {
        transitionTitleRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        return;
      }

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
  }, [currentQuestionIndex, currentStrategicQuestionIndex, showingStrategicQuestions, currentQuestion, showingTransition]);

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
      <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <AnimatedWrapper>
            <Card className="p-8 space-y-8 bg-white shadow-md mb-10 border-[#B89B7A]/20">
              <h2 
                ref={transitionTitleRef}
                className="text-2xl font-playfair text-[#432818] text-center tracking-normal font-bold"
              >
                Enquanto calculamos o seu resultado...
              </h2>
              
              <p className="text-[#1A1818]/90 text-base">
                Queremos te fazer algumas perguntas que vão tornar sua <strong className="text-[#432818]">experiência</strong> ainda mais <strong className="text-[#432818]">completa</strong>.
              </p>
              
              <p className="text-[#1A1818]/90 text-base">
                A ideia é simples: te ajudar a enxergar com mais <strong className="text-[#432818]">clareza</strong> onde você está agora — e para onde pode ir com mais <strong className="text-[#432818]">intenção</strong>, <strong className="text-[#432818]">leveza</strong> e <strong className="text-[#432818]">autenticidade</strong>.
              </p>
              
              <div className="bg-[#B89B7A]/10 p-6 rounded-lg">
                <p className="text-[#432818] italic text-center font-medium">
                  Responda com <strong className="text-[#432818] not-italic">sinceridade</strong>. Isso é só entre você e a sua <strong className="text-[#432818] not-italic">nova versão</strong>.
                </p>
              </div>
            </Card>
          </AnimatedWrapper>

          <AnimatedWrapper>
            <QuizQuestion
              question={strategicQuestions[0]}
              onAnswer={handleStrategicAnswer}
              currentAnswers={strategicAnswers[strategicQuestions[0].id] || []}
              autoAdvance={true}
            />
          </AnimatedWrapper>
        </div>
      </div>
    );
  }

  if (showingFinalTransition) {
    return <QuizFinalTransition onShowResult={handleShowResult} />;
  }

  const hasStrategicQuestion = showingStrategicQuestions && 
                              currentStrategicQuestionIndex < strategicQuestions.length;
  
  const currentProgress = showingStrategicQuestions
    ? Math.round(((currentStrategicQuestionIndex + 1) / strategicQuestions.length) * 100)
    : Math.round(((currentQuestionIndex + 1) / quizQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-[#FEFEFE] px-4 py-8" ref={quizContainerRef}>
      <div className="max-w-4xl mx-auto">
        <QuizHeader
          userName={user?.userName}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={totalQuestions}
          showingStrategicQuestions={showingStrategicQuestions}
          currentStrategicQuestionIndex={currentStrategicQuestionIndex}
        />

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

        <QuizNavigation
          showPrevious={!showingStrategicQuestions && currentQuestion && currentQuestionIndex > 0}
          onPrevious={handlePrevious}
        />
      </div>
    </div>
  );
};

export default QuizPage;
