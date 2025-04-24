
import React from 'react';
import { EditableContent } from '@/types/editor';
import { cn } from '@/lib/utils';

interface TextBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const TextBlock: React.FC<TextBlockProps> = ({ content, onClick }) => {
  return (
    <div 
      className={cn(
        "p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg cursor-pointer hover:bg-[#FAF9F7]",
        content.alignment === 'center' && 'text-center',
        content.alignment === 'right' && 'text-right'
      )} 
      onClick={onClick}
    >
      <div 
        className="prose max-w-none"
        style={{
          color: content.textColor || '#432818'
        }}
      >
        {content.text || 'Clique para editar este texto.'}
      </div>
    </div>
  );
};
