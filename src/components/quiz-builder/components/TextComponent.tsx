
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface TextComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({ 
  data, 
  style, 
  isSelected 
}) => {
  const isHeadline = data.title !== undefined;
  
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
      {isHeadline ? (
        <>
          <h2 className="text-xl md:text-2xl font-medium text-[#432818] mb-2">
            {data.title}
          </h2>
          
          {data.subtitle && (
            <p className="text-[#8F7A6A]">
              {data.subtitle}
            </p>
          )}
        </>
      ) : (
        <div className="prose max-w-none">
          {data.text || 'Insira seu texto aqui...'}
        </div>
      )}
    </div>
  );
};

export default TextComponent;
