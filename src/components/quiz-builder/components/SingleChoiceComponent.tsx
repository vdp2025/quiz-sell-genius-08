
import React from 'react';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

interface SingleChoiceComponentProps {
  data: {
    question?: string;
    options?: string[];
    imageSize?: 'small' | 'medium' | 'large';
    optionImages?: string[];
    displayType?: 'text' | 'image' | 'both';
    layout?: {
      columns: 1 | 2 | 3 | 4;
      direction: 'vertical' | 'horizontal';
    };
  };
  style?: {
    textColor?: string;
    backgroundColor?: string;
    selectionIndicator?: 'border' | 'radio' | 'highlight';
  };
  isEditing?: boolean;
  isSelected?: boolean;
}

const SingleChoiceComponent: React.FC<SingleChoiceComponentProps> = ({
  data,
  style,
  isEditing = false,
  isSelected = false
}) => {
  const options = data.options || [];
  const imageUrls = data.optionImages || [];
  const displayType = data.displayType || 'text';
  const columns = data.layout?.columns || 2;
  const selectionIndicator = style?.selectionIndicator || 'border';

  return (
    <div className="w-full">
      <h3 
        className={cn(
          "text-xl font-medium mb-4",
          isEditing && !data.question && "opacity-50"
        )}
        style={{ color: style?.textColor || 'inherit' }}
      >
        {data.question || 'Pergunta do Quiz'}
      </h3>
      
      <div 
        className={cn(
          "grid gap-4",
          columns === 1 && "grid-cols-1",
          columns === 2 && "grid-cols-1 sm:grid-cols-2",
          columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
        )}
      >
        {options.length > 0 ? (
          options.map((option, index) => (
            <div 
              key={index}
              className={cn(
                "border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                selectionIndicator === 'border' && "hover:border-[#9b87f5]",
                selectionIndicator === 'highlight' && "hover:bg-[#9b87f5]/10"
              )}
            >
              <div className="flex items-start gap-3">
                {selectionIndicator === 'radio' && (
                  <div className="w-5 h-5 border border-gray-300 rounded-full flex-shrink-0 mt-1" />
                )}
                
                <div className="flex-1">
                  {(displayType === 'image' || displayType === 'both') && (
                    <div className={cn(
                      "mb-3 rounded overflow-hidden bg-gray-100",
                      data.imageSize === 'small' && "h-24",
                      data.imageSize === 'medium' && "h-40",
                      data.imageSize === 'large' && "h-56",
                      !data.imageSize && "h-40"
                    )}>
                      {imageUrls[index] ? (
                        <img 
                          src={imageUrls[index]} 
                          alt={option} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <HelpCircle className="text-gray-300" size={24} />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {(displayType === 'text' || displayType === 'both') && (
                    <span>{option}</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-6 text-gray-400 border border-dashed rounded-lg">
            Nenhuma opção configurada
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleChoiceComponent;
