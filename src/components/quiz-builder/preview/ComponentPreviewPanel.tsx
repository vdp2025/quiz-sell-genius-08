import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder';
import ComponentRenderer from './ComponentRenderer';

export interface ComponentPreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
}

export const ComponentPreviewPanel: React.FC<ComponentPreviewPanelProps> = ({
  components, selectedComponentId, onSelectComponent,
  onMoveComponent, activeStage, isPreviewing
}) => (
  <div className="h-full overflow-auto p-4 space-y-4">
    {components.map((comp) => (
      <div
        key={comp.id}
        draggable={!isPreviewing}
        onClick={() => onSelectComponent(comp.id)}
        onDragStart={(e) => e.dataTransfer.setData('text/plain', comp.id)}
        onDrop={(e) => {
          const dragged = e.dataTransfer.getData('text/plain');
          onMoveComponent(dragged, comp.id);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <ComponentRenderer
          component={comp}
          isEditing={!isPreviewing && comp.id === selectedComponentId}
        />
      </div>
    ))}
  </div>
);

export default ComponentPreviewPanel;
