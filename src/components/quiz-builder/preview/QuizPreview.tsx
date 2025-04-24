
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { QuizResult } from '@/types/quiz';
import { cn } from '@/lib/utils';
import ComponentRenderer from './ComponentRenderer';

interface QuizPreviewProps {
  stages: QuizStage[];
  components: QuizComponentData[];
  previewResult?: QuizResult | null;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ 
  stages, 
  components,
  previewResult 
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  
  const orderedStages = [...stages].sort((a, b) => a.order - b.order);
  const activeStage = orderedStages[activeStageIndex];
  
  const handleNext = () => {
    if (activeStageIndex < orderedStages.length - 1) {
      setActiveStageIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };
  
  const handlePrevious = () => {
    if (activeStageIndex > 0) {
      setActiveStageIndex(prev => prev - 1);
    }
  };
  
  const handleRestart = () => {
    setActiveStageIndex(0);
    setIsCompleted(false);
  };
  
  const getStageComponents = (stageId: string) => {
    return components
      .filter(c => c.stageId === stageId)
      .sort((a, b) => a.order - b.order);
  };
  
  // Show the result screen if completed
  if (isCompleted) {
    const resultStage = orderedStages.find(s => s.type === 'result');
    
    if (resultStage) {
      const resultComponents = getStageComponents(resultStage.id);
      
      return (
        <div className="h-full flex flex-col bg-[#FAF9F7]">
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <h2 className="font-semibold">Resultado (Visualização)</h2>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRestart}
            >
              Reiniciar Visualização
            </Button>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 max-w-3xl mx-auto">
              {resultComponents.map(component => (
                <div key={component.id} className="mb-4">
                  <ComponentRenderer 
                    component={component}
                    isEditing={false}
                    isSelected={false}
                  />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      );
    }
  }
  
  // If no stages, show a message
  if (orderedStages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#FAF9F7]">
        <Card className="p-8 max-w-md">
          <h2 className="text-xl font-medium mb-4">Sem etapas para visualizar</h2>
          <p className="text-gray-500 mb-6">
            Adicione etapas ao seu quiz para visualizar a navegação e resultados.
          </p>
        </Card>
      </div>
    );
  }
  
  // Show the current stage
  const stageComponents = activeStage ? getStageComponents(activeStage.id) : [];
  
  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      <div className="p-4 border-b bg-white flex items-center justify-between">
        <h2 className="font-semibold">Visualização do Quiz</h2>
        <div className="flex items-center text-sm text-gray-500">
          Etapa {activeStageIndex + 1} de {orderedStages.length}
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#9b87f5]" 
                style={{ width: `${((activeStageIndex + 1) / orderedStages.length) * 100}%` }}
              />
            </div>
            <div className="mt-2 flex">
              {orderedStages.map((stage, index) => (
                <div 
                  key={stage.id} 
                  className={cn(
                    "flex-1 text-xs text-center",
                    index <= activeStageIndex ? "text-[#9b87f5]" : "text-gray-400"
                  )}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>
          
          {/* Stage Content */}
          <Card className="p-6 mb-4 min-h-[400px]">
            {stageComponents.length > 0 ? (
              stageComponents.map(component => (
                <div key={component.id} className="mb-4">
                  <ComponentRenderer 
                    component={component}
                    isEditing={false}
                    isSelected={false}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-gray-400">
                  Esta etapa não tem componentes para exibir.
                </p>
              </div>
            )}
          </Card>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={activeStageIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
            
            <Button
              onClick={handleNext}
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              {activeStageIndex < orderedStages.length - 1 ? (
                <>
                  Próximo
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                'Finalizar'
              )}
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default QuizPreview;
