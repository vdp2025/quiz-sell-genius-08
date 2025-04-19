
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { Edit, Trash, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BlockRenderer } from './BlockRenderer';

interface EditableBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  isPreview: boolean;
  primaryStyle: StyleResult;
  styleType?: string; // Add styleType prop
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isSelected,
  onSelect,
  isPreview,
  primaryStyle,
  styleType
}) => {
  if (isPreview) {
    return (
      <div className="relative">
        <BlockRenderer 
          block={block} 
          primaryStyle={primaryStyle}
          styleType={styleType}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group relative p-4 rounded-lg transition-all border-2 border-dashed",
        isSelected
          ? "border-[#B89B7A] bg-[#FAF9F7]"
          : "border-[#B89B7A]/40 hover:border-[#B89B7A]/60 hover:bg-[#FAF9F7]/50"
      )}
      onClick={onSelect}
    >
      {/* Block Content */}
      <BlockRenderer 
        block={block} 
        primaryStyle={primaryStyle}
        styleType={styleType}
      />

      {/* Block Controls */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="w-4 h-4 text-[#8F7A6A] cursor-grab" />
        <Edit className="w-4 h-4 text-[#8F7A6A]" />
        <Trash className="w-4 h-4 text-red-500" />
      </div>
    </div>
  );
};
