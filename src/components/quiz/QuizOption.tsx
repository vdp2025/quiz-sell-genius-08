
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { QuizOptionType } from '@/types/quiz';
import { optimizeCloudinaryUrl } from '@/utils/imageUtils';

interface QuizOptionProps {
  option: {
    id: string;
    text: string;
    imageUrl?: string;
    description?: string;
    styleCategory?: string;
    order?: number;
  };
  isSelected: boolean;
  onSelect: (id: string) => void;
  isDisabled?: boolean;
  type?: 'image' | 'text' | 'both';
  questionId: string;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  option,
  isSelected,
  onSelect,
  isDisabled = false,
  type = 'text',
  questionId,
}) => {
  const [imageError, setImageError] = useState(false);
  const hasImage = type !== 'text' && option.imageUrl && !imageError;
  const isStrategic = questionId.startsWith('strategic');
  
  // Função para otimizar a URL da imagem para melhor qualidade
  const optimizedImageUrl = option.imageUrl 
    ? optimizeCloudinaryUrl(option.imageUrl, { quality: 85, format: 'auto' }) 
    : '';
  
  return (
    <div
      role="button"
      onClick={() => !isDisabled && onSelect(option.id)}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      className={cn(
        "relative transition-all duration-150 rounded-md overflow-hidden cursor-pointer",
        isDisabled && "opacity-60 cursor-not-allowed",
        hasImage ? "flex flex-col" : "p-4",
        isSelected
          ? "transform scale-[1.01] shadow-[0_10px_20px_rgba(0,0,0,0.15)]"  // Efeito 3D quando selecionado
          : "hover:shadow-md",
        isStrategic && "max-w-full"
      )}
      data-testid={`quiz-option-${option.id}`}
    >
      {hasImage && (
        <div
          className={cn(
            "relative w-full overflow-hidden",
            isSelected
              ? "shadow-[inset_0_0_0_3px_rgba(184,155,122,0.8)]" // Substituindo a borda por shadow inset
              : "shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
          )}
        >
          <img
            src={optimizedImageUrl}
            alt={option.text || "Option image"}
            className={cn(
              "w-full h-auto object-cover transition-all duration-200",
              isSelected
                ? "brightness-110 contrast-105"
                : "hover:brightness-105",
              isStrategic ? "max-h-52" : "max-h-48"
            )}
            loading="lazy"
            onError={() => {
              console.error(`Failed to load image for option ${option.id}`);
              setImageError(true);
            }}
          />
          {/* Efeito de sombra 3D */}
          <div className={cn(
            "absolute inset-0",
            isSelected
              ? "shadow-[inset_0_-8px_20px_rgba(0,0,0,0.1),_0_4px_8px_rgba(184,155,122,0.3)]"
              : "shadow-[inset_0_-4px_12px_rgba(0,0,0,0.07)]",
            "pointer-events-none"
          )}></div>
        </div>
      )}

      <div
        className={cn(
          "flex-grow",
          hasImage
            ? "p-3 border-t border-[#B89B7A]/10"
            : "",
          isSelected
            ? "bg-[#FAF9F7] text-[#432818]"
            : "bg-white text-[#8F7A6A] hover:text-[#432818]",
        )}
      >
        <div className={cn("flex items-start gap-2")}>
          <div className="flex-grow">
            <p className={cn(
              "font-medium",
              isSelected ? "text-[#432818]" : ""
            )}>
              {option.text}
            </p>
            {option.description && (
              <p className="text-sm text-[#8F7A6A] mt-1">{option.description}</p>
            )}
          </div>
          
          {/* Indicador de seleção */}
          <div className={cn(
            "min-w-[20px] min-h-[20px] rounded-full flex items-center justify-center",
            isSelected
              ? "bg-[#B89B7A] text-white"
              : "border-2 border-[#B89B7A]/50"
          )}>
            {isSelected && <Check className="w-3.5 h-3.5" />}
          </div>
        </div>
      </div>
      
      {/* Overlay para efeito 3D quando selecionado */}
      {isSelected && (
        <div className="absolute inset-0 pointer-events-none shadow-[0_8px_20px_rgba(184,155,122,0.2)]"></div>
      )}
    </div>
  );
};

export { QuizOption };
