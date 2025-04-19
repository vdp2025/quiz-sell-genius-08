
import React from 'react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { Edit, Trash, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import BlockRenderer from './BlockRenderer';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EditableBlockProps {
  block: Block;
  isSelected: boolean;
  onSelect: () => void;
  isPreview: boolean;
  primaryStyle: StyleResult;
  styleType?: string;
  onDelete?: (id: string) => void;
}

export const EditableBlock: React.FC<EditableBlockProps> = ({
  block,
  isSelected,
  onSelect,
  isPreview,
  primaryStyle,
  styleType,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: block.id,
    disabled: isPreview
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1
  };

  const handleClick = () => {
    if (!isPreview) {
      onSelect();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(block.id);
    }
  };

  if (isPreview) {
    return (
      <div className="relative">
        <BlockRenderer 
          block={block} 
          primaryStyle={primaryStyle}
          styleType={styleType}
          isPreview={true}
          isSelected={false}
          onSelect={() => {}}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative transition-all",
        isSelected
          ? "ring-2 ring-[#B89B7A] rounded-lg"
          : "hover:ring-2 hover:ring-[#B89B7A]/40 rounded-lg"
      )}
      onClick={handleClick}
    >
      <div className="relative">
        <BlockRenderer 
          block={block} 
          primaryStyle={primaryStyle}
          styleType={styleType}
          isPreview={false}
          isSelected={isSelected}
          onSelect={handleClick}
        />
        
        <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="p-1 rounded bg-white shadow-sm hover:bg-[#FAF9F7]"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-4 h-4 text-[#8F7A6A] cursor-move" />
          </button>
          <button 
            className="p-1 rounded bg-white shadow-sm hover:bg-[#FAF9F7]"
            onClick={handleClick}
          >
            <Edit className="w-4 h-4 text-[#8F7A6A]" />
          </button>
          <button 
            className="p-1 rounded bg-white shadow-sm hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableBlock;
