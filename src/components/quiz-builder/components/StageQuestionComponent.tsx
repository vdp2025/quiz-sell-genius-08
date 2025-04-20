
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ArrowRight, Check } from 'lucide-react';

interface StageQuestionComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const StageQuestionComponent: React.FC<StageQuestionComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  const displayType = data.displayType || 'text';
  const showImages = displayType === 'image' || displayType === 'both';
  const showText = displayType === 'text' || displayType === 'both';
  const multiSelect = data.multiSelect || 3;
  
  const getGridColumns = () => {
    const columns = data.layout?.columns || 2;
    switch (columns) {
      case 1: return "grid-cols-1 gap-3";
      case 3: return "grid-cols-1 sm:grid-cols-3 gap-3";
      case 4: return "grid-cols-2 sm:grid-cols-4 gap-3";
      default: return "grid-cols-1 sm:grid-cols-2 gap-4"; // Default to 2 columns
    }
  };
  
  const getImageSizeClass = () => {
    const size = data.imageSize || 'medium';
    switch (size) {
      case 'small': return 'h-32';
      case 'large': return 'h-64';
      default: return 'h-48'; // medium
    }
  };
  
  return (
    <div 
      className={cn(
        "w-full max-w-6xl mx-auto pb-5 relative",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || '#FFFAF0',
        color: style?.textColor || '#432818',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <h2 className="text-xl sm:text-2xl font-playfair text-center mb-5 px-3 pt-3 font-semibold tracking-normal">
        {data.title || 'Pergunta do Quiz'}
      </h2>
      
      <p className="text-sm text-[#1A1818]/70 px-2 py-2 mb-4 text-center font-medium">
        {data.question || `Selecione ${multiSelect} opções`}
      </p>
      
      <div className={cn(
        "grid",
        getGridColumns(),
        showImages && "mb-4 relative"
      )}>
        {(data.options || ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']).map((option, index) => {
          const optionImage = data.optionImages && data.optionImages[index];
          const styleCategory = data.optionStyleCategories && data.optionStyleCategories[index];
          
          return (
            <div
              key={index}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md border-2 border-transparent hover:border-[#B89B7A]/60 cursor-pointer",
                showImages ? "flex flex-col" : "p-4"
              )}
            >
              {showImages && optionImage && (
                <div className="w-full">
                  <AspectRatio ratio={4 / 3} className={cn("w-full", getImageSizeClass())}>
                    <img 
                      src={optionImage} 
                      alt={option}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                </div>
              )}
              
              {showText && (
                <div className={cn(
                  "flex items-start gap-2 text-[#432818] p-3",
                  showImages && optionImage ? "border-t border-[#B89B7A]/10" : ""
                )}>
                  <div className="h-5 w-5 rounded-full border-2 border-[#B89B7A] flex-shrink-0 mr-2 mt-0.5"></div>
                  <div>
                    <p>{option}</p>
                    {styleCategory && <span className="text-xs text-gray-500">({styleCategory})</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between items-center mt-6">
        <p className="text-sm text-[#1A1818]/70 px-2 py-2 text-center font-medium">
          Selecione {multiSelect} opções para avançar
        </p>
        
        <Button 
          className="bg-[#B89B7A]/40 text-white px-4 py-2 rounded cursor-not-allowed"
          disabled={true}
        >
          Próxima
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="mt-4 text-sm text-[#432818]/60 text-center">
        {data.stageTitle || 'Pergunta'} • {data.stageNumber || 1} de 7
      </div>
      
      <div className="w-full h-1 bg-[#B89B7A]/20 mt-3 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#B89B7A]" 
          style={{ 
            width: `${(data.stageNumber || 0) / 7 * 100}%` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default StageQuestionComponent;
