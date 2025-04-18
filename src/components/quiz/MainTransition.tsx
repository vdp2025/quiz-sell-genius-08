
import React, { useState } from 'react';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { Card } from '../ui/card';
import { QuizQuestion } from '../QuizQuestion';
import { strategicQuestions } from '@/data/strategicQuestions';
import { UserResponse } from '@/types/quiz';

interface MainTransitionProps {
  onAnswer: (response: UserResponse) => void;
  strategicAnswers: Record<string, string[]>;
}

export const MainTransition: React.FC<MainTransitionProps> = ({
  onAnswer,
  strategicAnswers,
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleQuestionAnswer = (response: UserResponse) => {
    onAnswer(response);
    
    // Wait a moment and move to the next question
    setTimeout(() => {
      if (currentQuestionIndex < strategicQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }, 500);
  };

  // If we're still showing the intro, display it, otherwise show the current question
  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-10 flex items-start justify-center">
      <div className="max-w-3xl w-full mx-auto">
        {showIntro ? (
          <AnimatedWrapper>
            <Card className="p-8 space-y-8 bg-white shadow-md mb-10 border-[#B89B7A]/20">
              <h2 className="text-2xl font-playfair text-[#432818] text-center tracking-normal font-bold mt-4">
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
              
              <div className="flex justify-center pt-2">
                <button 
                  onClick={() => setShowIntro(false)}
                  className="px-6 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#9A7F62] transition-colors"
                >
                  Continuar
                </button>
              </div>
            </Card>
          </AnimatedWrapper>
        ) : (
          <AnimatedWrapper>
            <QuizQuestion
              key={strategicQuestions[currentQuestionIndex].id}
              question={strategicQuestions[currentQuestionIndex]}
              onAnswer={handleQuestionAnswer}
              currentAnswers={strategicAnswers[strategicQuestions[currentQuestionIndex].id] || []}
              autoAdvance={true}
            />
          </AnimatedWrapper>
        )}
      </div>
    </div>
  );
};
