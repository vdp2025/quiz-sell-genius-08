
import React from 'react';
import { cn } from '@/lib/utils';

interface StageCoverComponentProps {
  data: {
    stageTitle?: string;
    headline?: string;
    subheadline?: string;
    buttonText?: string;
    backgroundColor?: string;
    textColor?: string;
    [key: string]: any;
  };
  style?: {
    backgroundColor?: string;
    textColor?: string;
    [key: string]: any;
  };
  isSelected?: boolean;
}

const StageCoverComponent: React.FC<StageCoverComponentProps> = ({ data, style, isSelected }) => {
  return (
    <div 
      className={cn(
        "min-h-[300px] flex flex-col items-center justify-center p-8 text-center",
        isSelected && "outline-dashed outline-2 outline-[#B89B7A]"
      )}
      style={{
        backgroundColor: style?.backgroundColor || data?.backgroundColor || '#FAF9F7',
        color: style?.textColor || data?.textColor || '#432818',
      }}
    >
      <h1 className="text-3xl md:text-4xl font-playfair mb-4">
        {data?.headline || 'Descubra seu Estilo Pessoal'}
      </h1>
      
      <p className="text-lg mb-8 max-w-2xl">
        {data?.subheadline || 'Responda às perguntas a seguir para revelar seu estilo predominante'}
      </p>
      
      <button className="bg-[#B89B7A] text-white px-8 py-3 rounded-md text-lg hover:bg-[#A38A69] transition-colors">
        {data?.buttonText || 'Começar'}
      </button>
    </div>
  );
};

export default StageCoverComponent;
