import React from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { ComponentsSidebar } from '../ComponentsSidebar';

interface ComponentToolbarProps {
  activeStage: QuizStage | null;
  onComponentSelect: (type: string) => void;
  isPreviewing: boolean;
}

const ComponentToolbar: React.FC<ComponentToolbarProps> = ({
  activeStage,
  onComponentSelect,
  isPreviewing,
}) => {
  if (isPreviewing) return null;
  return (
    <div className="h-full border-r">
      <ComponentsSidebar
        activeStage={activeStage}
        onComponentSelect={onComponentSelect}
      />
    </div>
  );
};

export default ComponentToolbar;
