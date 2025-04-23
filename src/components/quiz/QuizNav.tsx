
import React from 'react';
import { Button } from '../ui/button';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { ArrowRight } from 'lucide-react';

interface QuizNavProps {
  onNext: () => void;
  onPrev: () => void;
  canProceed: boolean;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
}

const QuizNav: React.FC<QuizNavProps> = ({
  onNext,
  onPrev,
  canProceed,
  isLastQuestion,
  isFirstQuestion
}) => {
  return (
    <AnimatedWrapper className="flex justify-between items-center mt-8 pt-4 border-t border-[#F3E8E6]">
      {!isFirstQuestion ? (
        <button 
          onClick={onPrev}
          className="text-[#8F7A6A] hover:text-[#432818] text-sm transition-colors"
        >
          Voltar
        </button>
      ) : (
        <div></div> // Empty div to maintain layout with flex-justify-between
      )}
      
      <Button
        onClick={onNext}
        disabled={!canProceed}
        className={`px-6 py-2 rounded-md flex items-center 
          ${canProceed ? 'bg-[#B89B7A] hover:bg-[#A38A69]' : 'bg-[#B89B7A]/50 cursor-not-allowed'}`}
      >
        {isLastQuestion ? 'Ver resultado' : 'Próximo'}
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </AnimatedWrapper>
  );
};

export default QuizNav;
