
import React from 'react';
import { EditableContent } from '@/types/editor';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface CountdownTimerBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const CountdownTimerBlock: React.FC<CountdownTimerBlockProps> = ({ 
  content, 
  onClick 
}) => {
  const endDate = content.endDate || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  
  return (
    <div 
      className={cn(
        "p-4 bg-white border border-[#B89B7A]/20 rounded-lg shadow-sm",
        content.style?.backgroundColor ? "" : "bg-[#FFF8F0]"
      )}
      style={content.style ? {...content.style as React.CSSProperties} : {}}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2 mb-2 text-[#B89B7A]">
        <Clock className="w-5 h-5" />
        <h3 className="font-medium">{content.title || "Oferta por tempo limitado"}</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="bg-white p-2 rounded shadow-sm">
          <div className="text-xl font-bold text-[#432818]">00</div>
          <div className="text-xs text-[#8F7A6A]">Dias</div>
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <div className="text-xl font-bold text-[#432818]">00</div>
          <div className="text-xs text-[#8F7A6A]">Horas</div>
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <div className="text-xl font-bold text-[#432818]">00</div>
          <div className="text-xs text-[#8F7A6A]">Minutos</div>
        </div>
        <div className="bg-white p-2 rounded shadow-sm">
          <div className="text-xl font-bold text-[#432818]">00</div>
          <div className="text-xs text-[#8F7A6A]">Segundos</div>
        </div>
      </div>
      
      {content.text && (
        <p className="mt-3 text-sm text-center text-[#8F7A6A]">{content.text}</p>
      )}
    </div>
  );
};
