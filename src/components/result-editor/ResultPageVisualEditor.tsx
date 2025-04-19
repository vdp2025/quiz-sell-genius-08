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
import { EditorProps } from '@/types/editorTypes';
import { TemplateSelector } from './TemplateSelector';

interface ResultPageVisualEditorProps extends EditorProps {
  onShowTemplates?: () => void;
}

export const ResultPageVisualEditor: React.FC<ResultPageVisualEditorProps> = ({ 
  selectedStyle,
  onShowTemplates
}) => {
  const {
    resultPageConfig,
    loading,
    blocks,
    selectedBlockId,
    isPreviewing,
    isGlobalStylesOpen,
    actions
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
          isPreviewMode={isPreviewing}
          onPreviewToggle={actions.togglePreview}
          onReset={actions.handleReset}
          onEditGlobalStyles={actions.toggleGlobalStyles}
          resultPageConfig={resultPageConfig}
          onUpdateConfig={(newConfig) => {
            if (newConfig) {
              Object.keys(newConfig).forEach(key => {
                actions.updateSection(key, newConfig[key]);
              });
            }
          }}
          onShowTemplates={onShowTemplates}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ComponentsSidebar onComponentSelect={actions.handleAddBlock} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={55}>
            <TemplateSelector
              currentStyle={selectedStyle.category}
              onTemplateSelect={(template) => {
                Object.keys(template).forEach(key => {
                  actions.updateSection(key, template[key]);
                });
              }}
            />
            <EditorPreview
              blocks={blocks}
              selectedBlockId={selectedBlockId}
              onSelectBlock={actions.setSelectedBlockId}
              isPreviewing={isPreviewing}
              primaryStyle={selectedStyle}
              onReorderBlocks={actions.handleReorderBlocks}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={25}>
            <PropertiesPanel
              selectedBlockId={selectedBlockId}
              blocks={blocks}
              onClose={() => actions.setSelectedBlockId(null)}
              onUpdate={actions.handleUpdateBlock}
              onDelete={actions.handleDeleteBlock}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        {isGlobalStylesOpen && (
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
    </DndProvider>
  );
};
