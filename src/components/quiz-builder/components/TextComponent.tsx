
import React from 'react';
import { cn } from '@/lib/utils';

interface TextComponentProps {
  data: {
    title?: string;
    text?: string;
  };
  style?: {
    textColor?: string;
  };
  isHeadline?: boolean;
  isEditing?: boolean;
  isSelected?: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({
  data,
  style,
  isHeadline = false,
  isEditing = false,
  isSelected = false
}) => {
  if (isHeadline) {
    return (
      <div className="text-center">
        <h2 
          className={cn(
            "text-2xl md:text-3xl font-bold mb-3",
            isEditing && !data.title && "opacity-50"
          )}
          style={{ color: style?.textColor || 'inherit' }}
        >
          {data.title || 'Título da Seção'}
        </h2>
        {data.text && (
          <p 
            className="text-lg opacity-80"
            style={{ color: style?.textColor || 'inherit' }}
          >
            {data.text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="prose max-w-none">
      <div
        className={cn(
          isEditing && !data.text && "opacity-50"
        )}
        style={{ color: style?.textColor || 'inherit' }}
      >
        {data.text ? (
          <p>{data.text}</p>
        ) : (
          <p>Digite seu texto aqui...</p>
        )}
      </div>
    </div>
  );
};

export default TextComponent;
