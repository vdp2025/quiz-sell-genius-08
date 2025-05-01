
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
    primaryStyleCategory?: string;
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
      backgroundColor: style?.backgroundColor || '#FFFFFF',
      color: style?.textColor || 'inherit',
      borderRadius: style?.borderRadius ? `${style.borderRadius}px` : '0',
      padding: style?.padding || '1rem',
      margin: style?.margin || '0'
    };
  };

  return (
    <div 
      style={getComponentStyles()} 
      className={cn("py-8 px-6 text-center", isSelected && "bg-opacity-90")}
    >
      <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
        {data.resultTitle || 'Seu Estilo Predominante'}
      </h2>
      
      <div className="bg-[#FAF9F7] rounded-lg p-6 mb-8 max-w-xl mx-auto shadow-sm">
        <div className="text-2xl font-playfair font-bold text-[#B89B7A] mb-2">
          {data.primaryStyleCategory || 'Contemporâneo'}
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div className="bg-[#B89B7A] h-2.5 rounded-full" style={{ width: '70%' }}></div>
        </div>
        
        <p className="text-lg">
          {data.resultDescription || 'Você tem um estilo sofisticado e minimalista, com preferência por peças atemporais e versáteis.'}
        </p>
      </div>
      
      {data.showAdditionalStyles && (
        <div className="my-10">
          <h3 className="text-xl font-medium mb-6">Seus Estilos Complementares</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-4 bg-[#FAF9F7] rounded-lg shadow-sm">
              <div className="font-medium mb-1">Elegante</div>
              {data.showPercentages && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-[#B89B7A] h-1.5 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <div className="text-sm text-gray-500">40%</div>
                </>
              )}
            </div>
            <div className="p-4 bg-[#FAF9F7] rounded-lg shadow-sm">
              <div className="font-medium mb-1">Natural</div>
              {data.showPercentages && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-[#B89B7A] h-1.5 rounded-full" style={{ width: '30%' }}></div>
                  </div>
                  <div className="text-sm text-gray-500">30%</div>
                </>
              )}
            </div>
            <div className="p-4 bg-[#FAF9F7] rounded-lg shadow-sm">
              <div className="font-medium mb-1">Criativo</div>
              {data.showPercentages && (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                    <div className="bg-[#B89B7A] h-1.5 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <div className="text-sm text-gray-500">20%</div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      {data.callToAction && (
        <button className="px-8 py-3 bg-[#B89B7A] text-white rounded-full hover:bg-[#A28969] transition-colors font-medium text-lg mt-6">
          {data.callToAction}
        </button>
      )}
    </div>
  );
};

export default StageResultComponent;
