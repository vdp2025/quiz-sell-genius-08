import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { QuizStep } from '@/types/quizBuilder';
import { AnimatedWrapper } from '@/components/AnimatedWrapper';
import { useIsMobile } from '@/hooks/use-mobile';
import { useStepSearch } from '@/hooks/quiz-builder/useStepSearch';

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
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
  const isMobile = useIsMobile();
  const { searchQuery, setSearchQuery, filteredSteps } = useStepSearch(steps);
  
  const maxVisibleSteps = isMobile ? 3 : 5;
  const visibleSteps = filteredSteps.slice(visibleRange.start, visibleRange.end);
  
  const navigateLeft = () => {
    if (visibleRange.start > 0) {
      setVisibleRange({
        start: visibleRange.start - 1,
        end: visibleRange.end - 1
      });
    }
  };
  
  const navigateRight = () => {
    if (visibleRange.end < filteredSteps.length) {
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
    const newStart = Math.max(0, filteredSteps.length - maxVisibleSteps);
    setVisibleRange({
      start: newStart,
      end: filteredSteps.length
    });
  };
  
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

  const getStepPreview = (step: QuizStep) => {
    if (step.components.length === 0) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50 text-gray-400 text-xs">
          Etapa vazia
        </div>
      );
    }

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

    return (
      <div className="flex items-center justify-center h-full bg-gray-50 text-gray-500 text-xs">
        {step.components.length} componente(s)
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar etapas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => setVisibleRange({ start: 0, end: maxVisibleSteps })}
              disabled={visibleRange.start <= 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => {
                if (visibleRange.start > 0) {
                  setVisibleRange({
                    start: visibleRange.start - 1,
                    end: visibleRange.end - 1
                  });
                }
              }}
              disabled={visibleRange.start <= 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-[#432818] font-medium">
            Etapa {currentStepIndex + 1} de {steps.length}
            {searchQuery && ` (${filteredSteps.length} resultados)`}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => {
                if (visibleRange.end < filteredSteps.length) {
                  setVisibleRange({
                    start: visibleRange.start + 1,
                    end: visibleRange.end + 1
                  });
                }
              }}
              disabled={visibleRange.end >= filteredSteps.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              onClick={() => {
                const newStart = Math.max(0, filteredSteps.length - maxVisibleSteps);
                setVisibleRange({
                  start: newStart,
                  end: filteredSteps.length
                });
              }}
              disabled={visibleRange.end >= filteredSteps.length}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <AnimatedWrapper>
          <div className="flex space-x-2 py-2">
            {visibleSteps.map((step, index) => {
              const absoluteIndex = steps.findIndex(s => s.id === step.id);
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
                {searchQuery
                  ? 'Nenhuma etapa encontrada para esta busca.'
                  : 'Nenhuma etapa criada. Adicione sua primeira etapa para começar.'}
              </div>
            )}
          </div>
        </AnimatedWrapper>
      </div>
    </div>
  );
};
