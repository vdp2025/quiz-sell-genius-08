
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { QuizStep } from '@/types/quizBuilder';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { useIsMobile } from '@/hooks/use-mobile';

interface StepsVisualizationProps {
  steps: QuizStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
}

export const StepsVisualization: React.FC<StepsVisualizationProps> = ({ 
  steps, 
  currentStepIndex, 
  onSelectStep 
}) => {
  const [displayMode, setDisplayMode] = useState<'timeline' | 'grid'>('timeline');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
  const isMobile = useIsMobile();
  
  const visibleSteps = steps.slice(visibleRange.start, visibleRange.end);
  const maxVisibleSteps = isMobile ? 3 : 5;
  
  const navigateLeft = () => {
    if (visibleRange.start > 0) {
      setVisibleRange({
        start: visibleRange.start - 1,
        end: visibleRange.end - 1
      });
    }
  };
  
  const navigateRight = () => {
    if (visibleRange.end < steps.length) {
      setVisibleRange({
        start: visibleRange.start + 1,
        end: visibleRange.end + 1
      });
    }
  };
  
  const navigateToStart = () => {
    setVisibleRange({
      start: 0,
      end: maxVisibleSteps
    });
  };
  
  const navigateToEnd = () => {
    const newStart = Math.max(0, steps.length - maxVisibleSteps);
    setVisibleRange({
      start: newStart,
      end: steps.length
    });
  };
  
  // Ensure current step is visible
  React.useEffect(() => {
    if (currentStepIndex < visibleRange.start) {
      setVisibleRange({
        start: Math.max(0, currentStepIndex - 1),
        end: Math.max(maxVisibleSteps, currentStepIndex + (maxVisibleSteps - 1))
      });
    } else if (currentStepIndex >= visibleRange.end) {
      setVisibleRange({
        start: Math.max(0, currentStepIndex - (maxVisibleSteps - 1)),
        end: currentStepIndex + 1
      });
    }
  }, [currentStepIndex]);

  // Generate a thumbnail preview based on step content
  const getStepPreview = (step: QuizStep) => {
    // Check if the step has any components
    if (step.components.length === 0) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400 text-xs">
          Etapa vazia
        </div>
      );
    }

    // Find the first header or text component for preview
    const previewComponent = step.components.find(c => 
      c.type === 'header' || c.type === 'text' || c.type === 'headline'
    );

    if (previewComponent) {
      if (previewComponent.type === 'header') {
        return (
          <div className="text-xs p-1 truncate text-center">
            <p className="font-medium">{previewComponent.data.title || 'Sem título'}</p>
            <p className="text-gray-500 text-[10px]">{previewComponent.data.subtitle || ''}</p>
          </div>
        );
      } else if (previewComponent.type === 'headline') {
        return (
          <div className="text-xs p-1 truncate text-center">
            <p className="font-medium">{previewComponent.data.title || 'Sem título'}</p>
          </div>
        );
      } else {
        return (
          <div className="text-xs p-1 truncate">
            {previewComponent.data.text?.substring(0, 30) || 'Texto da etapa'}...
          </div>
        );
      }
    }

    // If no suitable preview component, show component count
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500 text-xs">
        {step.components.length} componente(s)
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={navigateToStart}
            disabled={visibleRange.start <= 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={navigateLeft}
            disabled={visibleRange.start <= 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-sm text-[#432818] font-medium">
          Etapa {currentStepIndex + 1} de {steps.length}
        </div>
        
        <div className="flex space-x-2">
          <Button 
            size="icon" 
            variant="outline" 
            onClick={navigateRight}
            disabled={visibleRange.end >= steps.length}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={navigateToEnd}
            disabled={visibleRange.end >= steps.length}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <AnimatedWrapper>
          <div className="flex space-x-2 py-2">
            {visibleSteps.map((step, index) => {
              const absoluteIndex = index + visibleRange.start;
              const isActive = absoluteIndex === currentStepIndex;
              
              return (
                <Card
                  key={step.id}
                  className={cn(
                    "cursor-pointer transition-all duration-200 min-w-[100px]",
                    isActive 
                      ? "ring-2 ring-[#B89B7A] shadow-md" 
                      : "hover:shadow-md",
                    isMobile ? "w-1/3" : "w-1/5"
                  )}
                  onClick={() => onSelectStep(absoluteIndex)}
                >
                  <CardContent className="p-0">
                    <div className={cn(
                      "h-1.5 w-full",
                      isActive ? "bg-[#B89B7A]" : "bg-gray-200"
                    )} />
                    
                    <div className="p-2 text-center">
                      <div className="font-medium text-xs mb-1 truncate">
                        {step.title}
                      </div>
                      <div className="h-16 border rounded bg-gray-50 flex items-center justify-center overflow-hidden">
                        {getStepPreview(step)}
                      </div>
                      <div className="mt-1 text-[10px] text-gray-500">
                        {step.components.length} componente(s)
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {visibleSteps.length === 0 && (
              <div className="w-full text-center py-8 text-gray-500">
                Nenhuma etapa criada. Adicione sua primeira etapa para começar.
              </div>
            )}
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
};
