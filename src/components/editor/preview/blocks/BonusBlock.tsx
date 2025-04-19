
import React from 'react';
import { EditableContent } from '@/types/editor';

interface BonusBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const BonusBlock: React.FC<BonusBlockProps> = ({ content, onClick }) => {
  return (
    <div 
      className="p-6 border-2 border-dashed border-[#B89B7A]/40 rounded-lg mb-6 cursor-pointer hover:bg-[#FAF9F7]" 
      onClick={onClick}
    >
      <div className="bg-[#F9F5F0] p-6 rounded-lg">
        <h3 className="font-medium text-xl text-[#432818] mb-4">Bônus Especiais</h3>
        <div className="whitespace-pre-line text-[#8F7A6A]">
          {content.text}
        </div>
      </div>
    </div>
  );
};
