
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Monitor, Smartphone, Eye } from 'lucide-react';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import BlockRenderer from './BlockRenderer';
import { cn } from '@/lib/utils';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  onReorderBlocks?: (sourceIndex: number, destinationIndex: number) => void;
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
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    
    if (active.id !== over.id && onReorderBlocks) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      onReorderBlocks(oldIndex, newIndex);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Preview Controls */}
      <div className="border-b p-4 bg-white flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('desktop')}
            className={cn(viewMode === 'desktop' && 'bg-[#FAF9F7]')}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Desktop
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('mobile')}
            className={cn(viewMode === 'mobile' && 'bg-[#FAF9F7]')}
          >
            <Smartphone className="w-4 h-4 mr-2" />
            Mobile
          </Button>
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          className={cn(isPreviewing && 'bg-[#FAF9F7]')}
        >
          <Eye className="w-4 h-4 mr-2" />
          {isPreviewing ? 'Modo Edição' : 'Visualizar'}
        </Button>
      </div>

      {/* Preview Content */}
      <ScrollArea className="flex-1 p-4 bg-[#FAF9F7]">
        <div className={cn(
          "min-h-full bg-white rounded-lg shadow-sm px-6 py-8 mx-auto",
          viewMode === 'mobile' ? 'max-w-md' : 'max-w-4xl'
        )}>
          {isPreviewing ? (
            // Preview mode (no drag and drop)
            <div>
              {blocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  primaryStyle={primaryStyle}
                  isSelected={false}
                  onSelect={() => {}}
                />
              ))}
            </div>
          ) : (
            // Edit mode with drag and drop
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={blocks.map(block => block.id)}
                strategy={verticalListSortingStrategy}
              >
                {blocks.map((block) => (
                  <SortableItem key={block.id} id={block.id}>
                    <BlockRenderer
                      block={block}
                      primaryStyle={primaryStyle}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => onSelectBlock(block.id)}
                    />
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EditorPreview;
