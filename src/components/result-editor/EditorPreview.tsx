
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Block } from '@/types/editor';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditableBlock } from './EditableBlock';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SortableItem } from './SortableItem';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  styleType?: string;
  onDeleteBlock?: (id: string) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
  onReorderBlocks,
  styleType,
  onDeleteBlock
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end event with proper typing
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        onReorderBlocks(oldIndex, newIndex);
      }
    }
  };

  return (
    <div className="h-full overflow-auto p-4 bg-[#FAF9F7]">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm min-h-full">
        {isPreviewing ? (
          // Preview mode - show blocks without edit controls
          <div className="space-y-6">
            {blocks.map((block) => (
              <EditableBlock
                key={block.id}
                block={block}
                isSelected={false}
                onSelect={() => {}}
                isPreview={true}
                primaryStyle={primaryStyle}
                styleType={styleType}
              />
            ))}
          </div>
        ) : (
          // Edit mode - show draggable blocks
          <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={blocks.map(block => block.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {blocks.map((block) => (
                  <SortableItem key={block.id} id={block.id}>
                    <EditableBlock
                      block={block}
                      isSelected={block.id === selectedBlockId}
                      onSelect={() => onSelectBlock(block.id)}
                      isPreview={false}
                      primaryStyle={primaryStyle}
                      styleType={styleType}
                      onDelete={onDeleteBlock}
                    />
                  </SortableItem>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {/* Add block placeholder */}
        {!isPreviewing && blocks.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-[#B89B7A]/40 rounded-lg">
            <p className="text-[#8F7A6A] mb-4">
              Adicione blocos do painel lateral para começar a criar sua página
            </p>
            <Button variant="outline" className="border-[#B89B7A]">
              <PlusCircle className="w-4 h-4 mr-2" />
              Adicionar Bloco
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorPreview;
