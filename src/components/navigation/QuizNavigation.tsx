
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface QuizNavigationProps {
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrevious?: () => void;
  showProgress?: boolean;
}

export const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentStep = 0,
  totalSteps = 0,
  onNext,
  onPrevious,
  showProgress = true
}) => {
  const location = useLocation();
  const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;
  const isQuizRoute = location.pathname === '/';
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#B89B7A]/20 p-4">
      <div className="max-w-4xl mx-auto">
        {showProgress && isQuizRoute && (
          <div className="mb-4">
            <Progress value={progress} className="h-2" />
            <p className="text-sm text-[#8F7A6A] mt-2">
              {currentStep} de {totalSteps} questões
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          {isQuizRoute ? (
            <>
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep <= 1}
              >
                Anterior
              </Button>
              <Button
                onClick={onNext}
                disabled={currentStep >= totalSteps}
              >
                {currentStep >= totalSteps ? 'Ver Resultado' : 'Próxima'}
              </Button>
            </>
          ) : (
            <Link to="/" className="ml-auto">
              <Button variant="outline">
                Refazer Quiz
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
