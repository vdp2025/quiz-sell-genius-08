import React from 'react';
import { QuizComponentData } from '@/types/quizBuilder';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

interface ComponentRendererProps {
  component: QuizComponentData;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onMove?: (draggedId: string, targetId: string) => void;
  isPreviewing: boolean;
  isActive?: boolean;
  isOver?: boolean;
}

const ComponentRenderer: React.FC<ComponentRendererProps> = ({
  component,
  isSelected,
  onSelect,
  isPreviewing,
  isActive,
  isOver
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: component.id,
    disabled: isPreviewing
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isActive ? 0.5 : 1
  };

  const renderComponentContent = () => {
    // This is a placeholder for the actual component rendering
    // You would render different UI based on component.type
    return (
      <div className="p-4 bg-white rounded-md">
        <h4 className="font-medium">{component.type.charAt(0).toUpperCase() + component.type.slice(1)}</h4>
        {component.data.title && <p className="text-sm">{component.data.title}</p>}
        {component.data.question && <p className="text-sm">{component.data.question}</p>}
        {component.data.text && <p className="text-sm">{component.data.text}</p>}
      </div>
    );
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative border-2 rounded-md mb-4",
        isSelected ? "border-[#B89B7A]" : "border-transparent",
        isOver ? "border-dashed border-[#B89B7A] bg-[#FAF9F7]/50" : "",
        !isPreviewing && "hover:border-[#B89B7A]/50 cursor-pointer group"
      )}
      onClick={() => !isPreviewing && onSelect(component.id)}
    >
      {!isPreviewing && (
        <div 
          {...attributes} 
          {...listeners}
          className="absolute right-2 top-2 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center shadow-sm cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="w-4 h-4 text-[#8F7A6A]" />
        </div>
      )}
      {renderComponentContent()}
    </div>
  );
};

export default ComponentRenderer;
