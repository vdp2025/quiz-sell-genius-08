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
  const [wasSelected, setWasSelected] = useState(isSelected);
  
  // Rastrear se a opção foi selecionada anteriormente para suavizar transições
  useEffect(() => {
    if (isSelected) {
      setWasSelected(true);
    }
  }, [isSelected]);

  // Construir classes de estilo para texto e contêiner
  const containerClasses = cn(
    "relative h-full flex flex-col rounded-lg overflow-hidden",
    "will-change-transform transition-all duration-300 ease-out cursor-pointer", 
    
    // Para opções de texto
    type === 'text' && "p-4 border shadow-sm",
    
    // Para opções de imagem
    type !== 'text' && "border border-[#B89B7A]/20",
    
    // Estado selecionado - usando cores mais suaves
    isSelected ? 
      type === 'text' 
        ? "border-brand-gold/60 shadow-md ring-1 ring-brand-gold/30 transform scale-[1.01]" 
        : "border-brand-gold/60 shadow-md ring-1 ring-brand-gold/30 transform scale-[1.01]"
      : 
      // Estado não selecionado - preparado para transição
      type === 'text' 
        ? `border-[#B89B7A]/10 ${isHovered ? "border-brand-gold/40 shadow-sm bg-[#FAF7F3]/80 scale-[1.01]" : "bg-[#FEFEFE]"}` 
        : `${isHovered ? "border-brand-gold/40 shadow-sm" : ""}`
  );
  
  // Corrigindo texto para evitar mudanças abruptas
  const textClasses = cn(
    "transition-colors duration-300",
    type !== 'text' 
      ? cn(
          "leading-tight font-medium bg-transparent py-0 px-2 mt-auto relative", 
          isMobile ? "text-[0.7rem]" : "text-[0.7rem] sm:text-sm",
          // Evitar mudança brusca na cor do texto
          isSelected ? "text-brand-coffee font-semibold" : "text-brand-coffee/90"
        )
      : cn(
          "leading-relaxed",
          isMobile ? "text-[0.75rem]" : "text-sm sm:text-base",
          // Suavizar transição de texto
          isSelected ? "text-brand-coffee font-semibold" : "text-brand-coffee/90"
        )
  );

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-transform duration-300 ease-in-out", 
        !type.includes('text') && !isSelected && "hover:scale-[1.02]",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={() => !isDisabled && onSelect(option.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Contêiner principal com transições melhoradas */}
      <div className={containerClasses}>
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
        
        <p className={textClasses}>
          {highlightStrategicWords(option.text)}
        </p>
      </div>
      
      {/* Animação suave para o indicador de seleção */}
      <div 
        className={cn(
          "absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center shadow-sm z-10",
          "transition-all duration-300",
          isSelected 
            ? "opacity-100 bg-brand-gold transform scale-100" 
            : wasSelected 
              ? "opacity-0 bg-brand-gold/0 transform scale-0" 
              : "hidden"
        )}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-2 w-2 text-white transition-opacity duration-300" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
};

export { QuizOption };

