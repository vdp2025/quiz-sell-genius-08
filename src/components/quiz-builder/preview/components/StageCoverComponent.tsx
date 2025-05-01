
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
      margin: style?.margin || '0',
      backgroundImage: data.imageUrl ? `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url(${data.imageUrl})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  };

  return (
    <div 
      style={getComponentStyles()} 
      className={cn(
        "py-10 px-6 text-center flex flex-col items-center justify-center min-h-[400px]", 
        isSelected && "bg-opacity-90",
        data.imageUrl && "text-white"
      )}
    >
      {data.logoUrl && (
        <img src={data.logoUrl} alt="Logo" className="h-16 mx-auto mb-6" />
      )}
      
      <h1 className="text-4xl font-playfair font-bold mb-6 max-w-xl">
        {data.title || 'Descubra seu Estilo Pessoal'}
      </h1>
      
      {data.subtitle && (
        <p className="text-xl mb-8 max-w-lg">
          {data.subtitle}
        </p>
      )}
      
      <button className="px-8 py-3 bg-[#B89B7A] text-white rounded-full hover:bg-[#A28969] transition-colors font-medium text-lg">
        {data.buttonText || 'Começar Quiz'}
      </button>
      
      <div className="mt-10 text-sm opacity-75">
        Em poucos minutos, descubra qual estilo combina com a sua personalidade
      </div>
    </div>
  );
};

export default StageCoverComponent;
