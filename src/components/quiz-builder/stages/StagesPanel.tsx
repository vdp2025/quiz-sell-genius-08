
import React from 'react';
import { QuizStage } from '@/types/quizBuilder/componentTypes';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, FileText, Image, FileQuestion } from 'lucide-react';

interface StagesPanelProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageSelect: (id: string) => void;
  onStageAdd: (type: QuizStage['type']) => void;
  onStageMove: (draggedId: string, targetId: string) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
}

export const StagesPanel: React.FC<StagesPanelProps> = ({
  stages,
  activeStageId,
  onStageSelect,
  onStageAdd,
  onStageMove,
  onStageUpdate,
  onStageDelete
}) => {
  const stageTypes = [
    { type: 'cover', label: 'Capa', icon: <Image className="w-4 h-4" /> },
    { type: 'question', label: 'Questão', icon: <FileQuestion className="w-4 h-4" /> },
    { type: 'result', label: 'Resultado', icon: <FileText className="w-4 h-4" /> }
  ] as const;

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-white">Etapas do Quiz</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-2">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className={`p-3 rounded-md cursor-pointer transition-all ${
                activeStageId === stage.id ? 'bg-[#9b87f5] text-white' : 'bg-[#282D3A] text-gray-300 hover:bg-[#343A48]'
              }`}
              onClick={() => onStageSelect(stage.id)}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('text/plain', stage.id)}
              onDrop={(e) => {
                e.preventDefault();
                const draggedId = e.dataTransfer.getData('text/plain');
                onStageMove(draggedId, stage.id);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2 text-xs font-bold">{stage.order + 1}.</span>
                  <span className="text-sm">{stage.title || `Etapa ${stage.order + 1}`}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-[#4A4F5C] hover:text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    onStageDelete(stage.id);
                  }}
                >
                  <span className="text-xs">×</span>
                </Button>
              </div>
              <div className="mt-1 text-xs opacity-70">
                {stage.type === 'cover' && 'Capa'}
                {stage.type === 'question' && 'Questão'}
                {stage.type === 'result' && 'Resultado'}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t bg-[#282D3A]">
        <div className="grid grid-cols-3 gap-2">
          {stageTypes.map((stageType) => (
            <Button
              key={stageType.type}
              variant="outline"
              size="sm"
              className="flex flex-col items-center py-2 bg-[#343A48] border-[#4A4F5C] text-white hover:bg-[#4A4F5C]"
              onClick={() => onStageAdd(stageType.type)}
            >
              <div className="mb-1">{stageType.icon}</div>
              <span className="text-xs">{stageType.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StagesPanel;
