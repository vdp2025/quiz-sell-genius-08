
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { QuizComponentData } from '@/types/quizBuilder/componentTypes';
import { Card } from '@/components/ui/card';

interface ComponentPreviewProps {
  selectedComponent: QuizComponentData | null;
  onSelectComponent: (component: QuizComponentData | null) => void;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  selectedComponent,
  onSelectComponent
}) => {
  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      <div className="p-4 border-b bg-white">
        <h2 className="font-semibold">Visualização</h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          <Card className="max-w-3xl mx-auto bg-white min-h-[400px] p-4">
            {selectedComponent ? (
              <div className="p-4 border-2 border-dashed border-gray-300 rounded-md">
                <h3 className="font-medium">{selectedComponent.type}</h3>
                <pre className="text-xs mt-2 bg-gray-50 p-2 rounded">
                  {JSON.stringify(selectedComponent, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-gray-500 mb-4">
                  Selecione ou adicione um componente para visualizar
                </p>
              </div>
            )}
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
};
