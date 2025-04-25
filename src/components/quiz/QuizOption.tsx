import React, { useState } from 'react';
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
  selectedCount?: number; // Novo: contador de seleções
  maxSelections?: number; // Novo: máximo de seleções permitidas
  isStrategic?: boolean; // Novo: indica se é pergunta estratégica
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  type,
  questionId,
  isDisabled = false,
  selectedCount = 0, // Valor padrão
  maxSelections = 3, // Valor padrão
  isStrategic = false // Valor padrão
}) => {
  const isMobile = useIsMobile();
  const [isHovered, setIsHovered] = useState(false);
  const is3DQuestion = option.imageUrl?.includes('sapatos') || option.imageUrl?.includes('calca');

  // Verifica se pode selecionar mais opções
  const canSelect = isSelected || selectedCount < maxSelections;
  
  // Calcula quantas opções ainda podem ser selecionadas
  const remainingSelections = maxSelections - selectedCount;

  // Determina se o item deve estar desabilitado
  const isOptionDisabled = isDisabled || (!isSelected && !canSelect);

  const handleClick = () => {
    if (!isOptionDisabled) {
      onSelect(option.id);
    }
  };

  return (
    <div 
      className={cn(
        "relative group h-full",
        "transition-all duration-300 ease-in-out transform", 
        !type.includes('text') && !isSelected && "hover:scale-[1.02]",
        isOptionDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div 
        className={cn(
          "relative h-full flex flex-col",
          "transition-all duration-300 ease-out",
          isOptionDisabled ? "cursor-not-allowed" : "cursor-pointer",
          type === 'text' && "p-4 rounded-lg border backdrop-blur-[8px] bg-white/40",
          type !== 'text' && "border border-[#B89B7A]/20 rounded-lg overflow-hidden",
          isSelected 
            ? type === 'text' 
              ? "border-brand-gold/60 bg-white/50 backdrop-blur-[12px] shadow-sm ring-1 ring-brand-gold/30 transform scale-[1.01]" 
              : "border-brand-gold/60 shadow-sm ring-1 ring-brand-gold/30 transform scale-[1.01]"
            : type === 'text' 
              ? "border-[#B89B7A]/10 hover:border-brand-gold/40 hover:bg-white/45 hover:backdrop-blur-[10px] hover:scale-[1.01] hover:shadow-sm" 
              : "hover:border-brand-gold/40 hover:shadow-sm"
        )}
      >
        {type !== 'text' && option.imageUrl && (
          <QuizOptionImage
            imageUrl={option.imageUrl}
            altText={option.text}
            styleCategory={option.styleCategory || ''}
            isSelected={isSelected}
            is3DQuestion={is3DQuestion}
            questionId={questionId || ''}
          />
        )}
        
        <p className={cn(
          "transition-all duration-300",
          type !== 'text' 
            ? cn(
                "leading-tight font-medium bg-transparent py-0 px-2 mt-auto text-brand-text relative", 
                isMobile ? "text-[0.7rem]" : "text-[0.7rem] sm:text-sm",
                isSelected && "font-semibold"
              )
            : cn(
                "leading-relaxed",
                isMobile ? "text-[0.75rem]" : "text-sm sm:text-base",
                isSelected && "text-brand-text font-semibold"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>

        {/* Contador de seleções restantes */}
        {!isStrategic && !isSelected && selectedCount > 0 && (
          <div className="absolute top-2 right-2 text-xs text-brand-gold font-medium bg-white/80 px-2 py-1 rounded-full">
            {remainingSelections} {remainingSelections === 1 ? 'restante' : 'restantes'}
          </div>
        )}
      </div>
      
      {isSelected && (
        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-gold rounded-full flex items-center justify-center shadow-sm z-10 animate-scale-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}

      {/* Mensagem de limite atingido */}
      {!isStrategic && !canSelect && !isSelected && isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
          <p className="text-white text-sm px-4 py-2 bg-brand-gold/90 rounded-md">
            Limite de {maxSelections} seleções atingido
          </p>
        </div>
      )}
    </div>
  );
};

export { QuizOption };