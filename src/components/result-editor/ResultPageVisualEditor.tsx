
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { EditorPreview } from './EditorPreview';
import { PropertiesPanel } from './PropertiesPanel';
import EditorToolbar from './EditorToolbar';
import { GlobalStylesEditor } from './GlobalStylesEditor';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { useBlockOperations } from '@/hooks/editor/useBlockOperations';
import { EditorProps } from '@/types/editorTypes';

export const ResultPageVisualEditor: React.FC<EditorProps> = ({ selectedStyle }) => {
  const {
    resultPageConfig,
    loading,
    isPreviewing,
    isGlobalStylesOpen,
    actions: {
      handleSave,
      handleReset,
      toggleGlobalStyles,
      togglePreview,
      updateSection
    }
  } = useResultPageEditor(selectedStyle.category);

  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    actions: blockActions
  } = useBlockOperations();

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-[#1A1818]/70">Carregando configurações...</p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col overflow-hidden">
        <EditorToolbar 
          onSave={handleSave}
          isPreviewMode={isPreviewing}
          onPreviewToggle={togglePreview}
          onReset={handleReset}
          onEditGlobalStyles={toggleGlobalStyles}
          resultPageConfig={resultPageConfig}
          onUpdateConfig={(newConfig) => {
            if (newConfig) {
              Object.keys(newConfig).forEach(key => {
                updateSection(key, newConfig[key]);
              });
            }
          }}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ComponentsSidebar onComponentSelect={blockActions.handleAddBlock} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={55}>
            <EditorPreview
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={setSelectedBlockId}
              isPreviewing={isPreviewing}
              primaryStyle={selectedStyle}
              onReorderBlocks={blockActions.handleReorderBlocks}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={25}>
            <PropertiesPanel
              selectedBlockId={selectedBlockId}
              blocks={blocks}
              onClose={() => setSelectedBlockId(null)}
              onUpdate={blockActions.handleUpdateBlock}
              onDelete={blockActions.handleDeleteBlock}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        {isGlobalStylesOpen && (
          <GlobalStylesEditor
            globalStyles={resultPageConfig.globalStyles || {}}
            onSave={(styles) => {
              updateSection('globalStyles', styles);
              toggleGlobalStyles();
            }}
            onCancel={toggleGlobalStyles}
          />
        )}
      </div>
    </DndProvider>
  );
};
