
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { EditorToolbar } from '@/components/result-editor/EditorToolbar';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';

export const EditorPage = () => {
  const { style } = useParams<{ style: string }>();
  const {
    blocks,
    selectedBlockId,
    isPreviewing,
    actions,
  } = useResultPageEditor(style || 'Natural');

  const selectedStyle = {
    category: style || 'Natural',
    score: 100,
    percentage: 100
  };

  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar 
        onSave={actions.handleSave}
        isPreviewMode={isPreviewing}
        onPreviewToggle={actions.togglePreview}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar onComponentSelect={actions.handleAddBlock} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={actions.setSelectedBlockId}
            isPreviewing={isPreviewing}
            primaryStyle={selectedStyle}
            onReorderBlocks={actions.handleReorderBlocks}
            styleType={style}
            onDeleteBlock={actions.handleDeleteBlock}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => actions.setSelectedBlockId(null)}
            onUpdate={(content) => {
              if (selectedBlockId) {
                actions.handleUpdateBlock(selectedBlockId, content);
              }
            }}
            onDelete={() => {
              if (selectedBlockId) {
                actions.handleDeleteBlock(selectedBlockId);
                actions.setSelectedBlockId(null);
              }
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EditorPage;
