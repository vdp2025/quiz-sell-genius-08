
import React from 'react';
import { QuizStage } from '@/types/quizBuilder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SortableStageProps {
  stage: QuizStage;
  isActive: boolean;
  onSelect: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const SortableStage: React.FC<SortableStageProps> = ({
  stage,
  isActive,
  onSelect,
  onEdit,
  onDelete
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: stage.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const getStageIcon = (type: QuizStage['type']) => {
    switch (type) {
      case "cover":
        return <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">C</div>;
      case "question":
        return <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 text-xs">Q</div>;
      case "result":
        return <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 text-xs">R</div>;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-500/20 flex items-center justify-center text-gray-500 text-xs">?</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-2 mb-2 border rounded-md cursor-pointer",
        isActive 
          ? "border-[#9b87f5] bg-[#9b87f5]/10" 
          : "border-[#444444] hover:bg-[#333333]"
      )}
      onClick={() => onSelect(stage.id)}
    >
      <div className="flex items-center gap-2">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
        
        {getStageIcon(stage.type)}
        
        <div className="flex-1 truncate">
          <div className="text-sm font-medium text-white">{stage.title}</div>
          <div className="text-xs text-gray-400">
            {stage.type === 'cover' ? 'Capa' : stage.type === 'question' ? 'Questão' : 'Resultado'}
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white hover:bg-[#444444]" onClick={(e) => {
            e.stopPropagation();
            onEdit(stage.id);
          }}>
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          
          <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-[#444444]" onClick={(e) => {
            e.stopPropagation();
            onDelete(stage.id);
          }}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
