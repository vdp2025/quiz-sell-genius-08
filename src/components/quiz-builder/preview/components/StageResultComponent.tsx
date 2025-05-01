
import React from 'react';
import { cn } from '@/lib/utils';
import { QuizComponentStyle } from '@/types/quizBuilder';

interface StageResultComponentProps {
  data: {
    resultTitle?: string;
    resultDescription?: string;
    showPercentages?: boolean;
    showAdditionalStyles?: boolean;
    callToAction?: string;
    callToActionUrl?: string;
  };
  style?: QuizComponentStyle;
  isSelected?: boolean;
}

const StageResultComponent: React.FC<StageResultComponentProps> = ({
  data,
  style,
  isSelected = false
}) => {
  // Convert style properties to CSS style object
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
      margin: style?.margin || '0'
    };
  };

  return (
    <div 
      style={getComponentStyles()} 
      className={cn("py-6 text-center", isSelected && "bg-opacity-90")}
    >
      <h2 className="text-2xl font-bold mb-4">
        {data.resultTitle || 'Seu Estilo Predominante'}
      </h2>
      
      <div className="inline-block bg-[#ffefec] px-4 py-2 rounded-md text-[#aa6b5d] mb-6">
        Estilo exemplo: Natural
      </div>
      
      {data.resultDescription && (
        <p className="mb-6">
          {data.resultDescription}
        </p>
      )}
      
      {data.showAdditionalStyles && (
        <div className="my-8">
          <h3 className="text-lg font-medium mb-4">Seus Estilos Secundários</h3>
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="p-3 bg-[#f0f0f0] rounded-md">
              <div className="font-medium">Romântico</div>
              {data.showPercentages && <div className="text-sm text-gray-600">30%</div>}
            </div>
            <div className="p-3 bg-[#f0f0f0] rounded-md">
              <div className="font-medium">Clássico</div>
              {data.showPercentages && <div className="text-sm text-gray-600">20%</div>}
            </div>
          </div>
        </div>
      )}
      
      {data.callToAction && (
        <button className="px-8 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A28969] mt-4">
          {data.callToAction}
        </button>
      )}
    </div>
  );
};

export default StageResultComponent;
