
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Layers, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizStep } from '@/types/quizBuilder';

interface StepsSidebarProps {
  steps: QuizStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onAddStep: () => void;
}

export const StepsSidebar: React.FC<StepsSidebarProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  onAddStep
}) => {
  return (
    <div className="h-full border-r bg-[#0E1016] text-white">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-medium">Etapas do Quiz</h2>
        <p className="text-sm text-gray-400">Organize seu quiz em etapas</p>
      </div>
      
      <ScrollArea className="h-[calc(100vh-130px)]">
        <div className="space-y-0.5">
          {steps.map((step, index) => (
            <Button
              key={step.id}
              variant="ghost"
              className={cn(
                "w-full justify-start py-2 px-4 rounded-none",
                currentStepIndex === index ? "bg-[#1E2231] text-white" : "text-gray-400 hover:bg-[#1E2231] hover:text-white"
              )}
              onClick={() => onSelectStep(index)}
            >
              <div className="flex items-center w-full justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm">{step.title}</span>
                </div>
                <MoreVertical className="h-4 w-4 opacity-60" />
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-400 hover:text-white"
          onClick={onAddStep}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          <span>Adicionar Etapa</span>
        </Button>
      </div>
    </div>
  );
};
