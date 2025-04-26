
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { StyleResult } from '@/types/quiz';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({ isPreviewing, primaryStyle }) => {
  const {
    resultPageConfig,
    actions: { updateSection }
  } = useResultPageEditor(primaryStyle.category);

  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    actions: blockActions
  } = useBlockOperations();

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Painel esquerdo - Biblioteca de componentes */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <ComponentsSidebar onComponentSelect={blockActions.handleAddBlock} />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel central - Preview */}
      <ResizablePanel defaultSize={55}>
        <EditorPreview
          blocks={blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          isPreviewing={isPreviewing}
          primaryStyle={primaryStyle}
          onReorderBlocks={blockActions.handleReorderBlocks}
        />
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* Painel direito - Propriedades */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <PropertiesPanel
          selectedBlockId={selectedBlockId}
          blocks={blocks}
          onClose={() => setSelectedBlockId(null)}
          onUpdate={blockActions.handleUpdateBlock}
          onDelete={blockActions.handleDeleteBlock}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ResultEditorPanel;
