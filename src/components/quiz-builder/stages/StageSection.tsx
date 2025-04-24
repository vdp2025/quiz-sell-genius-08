import React from 'react';
import { QuizStage } from '@/types/quizBuilder';

export interface StageSectionProps {
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
  title, isExpanded, stages, activeStageId,
  onToggle, onStageSelect, onStageEdit, onStageDelete
}) => (
  <div className="mb-4">
    <h3 className="cursor-pointer font-semibold" onClick={onToggle}>
      {title}
    </h3>
    {isExpanded && (
      <ul className="ml-4 mt-2 space-y-1">
        {stages.map((stage) => (
          <li
            key={stage.id}
            className={lex items-center justify-between }
          >
            <span
              className="flex-1 cursor-pointer"
              onClick={() => onStageSelect(stage.id)}
            >
              {stage.title || stage.id}
            </span>
            <div className="space-x-2">
              <button onClick={() => onStageEdit(stage.id)}>✎</button>
              <button onClick={() => onStageDelete(stage.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default StageSection;
