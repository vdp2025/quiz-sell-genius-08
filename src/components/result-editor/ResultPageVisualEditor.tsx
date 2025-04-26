import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { EditorPreview } from './EditorPreview';
import { PropertiesPanel } from './PropertiesPanel';
import { EditorToolbar } from './EditorToolbar';
import { JsonConfigEditor } from './JsonConfigEditor';
import { StyleResult } from '@/types/quiz';
import { EditorProvider, useEditor } from '@/context/EditorContext';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface ResultPageVisualEditorProps {
  selectedStyle: StyleResult;
  onShowTemplates: () => void;
  initialConfig?: ResultPageConfig;
}

const EditorContent = ({ selectedStyle, onShowTemplates, initialConfig }: ResultPageVisualEditorProps) => {
  const {
    blocks,
    selectedBlockId,
    isPreviewing,
    addBlock,
    updateBlock,
    deleteBlock,
    selectBlock,
    reorderBlocks,
    togglePreview
  } = useEditor();

  // Adaptador para compatibilidade de tipos
  const handleUpdateConfig = (newConfig: any) => {
    if (newConfig && typeof newConfig === 'object') {
      updateBlock(newConfig.id || 'config', newConfig);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <EditorToolbar 
        isPreviewMode={isPreviewing}
        onPreviewToggle={togglePreview}
        onShowTemplates={onShowTemplates}
        resultPageConfig={initialConfig}
        onUpdateConfig={handleUpdateConfig}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar onComponentSelect={addBlock} />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={selectBlock}
            isPreviewing={isPreviewing}
            primaryStyle={selectedStyle}
            onReorderBlocks={reorderBlocks}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            blocks={blocks}
            onClose={() => selectBlock(null)}
            onUpdate={updateBlock}
            onDelete={deleteBlock}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export const ResultPageVisualEditor = (props: ResultPageVisualEditorProps) => {
  return (
    <EditorProvider>
      <EditorContent {...props} />
    </EditorProvider>
  );
};
