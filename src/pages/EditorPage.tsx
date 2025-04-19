
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { EditorToolbar } from '@/components/result-editor/EditorToolbar';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { StyleResult } from '@/types/quiz';

export const EditorPage = () => {
  const { style } = useParams<{ style: string }>();
  const {
    resultPageConfig,
    blocks,
    selectedBlockId,
    isPreviewing,
    actions,
  } = useResultPageEditor(style || 'Natural');

  // Ensure we're using a valid style category by checking against the allowed values
  const isValidStyleCategory = (s: string): s is StyleResult['category'] => {
    return ["Natural", "Clássico", "Contemporâneo", "Elegante", "Romântico", "Sexy", "Dramático", "Criativo"].includes(s);
  };
  
  // Get styleCategory, defaulting to "Natural" if invalid
  const styleCategory = style && isValidStyleCategory(style) ? style : "Natural";
  
  const selectedStyle: StyleResult = {
    category: styleCategory,
    score: 100,
    percentage: 100
  };

  const handleUpdateConfig = (newConfig: any) => {
    if (newConfig.blocks) {
      // Update all blocks at once by setting them in state via the updateSection method
      actions.updateSection('blocks', newConfig.blocks);
    }
    // Update other config sections if needed
  };

  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar 
        onSave={actions.handleSave}
        isPreviewMode={isPreviewing}
        onPreviewToggle={actions.togglePreview}
        onReset={actions.handleReset}
        onUpdateBlocks={(blocks) => actions.updateSection('blocks', blocks)}
        styleType={styleCategory}
        config={resultPageConfig}
        onUpdateConfig={handleUpdateConfig}
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
            styleType={styleCategory}
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
