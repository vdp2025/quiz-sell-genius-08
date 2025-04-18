
import React, { useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Block } from '@/types/editor';
import { StyleResult } from '@/types/quiz';
import EditableBlock from './EditableBlock';
import { useDrag, useDrop } from 'react-dnd';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

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
  const ref = useRef<HTMLDivElement>(null);
  
  const [, drop] = useDrop({
    accept: 'BLOCK',
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = blocks.length;
      
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      
      // Time to actually perform the action
      onReorderBlocks(dragIndex, hoverIndex);
      
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });
  
  // Apply the reference to the drop target
  drop(ref);
  
  // Styles for preview mode
  const previewStyle = isPreviewing ? {
    backgroundColor: '#fffaf7',
    minHeight: '100vh',
    padding: '2rem'
  } : {};
  
  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#F7F7F7] p-4 border-b">
        <h2 className="font-semibold">
          {isPreviewing ? 'Visualização' : 'Editor'}
        </h2>
      </div>
      
      <ScrollArea className="flex-1">
        <div
          style={previewStyle}
          className="min-h-full p-4"
        >
          <div className="max-w-4xl mx-auto space-y-6">
            {blocks.map((block, index) => (
              <EditableBlock
                key={block.id}
                block={block}
                index={index}
                isSelected={block.id === selectedBlockId}
                onClick={() => onSelectBlock(block.id)}
                isPreviewMode={isPreviewing}
                onReorderBlocks={onReorderBlocks}
                primaryStyle={primaryStyle}
              />
            ))}
            
            {!isPreviewing && blocks.length === 0 && (
              <div 
                ref={ref}
                className="border-2 border-dashed border-[#B89B7A]/40 rounded-lg p-10 text-center"
              >
                <p className="text-[#8F7A6A] mb-4">
                  Arraste componentes para esta área ou clique no botão abaixo
                </p>
                <Button
                  variant="outline"
                  className="mx-auto border-[#B89B7A] text-[#B89B7A]"
                  onClick={() => onSelectBlock('new')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Componente
                </Button>
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
