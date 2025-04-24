
import React from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SortableStageProps {
  stage: QuizStage;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
}

export const SortableStage: React.FC<SortableStageProps> = ({
  stage,
  isActive,
  onSelect,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: stage.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  
  const getStageTypeIcon = () => {
    switch (stage.type) {
      case 'cover':
        return <span className="w-2 h-2 rounded-full bg-green-400" />;
      case 'question':
        return <span className="w-2 h-2 rounded-full bg-blue-400" />;
      case 'result':
        return <span className="w-2 h-2 rounded-full bg-purple-400" />;
      case 'strategic':
        return <span className="w-2 h-2 rounded-full bg-orange-400" />;
      default:
        return null;
    }
  };
  
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center group rounded py-1 px-2",
        isActive ? "bg-[#9b87f5] text-white" : "hover:bg-[#333333] text-gray-200"
      )}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab opacity-0 group-hover:opacity-100"
      >
        <GripVertical className="w-4 h-4" />
      </div>
      
      <div className="flex items-center flex-1 ml-1" onClick={onSelect}>
        {getStageTypeIcon()}
        <span className="ml-2 truncate">
          {stage.title || `Etapa ${stage.id.substring(0, 4)}`}
        </span>
      </div>
      
      <div className="flex items-center opacity-0 group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-gray-400 hover:text-white rounded-full"
          onClick={onDelete}
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default SortableStage;
