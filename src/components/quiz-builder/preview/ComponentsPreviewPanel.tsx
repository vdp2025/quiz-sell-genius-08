
import React from 'react';
import { QuizComponentData, QuizStage } from '@/types/quizBuilder/componentTypes';
import { Card } from '@/components/ui/card';

export interface ComponentsPreviewPanelProps {
  components: QuizComponentData[];
  selectedComponentId: string | null;
  onSelectComponent: (id: string) => void;
  onMoveComponent: (draggedId: string, targetId: string) => void;
  activeStage: QuizStage | null;
  isPreviewing: boolean;
}

export const ComponentsPreviewPanel: React.FC<ComponentsPreviewPanelProps> = ({
  components, 
  selectedComponentId, 
  onSelectComponent,
  onMoveComponent, 
  activeStage, 
  isPreviewing
}) => {
  return (
    <div className="h-full overflow-auto p-4 space-y-4">
      {components.length > 0 ? (
        components.map((component) => (
          <div
            key={component.id}
            className={`border rounded-md p-4 cursor-pointer transition-all ${
              selectedComponentId === component.id ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200 hover:border-gray-300'
            }`}
            draggable={!isPreviewing}
            onClick={() => onSelectComponent(component.id)}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', component.id)}
            onDrop={(e) => {
              e.preventDefault();
              const draggedId = e.dataTransfer.getData('text/plain');
              onMoveComponent(draggedId, component.id);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">{component.type}</h4>
              <span className="text-xs text-gray-500">ID: {component.id.substring(0, 8)}</span>
            </div>
            
            <Card className="p-2 bg-gray-50">
              <pre className="text-xs overflow-auto max-h-40">
                {JSON.stringify(component, null, 2)}
              </pre>
            </Card>
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-gray-500 mb-4">
            {activeStage 
              ? "Nenhum componente adicionado a esta etapa ainda" 
              : "Selecione uma etapa para visualizar seus componentes"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ComponentsPreviewPanel;
