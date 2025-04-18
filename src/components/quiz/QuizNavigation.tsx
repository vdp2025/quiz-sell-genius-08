
import React from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { AnimatedWrapper } from '../ui/animated-wrapper';

interface QuizNavigationProps {
  showPrevious: boolean;
  onPrevious: () => void;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  showPrevious,
  onPrevious,
}) => {
  if (!showPrevious) return null;

  return (
    <div className="flex justify-between mt-8">
      <AnimatedWrapper className="flex">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center gap-2 border-[#B89B7A]/30 text-[#432818] transition-all duration-200 hover:border-[#B89B7A]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </AnimatedWrapper>
    </div>
  );
};
