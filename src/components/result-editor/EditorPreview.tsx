
import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { EditableBlock } from './EditableBlock';
import { EmptyEditor } from '@/components/editor/EmptyEditor';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  styleType?: string;
  onDeleteBlock: (id: string) => void;
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
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const activeIndex = blocks.findIndex(block => block.id === active.id);
      const overIndex = blocks.findIndex(block => block.id === over.id);
      
      onReorderBlocks(activeIndex, overIndex);
    }
  };

  return (
    <div className="h-full bg-[#FAF9F7] overflow-auto">
      <div className="max-w-4xl mx-auto py-8 px-4">
        {blocks.length === 0 ? (
          <EmptyEditor onAddBlock={(type) => {
            console.log('Add block of type:', type);
          }} />
        ) : (
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
                {blocks.map(block => (
                  <EditableBlock
                    key={block.id}
                    block={block}
                    isSelected={block.id === selectedBlockId}
                    onSelect={() => onSelectBlock(block.id)}
                    isPreview={isPreviewing}
                    primaryStyle={primaryStyle}
                    styleType={styleType}
                    onDelete={onDeleteBlock}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

export default EditorPreview;
