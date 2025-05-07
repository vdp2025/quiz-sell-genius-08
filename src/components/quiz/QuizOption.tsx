import React, { useState, useEffect, useRef } from 'react';
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
  // Usar ref para evitar re-renderizações desnecessárias
  const optionRef = useRef<HTMLDivElement>(null);
  
  // Usar useEffect para lidar com mudanças de isSelected sem causar flash
  useEffect(() => {
    if (optionRef.current) {
      // Aplicar mudanças de estilo diretamente ao DOM para evitar re-renderização
      if (isSelected) {
        optionRef.current.style.borderColor = '#b29670';
        optionRef.current.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
      } else {
        optionRef.current.style.borderColor = '#B89B7A';
        optionRef.current.style.boxShadow = 'none';
      }
    }
  }, [isSelected]);
  
  // Manipulador de clique personalizado com debounce para evitar múltiplos cliques rápidos
  const handleClick = () => {
    if (!isDisabled) {
      // Aplicar mudança visual imediatamente para feedback instantâneo
      if (optionRef.current) {
        optionRef.current.style.borderColor = isSelected ? '#B89B7A' : '#b29670';
      }
      // Chamar onSelect com um pequeno atraso para evitar flash durante atualizações de estado
      setTimeout(() => {
        onSelect(option.id);
      }, 10);
    }
  };
  
  return (
    <div 
      className={cn(
        "relative h-full",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      {/* Conteúdo principal com ref para manipulação direta do DOM */}
      <div 
        ref={optionRef}
        className={cn(
          "relative h-full flex flex-col rounded-lg overflow-hidden",
          "cursor-pointer", 
          
          // Para opções de texto - usando fundo sólido consistente
          type === 'text' && "p-4 border",
          
          // Para opções de imagem
          type !== 'text' && "border",
          
          // Fundo sólido sem transparência
          "bg-[#F9F7F4]"
          
          // Removidas classes condicionais que causam re-renderização
          // Esses estilos serão aplicados via DOM no useEffect
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
                isMobile ? "text-[0.7rem]" : "text-[0.7rem] sm:text-sm"
              )
            : cn(
                "leading-relaxed text-[#432818]",
                isMobile ? "text-[0.75rem]" : "text-sm sm:text-base"
              )
        )}>
          {highlightStrategicWords(option.text)}
        </p>
        
        {/* Renderização condicional do indicador de seleção - causa menos flash */}
        <div 
          className={cn(
            "absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#b29670] rounded-full flex items-center justify-center z-10",
            isSelected ? "block" : "hidden" // Usar display block/none em vez de renderização condicional
          )}
        >
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
      </div>
    </div>
  );
};

export { QuizOption };

