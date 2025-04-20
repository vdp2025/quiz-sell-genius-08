
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Layers, MoreVertical, Edit, Copy, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QuizStep } from '@/types/quizBuilder';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface StepsSidebarProps {
  steps: QuizStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onAddStep: () => void;
  onEditStepTitle?: (index: number, title: string) => void;
  onDeleteStep?: (index: number) => void;
}

export const StepsSidebar: React.FC<StepsSidebarProps> = ({
  steps,
  currentStepIndex,
  onSelectStep,
  onAddStep,
  onEditStepTitle,
  onDeleteStep
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
            <div 
              key={step.id}
              className={cn(
                "group flex items-center justify-between pr-2",
                currentStepIndex === index ? "bg-[#1E2231]" : "hover:bg-[#1A1E2C]"
              )}
            >
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start py-2 px-4 rounded-none",
                  currentStepIndex === index ? "text-white" : "text-gray-400 hover:text-white"
                )}
                onClick={() => onSelectStep(index)}
              >
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm truncate max-w-[160px]">{step.title}</span>
                </div>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 opacity-0 group-hover:opacity-100"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {onEditStepTitle && (
                    <DropdownMenuItem onClick={() => {
                      const newTitle = window.prompt("Nome da etapa:", step.title);
                      if (newTitle) onEditStepTitle(index, newTitle);
                    }}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Renomear etapa</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    <span>Duplicar etapa</span>
                  </DropdownMenuItem>
                  {onDeleteStep && steps.length > 1 && (
                    <DropdownMenuItem 
                      className="text-red-600" 
                      onClick={() => {
                        if (window.confirm("Tem certeza que deseja excluir esta etapa?")) {
                          onDeleteStep(index);
                        }
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Excluir etapa</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
