
import React from 'react';
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import ComponentRenderer from './ComponentRenderer';

interface StagePreviewProps {
  stage: QuizStage;
  components: QuizComponentData[];
}

const StagePreview: React.FC<StagePreviewProps> = ({ stage, components }) => {
  if (!stage) {
    return <div className="p-8 text-gray-500 text-center">Nenhuma etapa selecionada</div>;
  }

  if (components.length === 0) {
    return (
      <div className="p-8 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center">
        <p className="text-gray-500">Nenhum componente adicionado nesta etapa</p>
        <p className="text-gray-400 text-sm mt-2">
          Adicione componentes no editor para visualizar a etapa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {components.map((component) => (
        <ComponentRenderer 
          key={component.id} 
          component={component} 
        />
      ))}
    </div>
  );
};

export default StagePreview;
