
import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from './ui/animated-wrapper';

interface QuizTransitionProps {
  onContinue: () => void;
}

const QuizTransition: React.FC<QuizTransitionProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-[#FAF9F7] px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.png"
            alt="Logo Gisele Galvão"
            className="h-16 mx-auto mb-6"
          />
        </div>

        <AnimatedWrapper>
          <Card className="p-6 space-y-6 bg-white shadow-md">
            <h2 className="text-xl font-playfair text-[#432818] text-center">
              🕐 Enquanto calculamos o seu resultado...
            </h2>
            
            <p className="text-[#1A1818]/80">
              Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.
            </p>
            
            <p className="text-[#1A1818]/80">
              A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.
            </p>
            
            <div className="bg-[#B89B7A]/10 p-4 rounded-lg">
              <p className="text-[#432818] italic">
                💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.
              </p>
            </div>

            <Button 
              onClick={onContinue}
              className="w-full bg-[#B89B7A] hover:bg-[#B89B7A]/90 py-6"
            >
              Continuar
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Card>
        </AnimatedWrapper>
      </div>
    </div>
  );
};

export default QuizTransition;
