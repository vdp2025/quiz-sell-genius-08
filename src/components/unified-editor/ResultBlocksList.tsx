
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import { GripVertical, Plus, LayoutGrid, Type, Image } from 'lucide-react';
import { generateId } from '@/utils/idGenerator';
import { cn } from '@/lib/utils';

interface ResultBlock {
  id: string;
  type: string;
  title: string;
}

interface ResultBlocksListProps {
  resultSettings: any; // Will be replaced with proper type
  activeBlockId: string | null;
  onSelectBlock: (id: string) => void;
}

interface SortableBlockItemProps {
  block: ResultBlock;
  isActive: boolean;
  onClick: () => void;
}

const SortableBlockItem: React.FC<SortableBlockItemProps> = ({ block, isActive, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: block.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  const getBlockIcon = () => {
    switch (block.type) {
      case 'header':
        return <Type className="w-4 h-4" />;
      case 'image':
        return <Image className="w-4 h-4" />;
      default:
        return <LayoutGrid className="w-4 h-4" />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center p-3 mb-2 rounded-md cursor-pointer group",
        isActive ? "bg-[#FAF9F7] border border-[#B89B7A]" : "hover:bg-gray-50 border border-transparent"
      )}
      onClick={onClick}
    >
      <div 
        {...attributes} 
        {...listeners}
        className="mr-2 cursor-grab"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
      </div>
      
      <div className="mr-3 text-gray-500">
        {getBlockIcon()}
      </div>
      
      <div className="flex-1">
        <span className="font-medium text-sm">
          {block.title}
        </span>
      </div>
    </div>
  );
};

const ResultBlocksList: React.FC<ResultBlocksListProps> = ({ 
  resultSettings, 
  activeBlockId, 
  onSelectBlock 
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Mock blocks for display (would come from resultSettings)
  const blocks: ResultBlock[] = [
    { id: 'header', type: 'header', title: 'Cabeçalho' },
    { id: 'primary-style', type: 'style', title: 'Estilo Principal' },
    { id: 'secondary-styles', type: 'style', title: 'Estilos Secundários' },
    { id: 'product-offer', type: 'offer', title: 'Oferta de Produto' },
    { id: 'benefits', type: 'list', title: 'Benefícios' },
    { id: 'testimonials', type: 'testimonial', title: 'Depoimentos' },
    { id: 'call-to-action', type: 'cta', title: 'Botão de Ação' }
  ];

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      // Reordering logic would go here
      console.log(`Moved block from index ${active.id} to ${over.id}`);
      // You would update the order in your state
    }
  };

  return (
    <div className="p-4">
      <DndContext 
        sensors={sensors} 
        collisionDetection={closestCenter} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={blocks.map(b => b.id)} 
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block) => (
            <SortableBlockItem
              key={block.id}
              block={block}
              isActive={block.id === activeBlockId}
              onClick={() => onSelectBlock(block.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      
      <Button
        className="w-full mt-4 border-dashed border-2 bg-transparent hover:bg-[#FAF9F7] text-[#B89B7A] border-[#B89B7A]/50"
        onClick={() => {}}
      >
        <Plus className="w-4 h-4 mr-2" />
        Novo Bloco
      </Button>
    </div>
  );
};

export default ResultBlocksList;
