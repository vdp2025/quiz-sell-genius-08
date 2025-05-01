
import React, { useEffect } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { StyleResult } from '@/types/quiz';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { GlobalStylesEditor } from '@/components/result-editor/GlobalStylesEditor';
import { toast } from '@/components/ui/use-toast';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({
  isPreviewing,
  primaryStyle
}) => {
  const {
    resultPageConfig,
    blocks,
    selectedBlockId,
    selectBlock,
    isGlobalStylesOpen,
    actions,
    loading
  } = useResultPageEditor(primaryStyle.category);

  useEffect(() => {
    // Load initial configuration
    if (!blocks.length && !loading) {
      actions.handleSave(); // Use existing action instead of missing prop
    }
  }, [loading, actions, blocks.length]);

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar 
            onComponentSelect={actions.handleAddBlock}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={selectBlock}
            isPreviewing={isPreviewing}
            primaryStyle={primaryStyle}
            onReorderBlocks={actions.handleReorderBlocks}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => selectBlock(null)}
            onUpdate={actions.handleUpdateBlock}
            onDelete={actions.handleDeleteBlock}
          />
        </ResizablePanel>
      </ResizablePanelGroup>

      {isGlobalStylesOpen && resultPageConfig && (
        <GlobalStylesEditor
          globalStyles={resultPageConfig.globalStyles || {}}
          onSave={(styles) => {
            actions.updateSection('globalStyles', styles);
            actions.toggleGlobalStyles();
          }}
          onCancel={actions.toggleGlobalStyles}
        />
      )}
    </div>
  );
};

export default ResultEditorPanel;
