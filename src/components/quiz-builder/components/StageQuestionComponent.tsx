
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
  id?: string;
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
  const imageSize = data.imageSize || 'medium';
  const selectionIndicator = data.selectionIndicator || 'border';
  
  const getGridColumns = () => {
    const columns = data.layout?.columns || 2;
    switch (columns) {
      case 1: return "grid-cols-1 gap-3";
      case 3: return "grid-cols-1 sm:grid-cols-3 gap-3";
      case 4: return "grid-cols-2 sm:grid-cols-4 gap-3";
      default: return "grid-cols-1 sm:grid-cols-2 gap-4"; // Default to 2 columns
    }
  };
  
  const getImageSize = () => {
    switch (imageSize) {
      case 'small': return { ratio: 16 / 9, classes: "max-h-24" };
      case 'large': return { ratio: 4 / 3, classes: "max-h-64" };
      default: return { ratio: 4 / 3, classes: "max-h-48" }; // Medium is default
    }
  };
  
  const imageConfig = getImageSize();
  
  // Helper function to safely extract text and image from option
  const extractOptionData = (option: Option, index: number) => {
    let text = '';
    let imageUrl: string | null = null;
    let styleCategory: string | undefined = undefined;
    
    if (typeof option === 'string') {
      text = option;
      if (data.optionImages && Array.isArray(data.optionImages) && data.optionImages[index]) {
        imageUrl = data.optionImages[index];
      }
    } else if (option && typeof option === 'object') {
      const optionObj = option as OptionObject;
      text = optionObj.text || '';
      imageUrl = optionObj.imageUrl || null;
      styleCategory = optionObj.styleCategory;
    }
    
    return { text, imageUrl, styleCategory };
  };
  
  return (
    <div 
      className={cn(
        "w-full max-w-6xl mx-auto pb-5 relative",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || data.backgroundColorQuestion || '#FFFAF0',
        color: style?.textColor || data.textColorQuestion || '#432818',
        borderRadius: style?.borderRadius ? `${style?.borderRadius}px` : '8px',
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <h2 className="text-xl sm:text-2xl font-playfair text-center mb-5 px-3 pt-3 font-semibold tracking-normal">
        {data.title || data.question || 'Pergunta do Quiz'}
      </h2>
      
      <p className="text-sm text-[#1A1818]/70 px-2 py-2 mb-4 text-center font-medium">
        {data.subtitle || (multiSelect > 1 ? `Selecione ${multiSelect} opções` : 'Selecione uma opção')}
      </p>
      
      <div className={cn(
        "grid",
        getGridColumns(),
        showImages && "mb-4 relative"
      )}>
        {(data.options || ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4']).map((option, index) => {
          const { text, imageUrl } = extractOptionData(option, index);
          
          return (
            <div
              key={index}
              className={cn(
                "relative rounded-lg overflow-hidden transition-all duration-200 hover:shadow-md border-2 border-transparent hover:border-[#B89B7A]/60 cursor-pointer",
                showImages ? "flex flex-col" : "p-4"
              )}
            >
              {showImages && (
                <div className="w-full">
                  {imageUrl ? (
                    <AspectRatio ratio={imageConfig.ratio} className={imageConfig.classes}>
                      <img 
                        src={imageUrl} 
                        alt={text}
                        className="w-full h-full object-cover rounded-t-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada';
                        }}
                      />
                    </AspectRatio>
                  ) : (
                    <AspectRatio ratio={imageConfig.ratio} className={imageConfig.classes}>
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </AspectRatio>
                  )}
                </div>
              )}
              
              {showText && (
                <div className={cn(
                  "flex-1 p-3 text-[#432818]",
                  showImages && imageUrl ? "border-t border-[#B89B7A]/10" : ""
                )}>
                  {text}
                </div>
              )}
              
              {selectionIndicator === 'checkbox' && (
                <div className="absolute top-2 right-2 w-6 h-6 border-2 border-[#B89B7A] rounded-full bg-white/80"></div>
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
        {data.stageTitle || 'Pergunta'} • {data.stageNumber || 1} de {data.totalStages || 7}
      </div>
      
      <div className="w-full h-1 bg-[#B89B7A]/20 mt-3 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#B89B7A]" 
          style={{ 
            width: `${((data.stageNumber || 1) / (data.totalStages || 7)) * 100}%` 
          }}
        ></div>
      </div>
    </div>
  );
};

export default StageQuestionComponent;
