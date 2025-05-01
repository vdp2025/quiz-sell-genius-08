
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockRenderer from './BlockRenderer';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { cn } from '@/lib/utils';
import { GripVertical } from 'lucide-react';

interface SortableBlockProps {
  block: Block;
  isPreviewing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  primaryStyle?: StyleResult;
  isDragging?: boolean;
  isDropTarget?: boolean;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  isPreviewing,
  isSelected,
  onSelect,
  primaryStyle,
  isDragging,
  isDropTarget
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: block.id,
    disabled: isPreviewing
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      data-block-id={block.id}
      className={cn(
        "relative group",
        isDropTarget && "border-2 border-[#B89B7A] -m-[2px] rounded-md bg-[#FAF9F7]/50"
      )}
    >
      <BlockRenderer
        block={block}
        primaryStyle={primaryStyle || { category: 'Elegante', score: 0, percentage: 0 }}
        isSelected={isSelected}
        onSelect={onSelect}
        isDragging={isDragging}
      />
      
      {!isPreviewing && (
        <div 
          className={cn(
            "absolute left-0 top-1/2 -translate-y-1/2 -ml-6 p-1.5 cursor-move bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity",
            isDragging && "opacity-100"
          )}
          {...listeners}
        >
          <GripVertical className="h-4 w-4 text-[#8F7A6A]" />
        </div>
      )}
    </div>
  );
};

export default SortableBlock;
