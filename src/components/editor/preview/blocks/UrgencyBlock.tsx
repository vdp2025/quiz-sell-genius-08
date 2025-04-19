
import React from 'react';
import { EditableContent } from '@/types/editor';

interface UrgencyBlockProps {
  content: EditableContent;
  onClick: () => void;
}

export const UrgencyBlock: React.FC<UrgencyBlockProps> = ({ content, onClick }) => {
  return (
    <div 
      className="p-4 border-2 border-dashed border-[#B89B7A]/40 rounded-lg mb-6 cursor-pointer hover:bg-[#FAF9F7]" 
      onClick={onClick}
    >
      <div className="bg-[#FFF7E9] p-4 rounded-lg border-l-4 border-[#B89B7A]">
        <p className="text-[#432818] font-medium">
          {content.text}
        </p>
      </div>
    </div>
  );
};
