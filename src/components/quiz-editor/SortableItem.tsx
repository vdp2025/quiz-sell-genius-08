
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GripVertical, Trash2 } from 'lucide-react';

interface SortableItemProps {
  id: string;
  title: string;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const SortableItem: React.FC<SortableItemProps> = ({
  id,
  title,
  isSelected,
  onSelect,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card 
        className={`p-3 flex items-center justify-between cursor-pointer ${
          isSelected ? 'border-[#B89B7A] bg-[#FAF9F7]' : 'border-[#B89B7A]/20'
        }`}
        onClick={onSelect}
      >
        <div className="flex items-center gap-2 flex-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="cursor-grab"
            {...listeners}
          >
            <GripVertical className="h-4 w-4 text-[#8F7A6A]" />
          </Button>
          <span className="truncate">{title}</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </Card>
    </div>
  );
};
