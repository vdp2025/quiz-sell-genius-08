
import React, { useState } from 'react';
import Logo from '../ui/logo';
import { Input } from '../ui/input';
import { Edit } from 'lucide-react';

interface ResultHeaderProps {
  userName: string;
  customTitle?: string;
  isEditing?: boolean;
  onUpdate?: (value: string) => void;
}

const ResultHeader: React.FC<ResultHeaderProps> = ({ 
  userName, 
  customTitle,
  isEditing = false,
  onUpdate
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const defaultTitle = `Olá, ${userName}, seu Estilo Predominante é:`;
  const displayTitle = customTitle || defaultTitle;

  if (!isEditing) {
    return (
      <div className="text-center space-y-3">
        <Logo className="h-10 md:h-14 mx-auto" />
        <h1 className="font-playfair text-lg md:text-2xl font-semibold text-[#432818] px-2">
          {displayTitle}
        </h1>
      </div>
    );
  }

  return (
    <div className="text-center space-y-3 relative group">
      <Logo className="h-10 md:h-14 mx-auto" />
      <div className="relative">
        <Input
          value={displayTitle}
          onChange={(e) => onUpdate?.(e.target.value)}
          className="font-playfair text-lg md:text-2xl font-semibold text-[#432818] text-center border-dashed border-[#B89B7A] focus:border-[#8F7A6A]"
        />
        <button 
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsEditingTitle(true)}
        >
          <Edit className="w-4 h-4 text-[#B89B7A]" />
        </button>
      </div>
    </div>
  );
};

export default ResultHeader;
