
import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

interface HeaderComponentProps {
  data: QuizComponentData['data'];
  style: QuizComponentData['style'];
  isSelected: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ data, style, isSelected }) => {
  return (
    <div 
      className={cn(
        "w-full p-6",
        isSelected && "ring-2 ring-inset ring-[#B89B7A]/20"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit',
        borderRadius: `${style?.borderRadius || 0}px`,
        padding: `${style?.paddingY || 16}px ${style?.paddingX || 16}px`,
      }}
    >
      <h1 className="text-2xl md:text-3xl text-center font-medium mb-3 text-[#432818]">
        {data.title || 'Título do Quiz'}
      </h1>
      {data.subtitle && (
        <p className="text-center text-[#6b605a]">
          {data.subtitle}
        </p>
      )}
    </div>
  );
};

export default HeaderComponent;
