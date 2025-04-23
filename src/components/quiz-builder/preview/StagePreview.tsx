
import React from 'react';
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { ComponentRenderer } from '../ComponentRenderer';
import QuizContent from '@/components/quiz/QuizContent';

interface StagePreviewProps {
  stage: QuizStage;
  components: QuizComponentData[];
}

const StagePreview: React.FC<StagePreviewProps> = ({ stage, components }) => {
  if (!stage) {
    return (
      <div className="text-center p-8 border border-dashed border-[#B89B7A]/40 rounded-lg">
        <p className="text-[#8F7A6A]">Selecione uma etapa para visualizar</p>
      </div>
    );
  }
  
  // Ordenar os componentes por ordem
  const sortedComponents = [...components].sort((a, b) => a.order - b.order);
  
  // Check if this is a question stage and we need to render the special question layout
  if (stage.type === 'question') {
    const questionComponent = sortedComponents.find(c => c.type === 'stageQuestion');
    
    if (questionComponent) {
      const options = questionComponent.data.options || [];
      const formattedOptions = options.map(opt => {
        if (typeof opt === 'string') {
          return { text: opt, imageUrl: '', styleCategory: 'Natural' };
        }
        return opt;
      });
      
      return (
        <QuizContent
          question={questionComponent.data.question || 'Pergunta sem texto'}
          options={formattedOptions}
          stage={questionComponent.data.stageNumber || 1}
          totalStages={7} // We can make this dynamic later
          multiSelect={questionComponent.data.multiSelect || 3}
          displayType={questionComponent.data.displayType || 'both'}
        />
      );
    }
  }
  
  // Standard rendering for non-question stages
  return (
    <div className="space-y-4">
      {sortedComponents.map(component => (
        <ComponentRenderer
          key={component.id}
          component={component}
          isPreview={true}
          isSelected={false}
        />
      ))}
      
      {sortedComponents.length === 0 && (
        <div className="text-center p-8 border border-dashed border-[#B89B7A]/40 rounded-lg">
          <p className="text-[#8F7A6A]">
            Nenhum componente adicionado para a etapa "{stage.title}".
          </p>
          <p className="text-[#8F7A6A] text-sm mt-2">
            Adicione componentes no editor para visualizá-los aqui.
          </p>
        </div>
      )}
    </div>
  );
};

export default StagePreview;
