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
      backgroundColor: style?.backgroundColor || 'transparent',
      color: style?.textColor || 'inherit',
      borderRadius: style?.borderRadius ? {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '1rem',
        'full': '9999px'
      }[style.borderRadius] : '0',
      padding: style?.padding || '1rem',
      margin: style?.margin || '0',
      borderColor: style?.borderColor || 'transparent',
      borderWidth: style?.borderWidth || '0',
      boxShadow: style?.boxShadow || 'none',
    };
  };

  return (
    <div 
      style={getComponentStyles()} 
      className={cn("py-4", isSelected && "bg-opacity-90")}
    >
      {data.title && (
        <h2 className="text-2xl font-bold mb-4">{data.title}</h2>
      )}
      {data.description && (
        <p className="mb-6">{data.description}</p>
      )}
      
      <div className={`grid grid-cols-${data.layout?.columns || 1} gap-4`}>
        {(data.options || []).map((option, index) => (
          <div 
            key={option.id || index} 
            className={cn(
              "p-4 border rounded-md cursor-pointer hover:bg-slate-50",
              data.selectionIndicator === 'highlight' && "hover:bg-blue-50"
            )}
          >
            {(data.displayType === 'image' || data.displayType === 'both') && option.imageUrl && (
              <img 
                src={option.imageUrl} 
                alt={option.text || `Opção ${index + 1}`}
                className={cn(
                  "mx-auto rounded-md",
                  {
                    'h-24': data.imageSize === 'small',
                    'h-40': data.imageSize === 'medium',
                    'h-64': data.imageSize === 'large'
                  }
                )}
              />
            )}
            
            {(data.displayType === 'text' || data.displayType === 'both') && option.text && (
              <div className="mt-3 text-center">{option.text}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StageQuestionComponent;
