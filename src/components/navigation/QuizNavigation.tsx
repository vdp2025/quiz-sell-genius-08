
import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

interface QuizNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious
}) => {
  return (
    <div className="flex items-center justify-between py-4">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Anterior
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              index + 1 === currentStep
                ? 'bg-[#B89B7A]'
                : index + 1 < currentStep
                ? 'bg-[#B89B7A]/40'
                : 'bg-gray-200'
            }`}
          ></div>
        ))}
      </div>

      <Button
        onClick={onNext}
        className="flex items-center gap-2 bg-[#B89B7A] hover:bg-[#A38A69]"
      >
        Próximo
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};
