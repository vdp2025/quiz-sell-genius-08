
import React from 'react';
import { cn } from '@/lib/utils';
import { QuizComponentStyle } from '@/types/quizBuilder';

interface StageCoverComponentProps {
  data: {
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    buttonText?: string;
    logoUrl?: string;
  };
  style?: QuizComponentStyle;
  isSelected?: boolean;
}

const StageCoverComponent: React.FC<StageCoverComponentProps> = ({
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
      className={cn("py-8 text-center", isSelected && "bg-opacity-90")}
    >
      {data.logoUrl && (
        <img src={data.logoUrl} alt="Logo" className="h-16 mx-auto mb-6" />
      )}
      
      <h1 className="text-3xl font-bold mb-4">
        {data.title || 'Descobra seu Estilo Pessoal'}
      </h1>
      
      {data.subtitle && (
        <p className="text-xl mb-6">
          {data.subtitle}
        </p>
      )}
      
      {data.imageUrl && (
        <img 
          src={data.imageUrl} 
          alt="Cover" 
          className="max-w-sm mx-auto my-6 rounded-lg"
        />
      )}
      
      <button className="px-8 py-3 bg-[#B89B7A] text-white rounded-md hover:bg-[#A28969]">
        {data.buttonText || 'Começar Quiz'}
      </button>
    </div>
  );
};

export default StageCoverComponent;
