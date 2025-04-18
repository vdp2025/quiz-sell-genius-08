
import React from 'react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { EditorBlock } from '@/types/editor';
import { AddBlockButton } from '../AddBlockButton';
import { EmptyEditor } from '../EmptyEditor';
import { BlockRenderer } from '../BlockRenderer';

interface EditorContentProps {
  blocks: EditorBlock[];
  onDragEnd: (event: DragEndEvent) => void;
  onAddBlock: (type: EditorBlock['type']) => void;
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
  isPreviewing: boolean;
}

export const EditorContent: React.FC<EditorContentProps> = ({
  blocks,
  onDragEnd,
  onAddBlock,
  onUpdateBlock,
  onDeleteBlock,
  isPreviewing
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  if (isPreviewing) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-96">
        {blocks.map(block => (
          <div key={block.id} className="mb-4">
            {renderBlockPreview(block)}
          </div>
        ))}
      </div>
    );
  }

  return (
    <DndContext sensors={sensors} onDragEnd={onDragEnd}>
      <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
        {blocks.length === 0 ? (
          <EmptyEditor onAddBlock={onAddBlock} />
        ) : (
          <>
            <BlockRenderer 
              blocks={blocks}
              onUpdate={onUpdateBlock}
              onDelete={onDeleteBlock}
            />
            <div className="mt-8 text-center">
              <AddBlockButton onAddBlock={onAddBlock} />
            </div>
          </>
        )}
      </SortableContext>
    </DndContext>
  );
};
