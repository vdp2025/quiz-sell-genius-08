import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isTouchDevice } from '@/utils/isTouchDevice';
import { Block } from '@/types/editor';
import { EditableBlock } from './EditableBlock';
import { StyleResult } from '@/types/quiz';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onUpdateBlock: (id: string, content: any) => void;
  onDeleteBlock: (id: string) => void;
  onReorderBlocks: (startIndex: number, endIndex: number) => void;
  isPreviewMode: boolean;
  primaryStyle: StyleResult;
}

export const EditorPreview: React.FC<EditorPreviewProps> = ({
  blocks,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlock,
  onDeleteBlock,
  onReorderBlocks,
  isPreviewMode,
  primaryStyle
}) => {
  const handleSelectBlock = useCallback((id: string) => {
    onSelectBlock(id);
  }, [onSelectBlock]);

  const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

  return (
    <DndProvider backend={backend}>
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <EditableBlock
            key={block.id}
            block={block}
            isSelected={selectedBlockId === block.id}
            onClick={() => handleSelectBlock(block.id)}
            isPreviewMode={isPreviewMode}
            onReorderBlocks={handleReorderBlocks}
            primaryStyle={primaryStyle}
          />
        ))}
      </div>
    </DndProvider>
  );
};
