
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderComponentProps {
  data: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
  };
  style?: {
    textColor?: string;
    backgroundColor?: string;
  };
  isEditing?: boolean;
  isSelected?: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({
  data,
  style,
  isEditing = false,
  isSelected = false
}) => {
  return (
    <header className="text-center py-8">
      <h1 
        className={cn(
          "text-3xl md:text-4xl font-bold mb-4",
          isEditing && !data.title && "opacity-50"
        )}
        style={{ color: style?.textColor || 'inherit' }}
      >
        {data.title || 'Título do Quiz'}
      </h1>
      
      {(data.subtitle || isEditing) && (
        <p 
          className={cn(
            "text-lg md:text-xl mb-6",
            isEditing && !data.subtitle && "opacity-50"
          )}
          style={{ color: style?.textColor || 'inherit' }}
        >
          {data.subtitle || 'Subtítulo ou descrição do quiz'}
        </p>
      )}
      
      {(data.buttonText || isEditing) && (
        <button 
          className={cn(
            "bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-6 py-2 rounded-md font-medium",
            isEditing && "pointer-events-none"
          )}
        >
          {data.buttonText || 'Iniciar Quiz'}
        </button>
      )}
    </header>
  );
};

export default HeaderComponent;
