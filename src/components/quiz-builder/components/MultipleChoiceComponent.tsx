
import React from 'react';
import { cn } from '@/lib/utils';

interface MultipleChoiceComponentProps {
  data: {
    question?: string;
    options?: string[] | Array<{text: string; imageUrl?: string; styleCategory?: string}>;
    optionImages?: string[];
    displayType?: 'text' | 'image' | 'both';
    minSelections?: number;
    maxSelections?: number;
    [key: string]: any;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    [key: string]: any;
  };
  isSelected?: boolean;
}

const MultipleChoiceComponent: React.FC<MultipleChoiceComponentProps> = ({ data, style, isSelected }) => {
  // Safely handle options - ensure we're dealing with an array and normalize data format
  const normalizeOptions = () => {
    if (!data.options) return ['Opção 1', 'Opção 2', 'Opção 3'];
    
    if (!Array.isArray(data.options)) {
      console.warn('Expected options to be an array');
      return ['Opção 1', 'Opção 2', 'Opção 3'];
    }
    
    return data.options;
  };
  
  const options = normalizeOptions();
  const displayType = data.displayType || 'text';
  
  // Helper function to safely get option text
  const getOptionText = (option: any, index: number): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (option && typeof option === 'object' && 'text' in option) {
      return option.text || `Opção ${index + 1}`;
    }
    return `Opção ${index + 1}`;
  };
  
  // Helper function to safely get option image
  const getOptionImage = (option: any, index: number): string | null => {
    if (typeof option === 'object' && option && 'imageUrl' in option) {
      return option.imageUrl || null;
    }
    if (data.optionImages && Array.isArray(data.optionImages) && data.optionImages[index]) {
      return data.optionImages[index];
    }
    return null;
  };
  
  return (
    <div 
      className={cn(
        "p-4",
        isSelected && "outline-dashed outline-1 outline-blue-400"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit'
      }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">{data.question || "Pergunta de múltipla escolha"}</h3>
        <p className="text-sm text-gray-500">
          {data.minSelections && data.maxSelections ? 
            `Selecione de ${data.minSelections} a ${data.maxSelections} opções` : 
            "Selecione uma ou mais opções"}
        </p>
      </div>

      <div className="space-y-2">
        {options.map((option, index) => (
          <div 
            key={index}
            className="border rounded-md p-3 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {(displayType === 'image' || displayType === 'both') && (
              <div className="mb-2">
                {getOptionImage(option, index) ? (
                  <img 
                    src={getOptionImage(option, index) || ''} 
                    alt={getOptionText(option, index)}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-md">
                    <span className="text-sm text-gray-500">Sem imagem</span>
                  </div>
                )}
              </div>
            )}
            
            {(displayType === 'text' || displayType === 'both') && (
              <div className="flex items-center">
                <div className="w-5 h-5 border border-gray-300 rounded mr-3"></div>
                <span>{getOptionText(option, index)}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceComponent;
