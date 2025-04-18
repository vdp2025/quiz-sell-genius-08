
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './ComponentsSidebar';
import { EditorPreview } from './EditorPreview';
import { PropertiesPanel } from './PropertiesPanel';
import { EditorToolbar } from './EditorToolbar';
import { GlobalStylesEditor } from './GlobalStylesEditor';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { EditorProps } from '@/types/editorTypes';

export const ResultPageVisualEditor: React.FC<EditorProps> = ({ selectedStyle }) => {
  const {
    state,
    loading,
    actions,
    resultPageConfig
  } = useResultPageEditor(selectedStyle.category);

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
          onSave={actions.handleSave}
          isPreviewMode={state.isPreviewing}
          onPreviewToggle={() => setState(prev => ({ ...prev, isPreviewing: !prev.isPreviewing }))}
          onReset={actions.handleReset}
          onEditGlobalStyles={actions.toggleGlobalStyles}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ComponentsSidebar onComponentSelect={actions.handleAddBlock} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={55}>
            <EditorPreview
              blocks={state.blocks}
              selectedBlockId={state.selectedBlockId}
              onSelectBlock={(id) => setState(prev => ({ ...prev, selectedBlockId: id }))}
              isPreviewing={state.isPreviewing}
              primaryStyle={selectedStyle}
              onReorderBlocks={actions.handleReorderBlocks}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={25}>
            <PropertiesPanel
              selectedBlockId={state.selectedBlockId}
              blocks={state.blocks}
              onClose={() => setState(prev => ({ ...prev, selectedBlockId: null }))}
              onUpdate={actions.handleUpdateBlock}
              onDelete={actions.handleDeleteBlock}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        {state.isGlobalStylesOpen && (
          <GlobalStylesEditor
            globalStyles={resultPageConfig.globalStyles || {}}
            onSave={(styles) => {
              updateSection('globalStyles', styles);
              actions.toggleGlobalStyles();
            }}
            onCancel={actions.toggleGlobalStyles}
          />
        )}
      </div>
    </DndProvider>
  );
};
