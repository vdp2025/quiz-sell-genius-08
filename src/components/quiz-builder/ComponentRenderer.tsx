
import React from 'react';
import { cn } from '@/lib/utils';
import { QuizComponentData, QuizOption } from '@/types/quizBuilder';

interface ComponentRendererProps {
  component: QuizComponentData;
  isPreview: boolean;
  isSelected: boolean;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ 
  component, 
  isPreview,
  isSelected
}) => {
  const { type, data, style } = component;
  
  const componentStyles = {
    padding: style?.paddingY && style?.paddingX ? `${style.paddingY}px ${style.paddingX}px` : undefined,
    backgroundColor: style?.backgroundColor || undefined,
    color: style?.textColor || undefined,
    borderRadius: style?.borderRadius ? `${style.borderRadius}px` : undefined,
  };
  
  const renderComponent = () => {
    switch (type) {
      case 'header':
        return (
          <header className="text-center py-8">
            <h1 className="text-3xl font-playfair text-[#432818]">{data.title || 'Título do Quiz'}</h1>
            {data.subtitle && <p className="mt-2 text-[#8F7A6A]">{data.subtitle}</p>}
          </header>
        );
        
      case 'headline':
        return (
          <div className="py-4">
            <h2 className="text-2xl font-playfair text-[#432818]">{data.title || 'Título da Seção'}</h2>
            {data.subtitle && <p className="mt-1 text-[#8F7A6A]">{data.subtitle}</p>}
          </div>
        );
        
      case 'text':
        return (
          <div className="py-2">
            <p className="text-[#432818]">{data.text || 'Insira seu texto aqui...'}</p>
          </div>
        );
        
      case 'image':
        return (
          <div className="py-4">
            {data.imageUrl ? (
              <img 
                src={data.imageUrl} 
                alt={data.alt || "Imagem"} 
                className="mx-auto rounded-lg max-w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 rounded-lg w-full h-40 flex items-center justify-center text-[#8F7A6A]">
                Selecione uma imagem
              </div>
            )}
          </div>
        );
        
      case 'multipleChoice':
        // Check if we have the fullOptions property and if it contains images
        const fullOptions = data.fullOptions || [];
        const hasImages = fullOptions.some(opt => opt.imageUrl);
        const optionsToDisplay = data.options || ['Opção 1', 'Opção 2', 'Opção 3'];
        
        // Create a safe fullOptionsToDisplay array that's guaranteed to have the right properties
        const fullOptionsToDisplay: QuizOption[] = fullOptions.length > 0 ? 
          fullOptions : 
          optionsToDisplay.map(text => ({ text }));
        
        return (
          <div className="w-full max-w-6xl mx-auto pb-5 relative">
            <h2 className="text-base sm:text-xl font-playfair text-center mb-5 px-3 pt-3 text-brand-coffee font-semibold tracking-normal">
              {data.question || data.title || 'Sua pergunta aqui?'}
            </h2>
            
            <p className="text-xs sm:text-sm text-[#1A1818]/70 px-2 py-2 mb-4 text-center font-medium">
              Selecione {data.multiSelect || 3} Opções
            </p>
            
            <div className={cn(
              "grid gap-3", 
              hasImages ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"
            )}>
              {optionsToDisplay.map((option, index) => {
                const fullOption = fullOptionsToDisplay[index];
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "border border-[#B89B7A]/30 rounded-lg hover:border-[#B89B7A] transition-colors",
                      hasImages ? "overflow-hidden flex flex-col" : "flex items-center p-3"
                    )}
                  >
                    {hasImages && fullOption && fullOption.imageUrl && (
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={fullOption.imageUrl} 
                          alt={fullOption.text}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                    
                    <div className={cn(
                      hasImages ? "p-3 text-center w-full" : "flex items-center space-x-3"
                    )}>
                      {!hasImages && (
                        <div className="flex-shrink-0 w-5 h-5 border border-[#B89B7A] rounded"></div>
                      )}
                      <span className="text-[#432818] text-sm">{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
        
      case 'singleChoice':
        return (
          <div className="py-4">
            <h3 className="text-xl font-medium text-[#432818] mb-4">{data.question || 'Sua pergunta aqui?'}</h3>
            <div className="space-y-2">
              {(data.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg border-[#B89B7A]/30 hover:border-[#B89B7A]">
                  <div className="w-5 h-5 rounded-full border border-[#B89B7A]"></div>
                  <label className="text-[#432818]">{option}</label>
                </div>
              ))}
            </div>
          </div>
        );
        
      default:
        return (
          <div className="py-4 px-6 border border-dashed border-[#B89B7A]/40 rounded-lg text-center">
            <p className="text-[#8F7A6A]">Componente {type} ainda não implementado</p>
          </div>
        );
    }
  };
  
  return (
    <div 
      className={cn(
        "transition-all duration-200",
        isSelected && !isPreview && "bg-blue-50",
        !isPreview && "hover:bg-gray-50 cursor-pointer"
      )}
      style={componentStyles}
    >
      {renderComponent()}
    </div>
  );
};
