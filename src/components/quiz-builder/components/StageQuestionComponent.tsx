
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface OptionObject {
  text: string;
  imageUrl?: string;
  styleCategory?: string;
}

type Option = string | OptionObject;

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
          // Extract text and image from option
          let optionText: string;
          let optionImage: string | null = null;
          
          if (typeof option === 'string') {
            optionText = option;
            optionImage = data.optionImages && data.optionImages[index] || null;
          } else if (typeof option === 'object' && option !== null) {
            const optionObj = option as OptionObject;
            optionText = optionObj.text || '';
            optionImage = optionObj.imageUrl || null;
          } else {
            optionText = String(option);
            optionImage = data.optionImages && data.optionImages[index] || null;
          }
          
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
                  <AspectRatio ratio={4 / 3} className="max-h-48">
                    <img 
                      src={optionImage} 
                      alt={optionText}
                      className="w-full h-full object-cover rounded-t-lg"
                    />
                  </AspectRatio>
                </div>
              )}
              
              {showText && (
                <div className={cn(
                  "flex-1 p-3 text-[#432818]",
                  showImages && optionImage ? "border-t border-[#B89B7A]/10" : ""
                )}>
                  {optionText}
                </div>
              )}
              
              <div className="absolute top-2 right-2 w-6 h-6 border-2 border-[#B89B7A] rounded-full bg-white/80 hidden"></div>
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
