
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from './ui/animated-wrapper';
import { QuizQuestion } from './QuizQuestion';
import { strategicQuestions } from '../data/strategicQuestions';
import { UserResponse } from '@/types/quiz';

interface QuizTransitionProps {
  onContinue: () => void;
  onAnswer: (response: UserResponse) => void;
  currentAnswers: string[];
}

const QuizTransition: React.FC<QuizTransitionProps> = ({ onContinue, onAnswer, currentAnswers }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png"
            alt="Logo Gisele Galvão"
            className="h-16 mx-auto mb-6"
          />
        </div>
        
        <AnimatedWrapper>
          <Card className="p-8 space-y-8 bg-white shadow-md mb-10 border-[#B89B7A]/20">
            <h2 className="text-2xl font-playfair text-[#432818] text-center tracking-normal font-semibold">
              Enquanto calculamos o seu resultado...
            </h2>
            
            <p className="text-[#1A1818]/80 text-base">
              Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.
            </p>
            
            <p className="text-[#1A1818]/80 text-base">
              A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.
            </p>
            
            <div className="bg-[#B89B7A]/10 p-6 rounded-lg">
              <p className="text-[#432818] italic text-center font-medium">
                Responda com sinceridade. Isso é só entre você e a sua nova versão.
              </p>
            </div>
            
            <Button 
              onClick={onContinue}
              className="w-full bg-[#B89B7A] hover:bg-[#997D5E] text-white font-medium flex items-center justify-center gap-2 py-6"
            >
              Começar <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Card>
        </AnimatedWrapper>

        <AnimatedWrapper>
          <QuizQuestion
            question={strategicQuestions[0]}
            onAnswer={onAnswer}
            currentAnswers={currentAnswers}
            autoAdvance={true}
          />
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default QuizTransition;
