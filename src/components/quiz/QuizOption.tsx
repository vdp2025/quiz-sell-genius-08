import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { QuizOption as QuizOptionType } from '@/types/quiz';
import { highlightStrategicWords } from '@/utils/textHighlight';
import { QuizOptionImage } from './QuizOptionImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface QuizOptionProps {
  option: QuizOptionType;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
  type: 'text' | 'image' | 'both';
  questionId?: string;
  isDisabled?: boolean;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');
  
  // Simplificação radical: sem transformações, sem transições complexas
  return (
    <div 
      className={cn(
        "relative h-full",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !isDisabled && onSelect(option.id)}
    >
      {/* Conteúdo principal simplificado - sem transições, sem transparências */}
      <div 
        className={cn(
          "relative h-full flex flex-col rounded-lg overflow-hidden",
          "cursor-pointer", 
          
          // Para opções de texto - usando fundo sólido consistente, sem transparências
          type === 'text' && "p-4 border",
          
          // Para opções de imagem
          type !== 'text' && "border border-[#B89B7A]",
          
          // Fundo sólido sem transparência
          "bg-[#F8F5F0]",
          
          // Estados simplificados - eliminando transformações e propriedades que podem causar reflow/repaint
          isSelected 
            ? "border-[#b29670] shadow-md" 
            : "border-[#B89B7A]"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory}
            isSelected={isSelected}
            is3DQuestion={is3DQuestion}
            questionId={questionId || ''}
          />
        )}
        
        <p className={cn(
          type !== 'text' 
            ? cn(
                "leading-tight font-medium py-0 px-2 mt-auto text-[#432818] relative", 
                isMobile ? "text-[0.7rem]" : "text-[0.7rem] sm:text-sm",
                isSelected && "font-semibold"
              )
            : cn(
                "leading-relaxed text-[#432818]",
                isMobile ? "text-[0.75rem]" : "text-sm sm:text-base",
                isSelected && "font-semibold"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
      
      {/* Indicador de seleção simplificado - sem animações */}
      {isSelected && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#b29670] rounded-full flex items-center justify-center z-10">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-2 w-2 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export { QuizOption };

