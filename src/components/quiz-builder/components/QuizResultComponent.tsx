
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface QuizResultComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const QuizResultComponent: React.FC<QuizResultComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  return (
    <div 
      className={cn(
        "w-full",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <h2 className="text-2xl font-medium text-center mb-6 text-[#432818]">
        {data.title || 'Seu Resultado'}
      </h2>
      
      <div className="border border-[#B89B7A]/20 rounded-lg p-4 mb-6">
        <h3 className="text-xl font-medium mb-3 text-[#432818]">Estilo Principal: Natural</h3>
        <p className="text-[#6b605a]">
          {data.description || 'Você valoriza o conforto e a praticidade. Seu estilo é descontraído e casual, com peças fáceis de usar no dia a dia.'}
        </p>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4 text-[#432818]">
          Estilos Secundários
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 border border-[#B89B7A]/20 rounded-md">
            <h4 className="font-medium text-[#432818]">Clássico</h4>
            <div className="text-sm text-[#6b605a]">25%</div>
          </div>
          
          <div className="p-3 border border-[#B89B7A]/20 rounded-md">
            <h4 className="font-medium text-[#432818]">Contemporâneo</h4>
            <div className="text-sm text-[#6b605a]">15%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultComponent;
