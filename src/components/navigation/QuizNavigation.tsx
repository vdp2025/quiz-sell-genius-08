import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface QuizNavigationProps {
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  currentAnswers?: string[];
  requiredSelections?: number;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  onNext,
  onPrevious,
  currentStep = 0,
  totalSteps = 0,
  currentAnswers = [],
  requiredSelections = 3
}) => {
  const location = useLocation();
  const isQuizRoute = location.pathname === '/';
  const hasEnoughSelections = currentAnswers.length >= requiredSelections;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#B89B7A]/20 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
          {isQuizRoute ? (
            <>
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep <= 1}
                className="border-[#B89B7A]/30 text-[#432818] transition-all duration-200 hover:border-[#B89B7A]"
              >
                Anterior
              </Button>
              <Button
                onClick={onNext}
                disabled={!hasEnoughSelections}
                className={cn(
                  "transition-all duration-300",
                  !hasEnoughSelections
                    ? "bg-[#B89B7A]/30 text-white/70 cursor-not-allowed"
                    : "bg-[#B89B7A] hover:bg-[#9F836A] text-white"
                )}
              >
                {currentStep >= totalSteps ? 'Ver Resultado' : 'Próxima'}
              </Button>
            </>
          ) : (
            <Link to="/" className="ml-auto">
              <Button 
                variant="outline"
                className="border-[#B89B7A]/30 text-[#432818] transition-all duration-200 hover:border-[#B89B7A]"
              >
                Refazer Quiz
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};