
import React from 'react';
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
  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <AnimatedWrapper>
          <Card className="p-8 space-y-8 bg-white shadow-md mb-10 border-[#B89B7A]/20">
            <h2 className="text-2xl font-playfair text-[#432818] text-center tracking-normal font-bold">
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
            onAnswer={onAnswer}
            currentAnswers={strategicAnswers[strategicQuestions[0].id] || []}
            autoAdvance={true}
          />
        </AnimatedWrapper>
      </div>
    </div>
  );
};
