
import React, { useState } from 'react';
import { QuizStage, QuizComponentData } from '@/types/quizBuilder';
import { Button } from '@/components/ui/button';
import { QuizContainer } from '@/components/quiz/QuizContainer';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { QuizResult } from '@/types/quiz';
import ResultPreview from './ResultPreview';
import StagePreview from './StagePreview';

interface QuizPreviewProps {
  stages: QuizStage[];
  components: QuizComponentData[];
  previewResult?: QuizResult | null;
}

const QuizPreview: React.FC<QuizPreviewProps> = ({ 
  stages, 
  components,
  previewResult
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [showingResult, setShowingResult] = useState(false);
  
  // Set showing result when previewResult changes
  React.useEffect(() => {
    if (previewResult) {
      setShowingResult(true);
    } else {
      setShowingResult(false);
    }
  }, [previewResult]);
  
  const sortedStages = [...stages].sort((a, b) => a.order - b.order);
  const currentStage = sortedStages[currentStageIndex];
  
  const handleNext = () => {
    if (currentStageIndex < sortedStages.length - 1) {
      setCurrentStageIndex(prev => prev + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(prev => prev - 1);
    }
  };
  
  // Handle back from result view
  const handleBackFromResult = () => {
    setShowingResult(false);
  };
  
  if (stages.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Nenhuma etapa adicionada ao quiz ainda.</p>
          <p className="text-gray-400 text-sm">Adicione etapas no modo editor para visualizar aqui.</p>
        </div>
      </div>
    );
  }
  
  if (showingResult && previewResult) {
    return (
      <QuizContainer>
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={handleBackFromResult}
            className="border-[#B89B7A]/30 text-[#432818] transition-all duration-200 hover:border-[#B89B7A]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o Quiz
          </Button>
        </div>
        <ResultPreview result={previewResult} />
      </QuizContainer>
    );
  }
  
  const stageComponents = components.filter(c => c.stageId === currentStage?.id)
    .sort((a, b) => a.order - b.order);
  
  // Render the StagePreview directly - navigate buttons appear only on toolbar
  return (
    <StagePreview 
      stage={currentStage} 
      components={stageComponents} 
    />
  );
};

export default QuizPreview;
