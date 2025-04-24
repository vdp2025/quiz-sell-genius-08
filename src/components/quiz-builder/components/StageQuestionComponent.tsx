
import React from 'react';
import { cn } from '@/lib/utils';

interface StageQuestionComponentProps {
  data: {
    question?: string;
    options?: string[];
    optionImages?: string[];
    optionStyleCategories?: string[];
    displayType?: 'text' | 'image' | 'both';
    multiSelect?: number;
    minSelections?: number;
    maxSelections?: number;
    layout?: {
      columns: 1 | 2 | 3 | 4;
      direction: 'vertical' | 'horizontal';
    };
    imageSize?: 'small' | 'medium' | 'large';
    selectionIndicator?: 'border' | 'checkbox' | 'highlight';
    [key: string]: any;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    [key: string]: any;
  };
  isSelected?: boolean;
}

const StageQuestionComponent: React.FC<StageQuestionComponentProps> = ({ data, style, isSelected }) => {
  const options = data.options || ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4'];
  const optionImages = data.optionImages || [];
  const displayType = data.displayType || 'text';
  const columns = data.layout?.columns || 2;
  const multiSelect = data.multiSelect || 3;
  
  const getImageHeight = () => {
    switch (data.imageSize) {
      case 'small': return 'h-32';
      case 'large': return 'h-64';
      case 'medium':
      default: return 'h-48';
    }
  };
  
  return (
    <div 
      className={cn(
        "p-6",
        isSelected && "outline-dashed outline-2 outline-[#B89B7A]"
      )}
      style={{
        backgroundColor: style?.backgroundColor || '#FFFFFF',
        color: style?.textColor || '#432818',
      }}
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-playfair mb-2">
          {data.question || 'Qual é a sua escolha?'}
        </h2>
        <p className="text-sm text-gray-600">
          {`Selecione ${multiSelect} ${multiSelect === 1 ? 'opção' : 'opções'}`}
        </p>
      </div>
      
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
        {options.map((option, index) => (
          <div
            key={index}
            className={cn(
              "border rounded-md overflow-hidden cursor-pointer transition-all hover:shadow-md",
              data.selectionIndicator === 'border' && "hover:border-[#B89B7A]"
            )}
          >
            {(displayType === 'image' || displayType === 'both') && (
              <div className="relative">
                {optionImages[index] ? (
                  <img
                    src={optionImages[index]}
                    alt={option}
                    className={cn("w-full object-cover", getImageHeight())}
                  />
                ) : (
                  <div className={cn("bg-gray-200 flex items-center justify-center", getImageHeight())}>
                    <span className="text-gray-500">Sem imagem</span>
                  </div>
                )}
              </div>
            )}
            
            {(displayType === 'text' || displayType === 'both') && (
              <div className="p-4 flex items-center">
                {data.selectionIndicator === 'checkbox' && (
                  <div className="w-5 h-5 border border-gray-300 rounded-sm mr-3"></div>
                )}
                <span>{option}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StageQuestionComponent;
