
import React from 'react';
import { StylePagePreview } from './StylePagePreview';
import { Block } from '@/types/editor';

interface EditorPreviewProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string | null) => void;
  isPreviewing: boolean;
  onPreviewToggle: () => void;
  styleType: string;
}

export function EditorPreview({
  blocks,
  selectedBlockId,
  onSelectBlock,
  isPreviewing,
  onPreviewToggle,
  styleType
}: EditorPreviewProps) {
  return (
    <StylePagePreview
      blocks={blocks}
      selectedBlockId={selectedBlockId}
      onSelectBlock={onSelectBlock}
      isPreviewing={isPreviewing}
      onPreviewToggle={onPreviewToggle}
      styleType={styleType}
    />
  );
}
