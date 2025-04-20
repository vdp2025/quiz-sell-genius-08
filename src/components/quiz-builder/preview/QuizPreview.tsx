
import React, { useState } from 'react';
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import MultipleChoiceComponent from '../components/MultipleChoiceComponent';
import HeaderComponent from '../components/HeaderComponent';
import TextComponent from '../components/TextComponent';
import ImageComponent from '../components/ImageComponent';
import QuizResultComponent from '../components/QuizResultComponent';

interface QuizPreviewProps {
  stages: QuizStage[];
  components: QuizComponentData[];
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ stages, components }) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  const currentStage = sortedStages[currentStageIndex];
  
  const stageComponents = currentStage
    ? components.filter(c => c.stageId === currentStage.id).sort((a, b) => a.order - b.order)
    : [];
  
  const handlePrevious = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (currentStageIndex < sortedStages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
    }
  };
  
  const renderComponent = (component: QuizComponentData) => {
    switch (component.type) {
      case 'header':
        return <HeaderComponent data={component.data} style={component.style} isSelected={false} />;
      case 'headline':
      case 'text':
        return <TextComponent data={component.data} style={component.style} isSelected={false} />;
      case 'image':
        return <ImageComponent data={component.data} style={component.style} isSelected={false} />;
      case 'multipleChoice':
        return <MultipleChoiceComponent data={component.data} style={component.style} isSelected={false} />;
      case 'quizResult':
        return <QuizResultComponent data={component.data} style={component.style} isSelected={false} />;
      default:
        return <div>Componente não suportado no preview</div>;
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-[#FAF9F7]">
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <AnimatedWrapper>
            <div className="bg-white rounded-lg shadow-sm mb-4 p-2 flex items-center justify-between">
              <div className="text-[#432818] font-medium">
                {currentStage ? `Etapa ${currentStageIndex + 1}: ${currentStage.title}` : 'Preview do Quiz'}
              </div>
              <div className="text-[#8F7A6A] text-sm">
                {currentStageIndex + 1} de {sortedStages.length}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              {stageComponents.map((component) => (
                <div key={component.id} className="mb-6">
                  {renderComponent(component)}
                </div>
              ))}
              
              {stageComponents.length === 0 && (
                <div className="py-8 text-center text-[#8F7A6A]">
                  <p>Esta etapa não possui componentes.</p>
                  <p className="text-sm mt-2">Adicione componentes no modo de edição.</p>
                </div>
              )}
            </div>
          </AnimatedWrapper>
        </div>
      </div>
      
      <div className="p-4 border-t bg-white flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStageIndex === 0}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>
        
        <div className="flex items-center">
          {sortedStages.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full mx-1 ${index === currentStageIndex ? 'bg-[#B89B7A]' : 'bg-[#B89B7A]/30'}`}
            />
          ))}
        </div>
        
        <Button
          onClick={handleNext}
          disabled={currentStageIndex === sortedStages.length - 1}
          className="bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          Próximo
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default QuizPreview;
