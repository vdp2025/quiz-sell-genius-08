
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Define the option type to handle both string and object options
interface OptionObject {
  text: string;
  imageUrl?: string;
  styleCategory?: string;
  id?: string;
}

type Option = string | OptionObject;

interface MultipleChoiceComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const MultipleChoiceComponent: React.FC<MultipleChoiceComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  const getColumnsClass = () => {
    const columns = data.layout?.columns || 2;
    switch (columns) {
      case 1: return "grid-cols-1";
      case 3: return "grid-cols-1 sm:grid-cols-3";
      case 4: return "grid-cols-2 sm:grid-cols-4";
      default: return "grid-cols-1 sm:grid-cols-2"; // Default to 2 columns
    }
  };

  const getImageSize = () => {
    switch (data.imageSize || 'medium') {
      case 'small': return { ratio: 16 / 9, classes: "max-h-24" };
      case 'large': return { ratio: 4 / 3, classes: "max-h-64" };
      default: return { ratio: 4 / 3, classes: "max-h-48" }; // Medium is default
    }
  };

  const imageConfig = getImageSize();
  const displayType = data.displayType || 'text';
  const showImages = displayType === 'image' || displayType === 'both';
  const showText = displayType === 'text' || displayType === 'both';
  const maxSelections = data.maxSelections || data.multiSelect || 3;

  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <h3 className="text-lg md:text-xl font-medium mb-4 text-[#432818] text-center">
        {data.question || 'Sua pergunta aqui?'}
      </h3>
      
      <p className="text-center text-sm text-[#6b605a] mb-6">
        {maxSelections > 1 
          ? `Selecione ${maxSelections} opções`
          : 'Selecione uma opção'}
      </p>
      
      <div className={cn(
        "grid gap-3",
        getColumnsClass()
      )}>
        {(data.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => {
          // Handle both string options and object options with proper type checking
          let optionText: string;
          let optionImage: string | null = null;
          
          if (typeof option === 'string') {
            optionText = option;
          } else if (typeof option === 'object' && option !== null) {
            // We need to cast option to OptionObject to access its properties safely
            const optionObj = option as OptionObject;
            optionText = optionObj.text || '';
            optionImage = optionObj.imageUrl || null;
          } else {
            // Fallback for any other type
            optionText = String(option);
          }
          
          return (
            <div 
              key={index}
              className={cn(
                "border border-gray-200 rounded-md hover:border-[#B89B7A]/50 hover:bg-[#FAF9F7] cursor-pointer transition-colors",
                showImages ? "overflow-hidden flex flex-col" : "p-3"
              )}
            >
              {showImages && optionImage && (
                <div className="w-full">
                  <AspectRatio ratio={imageConfig.ratio} className={imageConfig.classes}>
                    <img 
                      src={optionImage} 
                      alt={optionText} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://placehold.co/100x100?text=Erro';
                      }}
                    />
                  </AspectRatio>
                </div>
              )}
              
              {showImages && !optionImage && showImages && (
                <div className="w-full">
                  <AspectRatio ratio={imageConfig.ratio} className={imageConfig.classes}>
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </AspectRatio>
                </div>
              )}
              
              {showText && (
                <div className={cn("flex-1", showImages && "p-2")}>
                  {optionText}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {!data.autoAdvance && maxSelections > 0 && (
        <div className="flex justify-center mt-4">
          <button className="bg-[#B89B7A]/80 hover:bg-[#B89B7A] text-white px-4 py-2 rounded-md text-sm opacity-50 cursor-not-allowed">
            Continuar
          </button>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceComponent;
