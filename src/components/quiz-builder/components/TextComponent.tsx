
import React from 'react';
import { QuizComponentStyle } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';

export interface TextComponentProps {
  data: {
    title?: string;
    subtitle?: string;
    text?: string;
  };
  style?: QuizComponentStyle;
  isSelected?: boolean;
  isHeadline?: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({
  data,
  style,
  isSelected,
  isHeadline = false
}) => {
  const { title, subtitle, text } = data;
  
  if (isHeadline) {
    return (
      <div 
        className={cn(
          "p-4", 
          isSelected && "outline outline-2 outline-offset-2 outline-[#B89B7A]"
        )}
        style={{
          backgroundColor: style?.backgroundColor || 'transparent',
          color: style?.textColor || 'inherit',
          borderRadius: style?.borderRadius ? `${style.borderRadius}px` : undefined,
          padding: `${style?.paddingY || '16px'} ${style?.paddingX || '16px'}`
        }}
      >
        {title && (
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        )}
        {subtitle && (
          <p className="text-gray-600">{subtitle}</p>
        )}
      </div>
    );
  }
  
  return (
    <div 
      className={cn(
        "p-4", 
        isSelected && "outline outline-2 outline-offset-2 outline-[#B89B7A]"
      )}
      style={{
        backgroundColor: style?.backgroundColor || 'transparent',
        color: style?.textColor || 'inherit',
        borderRadius: style?.borderRadius ? `${style.borderRadius}px` : undefined,
        padding: `${style?.paddingY || '16px'} ${style?.paddingX || '16px'}`
      }}
    >
      {text && (
        <p className="text-base">{text}</p>
      )}
    </div>
  );
};

export default TextComponent;
