
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  File, 
  FileQuestion, 
  FileCheck, 
  Plus, 
  Trash, 
  GripVertical,
  FileText
} from 'lucide-react';
import { QuizStage } from '@/types/quizBuilder';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Input } from '@/components/ui/input';

interface StageListProps {
  stages: QuizStage[];
  activeStageId: string | null;
  onStageSelect: (id: string) => void;
  onStageAdd: (type: QuizStage['type']) => void;
  onStageUpdate: (id: string, updates: Partial<QuizStage>) => void;
  onStageDelete: (id: string) => void;
  onStageMove: (draggedId: string, targetId: string) => void;
}

const StageTypeIcon = ({ type }: { type: QuizStage['type'] }) => {
  switch (type) {
    case 'cover':
      return <File className="h-4 w-4 text-[#B89B7A]" />;
    case 'question':
      return <FileQuestion className="h-4 w-4 text-[#B89B7A]" />;
    case 'result':
      return <FileCheck className="h-4 w-4 text-[#B89B7A]" />;
    case 'strategic':
      return <FileText className="h-4 w-4 text-[#B89B7A]" />;
    default:
      return <File className="h-4 w-4 text-[#B89B7A]" />;
  }
};

const SortableStageItem = ({ 
  stage, 
  isActive,
  onSelect, 
  onUpdate,
  onDelete 
}: { 
  stage: QuizStage; 
  isActive: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<QuizStage>) => void;
  onDelete: () => void;
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: stage.id
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (!isEditing) {
      setIsEditing(true);
      e.preventDefault();
    }
  };
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate({ title: e.target.value });
  };
  
  const handleTitleBlur = () => {
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`flex items-center p-2 mb-1 rounded-md cursor-pointer group ${
        isActive ? 'bg-[#F0EBE4]' : 'hover:bg-[#FAF9F7]'
      }`}
      onClick={onSelect}
      onDoubleClick={handleDoubleClick}
    >
      <div 
        className="mr-2 cursor-grab touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-[#8F7A6A]/50" />
      </div>
      
      <StageTypeIcon type={stage.type} />
      
      {isEditing ? (
        <Input
          value={stage.title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleKeyDown}
          className="ml-2 h-6 text-sm flex-1"
          autoFocus
        />
      ) : (
        <div className="ml-2 flex-1 text-sm truncate">{stage.title}</div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="h-6 w-6 p-1 opacity-0 group-hover:opacity-100"
      >
        <Trash className="h-4 w-4 text-[#8F7A6A]" />
      </Button>
    </div>
  );
};

export const StageList: React.FC<StageListProps> = ({
  stages,
  activeStageId,
  onStageSelect,
  onStageAdd,
  onStageUpdate,
  onStageDelete,
  onStageMove,
}) => {
  return (
    <div className="p-3 space-y-4">
      <div className="space-y-1">
        {stages.map(stage => (
          <SortableStageItem
            key={stage.id}
            stage={stage}
            isActive={stage.id === activeStageId}
            onSelect={() => onStageSelect(stage.id)}
            onUpdate={(updates) => onStageUpdate(stage.id, updates)}
            onDelete={() => onStageDelete(stage.id)}
          />
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStageAdd('cover')}
          className="flex-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Capa
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStageAdd('question')}
          className="flex-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Pergunta
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStageAdd('result')}
          className="flex-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Resultado
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStageAdd('strategic')}
          className="flex-1 text-xs"
        >
          <Plus className="h-3.5 w-3.5 mr-1" /> Estratégica
        </Button>
      </div>
    </div>
  );
};
