
import React, { useState, useEffect } from 'react';
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
import { EditorProps } from '@/types/editor';
import { toast } from '@/components/ui/use-toast';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface ResultPageVisualEditorProps extends EditorProps {
  initialConfig?: ResultPageConfig;
}

export const ResultPageVisualEditor: React.FC<ResultPageVisualEditorProps> = ({ 
  selectedStyle,
  onShowTemplates,
  initialConfig
}) => {
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
      updateSection,
      importConfig
    }
  } = useResultPageEditor(selectedStyle.category);

  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    updateBlocks,
    actions: blockActions
  } = useBlockOperations();

  // Apply initial config if provided
  useEffect(() => {
    if (initialConfig && importConfig) {
      importConfig(initialConfig);
    }
  }, [initialConfig, importConfig]);

  // Sync blocks with config when needed
  useEffect(() => {
    if (resultPageConfig?.blocks) {
      updateBlocks(resultPageConfig.blocks);
    } else {
      // Initialize with empty blocks if not present
      updateSection('blocks', []);
    }
  }, [resultPageConfig, updateBlocks, updateSection]);

  const handleUpdateConfig = (newConfig: any) => {
    if (newConfig) {
      try {
        importConfig(newConfig);
        if (newConfig.blocks) {
          updateBlocks(newConfig.blocks);
        } else {
          updateBlocks([]);
        }
        toast({
          title: "Configuração atualizada",
          description: "A configuração foi aplicada com sucesso",
        });
      } catch (error) {
        console.error('Error updating config:', error);
        toast({
          title: "Erro ao atualizar configuração",
          description: "Ocorreu um erro ao aplicar a configuração",
          variant: "destructive"
        });
      }
    }
  };

  // Adapter functions to match component interfaces
  const handleUpdateBlock = (content: any) => {
    if (selectedBlockId) {
      blockActions.handleUpdateBlock(selectedBlockId, content);
    }
  };

  const handleDeleteBlock = () => {
    if (selectedBlockId) {
      blockActions.handleDeleteBlock(selectedBlockId);
    }
  };

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
          onUpdateConfig={handleUpdateConfig}
          onShowTemplates={onShowTemplates}
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
              onUpdate={handleUpdateBlock}
              onDelete={handleDeleteBlock}
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
