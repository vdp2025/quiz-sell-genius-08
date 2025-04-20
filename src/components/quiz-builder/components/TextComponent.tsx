
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface TextComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
  isHeadline?: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({ 
  data, 
  style, 
  isSelected,
  isHeadline = false
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
      {isHeadline ? (
        <>
          <h2 className="text-xl md:text-2xl font-medium mb-2 text-[#432818]">
            {data.title || 'Título da Seção'}
          </h2>
          {data.subtitle && (
            <p className="text-[#6b605a]">{data.subtitle}</p>
          )}
        </>
      ) : (
        <div 
          className="prose max-w-none text-[#6b605a]"
          dangerouslySetInnerHTML={{ __html: data.text || 'Insira seu texto aqui...' }}
        />
      )}
    </div>
  );
};

export default TextComponent;
