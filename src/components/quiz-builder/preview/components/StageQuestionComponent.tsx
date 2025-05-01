
import React from 'react';
import { cn } from '@/lib/utils';
import { QuizComponentStyle } from '@/types/quizBuilder';

interface StageQuestionComponentProps {
  data: {
    title?: string;
    description?: string;
    options?: Array<{
      id: string;
      text?: string;
      imageUrl?: string;
    }>;
    displayType?: 'text' | 'image' | 'both';
    required?: boolean;
    multiSelect?: number;
    layout?: {
      columns: number;
      direction: 'horizontal' | 'vertical';
    };
    imageSize?: 'small' | 'medium' | 'large';
    selectionIndicator?: 'border' | 'checkbox' | 'highlight';
  };
  style?: QuizComponentStyle;
  isSelected?: boolean;
}

const StageQuestionComponent: React.FC<StageQuestionComponentProps> = ({
  data,
  style,
  isSelected = false
}) => {
  // Convert style properties to CSS style object with defaults
  const getComponentStyles = () => {
    return {
      backgroundColor: style?.backgroundColor || '#FFFFFF',
      color: style?.textColor || '#333333',
      borderRadius: style?.borderRadius ? `${style.borderRadius}px` : '0',
      padding: style?.padding || '1rem',
      margin: style?.margin || '0',
      borderColor: style?.borderColor || 'transparent',
      borderWidth: style?.borderWidth || '0',
      boxShadow: style?.boxShadow || 'none',
    };
  };

  const getGridColumns = () => {
    const columns = data.layout?.columns || 1;
    return `grid-cols-1 md:grid-cols-${columns > 4 ? 4 : columns}`;
  };

  return (
    <div 
      style={getComponentStyles()} 
      className={cn("py-8 px-6", isSelected && "bg-opacity-90")}
    >
      {data.title && (
        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-center">
          {data.title}
        </h2>
      )}
      {data.description && (
        <p className="mb-8 text-center max-w-2xl mx-auto text-lg">
          {data.description}
        </p>
      )}
      
      <div className={`grid ${getGridColumns()} gap-4 md:gap-6 max-w-4xl mx-auto`}>
        {(data.options || []).map((option, index) => (
          <div 
            key={option.id || index} 
            className={cn(
              "relative rounded-lg overflow-hidden transition-all duration-200 transform hover:scale-102",
              "bg-white border-2 hover:border-[#B89B7A] cursor-pointer",
              data.selectionIndicator === 'highlight' ? "hover:bg-[#FCF9F6]" : "hover:shadow-md"
            )}
          >
            {(data.displayType === 'image' || data.displayType === 'both') && option.imageUrl && (
              <div className="w-full overflow-hidden">
                <img 
                  src={option.imageUrl} 
                  alt={option.text || `Opção ${index + 1}`}
                  className={cn(
                    "w-full object-cover",
                    {
                      'h-32': data.imageSize === 'small',
                      'h-48': data.imageSize === 'medium',
                      'h-64': data.imageSize === 'large'
                    }
                  )}
                />
              </div>
            )}
            
            {(data.displayType === 'text' || data.displayType === 'both') && option.text && (
              <div className={cn(
                "p-4",
                !option.imageUrl && "min-h-[80px] flex items-center justify-center"
              )}>
                <div className="text-center font-medium">{option.text}</div>
              </div>
            )}
            
            {data.selectionIndicator === 'checkbox' && (
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-gray-300"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StageQuestionComponent;
