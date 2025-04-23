
import React from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SortableStage } from './SortableStage';

interface StageSectionProps {
  title: string;
  isExpanded: boolean;
  stages: QuizStage[];
  activeStageId: string | null;
  onToggle: () => void;
  onStageSelect: (id: string) => void;
  onStageEdit: (id: string) => void;
  onStageDelete: (id: string) => void;
}

export const StageSection: React.FC<StageSectionProps> = ({
  title,
  isExpanded,
  stages,
  activeStageId,
  onToggle,
  onStageSelect,
  onStageEdit,
  onStageDelete
}) => {
  return (
    <div className="mb-4">
      <div 
        className="flex items-center justify-between p-2 bg-[#333333] rounded-md cursor-pointer mb-2"
        onClick={onToggle}
      >
        <div className="font-medium text-sm text-gray-200">{title}</div>
        {isExpanded ? 
          <ChevronUp className="w-4 h-4 text-gray-400" /> : 
          <ChevronDown className="w-4 h-4 text-gray-400" />
        }
      </div>
      
      {isExpanded && (
        <div className="pl-2">
          {stages.length > 0 ? (
            stages.map(stage => (
              <SortableStage 
                key={stage.id}
                stage={stage}
                isActive={stage.id === activeStageId}
                onSelect={onStageSelect}
                onEdit={onStageEdit}
                onDelete={onStageDelete}
              />
            ))
          ) : (
            <div className="text-sm text-gray-400 italic p-2">
              {`Nenhum${title.toLowerCase().startsWith('r') ? ' ' : 'a '}${title.toLowerCase()} adicionad${title.toLowerCase().startsWith('r') ? 'o' : 'a'}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
