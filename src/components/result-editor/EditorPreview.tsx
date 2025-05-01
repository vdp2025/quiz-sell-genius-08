
import React from 'react';
import { DndContext, closestCenter, DragEndEvent, DragStartEvent, DragOverEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import { SortableBlock } from './SortableBlock';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks: (sourceIndex: number, destinationIndex: number) => void;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  primaryStyle,
  onReorderBlocks
}) => {
  const [viewMode, setViewMode] = React.useState<'desktop' | 'mobile'>('desktop');
  const [draggedBlockId, setDraggedBlockId] = React.useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = React.useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setDraggedBlockId(String(active.id));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (over) {
      setIsDraggingOver(String(over.id));
    } else {
      setIsDraggingOver(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      onReorderBlocks(oldIndex, newIndex);
      
      toast({
        title: "Bloco reordenado",
        description: "A ordem dos blocos foi alterada com sucesso",
        duration: 2000,
      });
    }
    
    setDraggedBlockId(null);
    setIsDraggingOver(null);
  };

  // Sort blocks by order
  const sortedBlocks = [...blocks].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col h-full">
      {/* Preview Controls */}
      <div className="border-b p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' && 'bg-[#FAF9F7]')}
          >
            <Monitor className="h-4 w-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' && 'bg-[#FAF9F7]')}
          >
            <Smartphone className="h-4 w-4 mr-2" />
            Mobile
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1 p-4 bg-[#FAF9F7]">
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm p-6 transition-all duration-200",
          viewMode === 'mobile' && 'max-w-md mx-auto'
        )}>
          {blocks.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[#B89B7A]/40 rounded-lg text-center">
              <p className="text-[#8F7A6A] mb-4">Adicione componentes usando o painel lateral</p>
            </div>
          ) : (
            <DndContext 
              collisionDetection={closestCenter} 
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              autoScroll={{ threshold: { x: 0, y: 0.2 } }}
            >
              <SortableContext
                items={sortedBlocks.map(block => block.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {sortedBlocks.map(block => (
                    <SortableBlock
                      key={block.id}
                      block={block}
                      isPreviewing={isPreviewing}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => onSelectBlock(block.id)}
                      primaryStyle={primaryStyle}
                      isDragging={draggedBlockId === block.id}
                      isDropTarget={isDraggingOver === block.id}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPreview;
