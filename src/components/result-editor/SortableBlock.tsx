
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import BlockRenderer from './BlockRenderer';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';

interface SortableBlockProps {
  block: Block;
  isPreviewing: boolean;
  isSelected: boolean;
  onSelect: () => void;
  primaryStyle?: StyleResult;
}

export const SortableBlock: React.FC<SortableBlockProps> = ({
  block,
  isPreviewing,
  isSelected,
  onSelect,
  primaryStyle
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
      {...(isPreviewing ? {} : listeners)}
      data-block-id={block.id}
    >
      <BlockRenderer
        block={block}
        primaryStyle={primaryStyle || { category: 'Elegante', score: 0, percentage: 0 }}
        isSelected={isSelected}
        onSelect={onSelect}
        isDragging={isDragging}
      />
    </div>
  );
};

export default SortableBlock;
