
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface MultipleChoiceComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const MultipleChoiceComponent: React.FC<MultipleChoiceComponentProps> = ({ 
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
      <h3 className="text-lg md:text-xl font-medium mb-4 text-[#432818] text-center">
        {data.question || 'Sua pergunta aqui?'}
      </h3>
      
      <p className="text-center text-sm text-[#6b605a] mb-6">
        {data.multiSelect > 1 
          ? `Selecione ${data.multiSelect} opções`
          : 'Selecione uma opção'}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(data.options || ['Opção 1', 'Opção 2', 'Opção 3']).map((option, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-md p-3 hover:border-[#B89B7A]/50 hover:bg-[#FAF9F7] cursor-pointer transition-colors"
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceComponent;
