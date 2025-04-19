import React from 'react';
import { StyleResult } from '@/types/quiz';
import { Block } from '@/types/editor';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { EditableBlock } from './EditableBlock';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
  styleType?: string; // Add the styleType prop
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
  onReorderBlocks,
  styleType
}) => {
  // Handle drag end event
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorderBlocks(result.source.index, result.destination.index);
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="blocks">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {blocks.map((block, index) => (
                    <Draggable
                      key={block.id}
                      draggableId={block.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`${
                            snapshot.isDragging ? "opacity-50" : ""
                          }`}
                        >
                          <EditableBlock
                            key={block.id}
                            block={block}
                            isSelected={block.id === selectedBlockId}
                            onSelect={() => onSelectBlock(block.id)}
                            isPreview={false}
                            primaryStyle={primaryStyle}
                            styleType={styleType}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
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
