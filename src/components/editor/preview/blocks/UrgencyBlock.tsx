
import React from 'react';
import { EditableContent } from '@/types/editor';
import { Clock } from 'lucide-react';

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
      <div className="bg-[#FEF7CD] p-4 rounded-lg flex items-center">
        <Clock className="text-[#B89B7A] mr-3 flex-shrink-0" />
        <p className="text-[#432818]">{content.text}</p>
      </div>
    </div>
  );
};
