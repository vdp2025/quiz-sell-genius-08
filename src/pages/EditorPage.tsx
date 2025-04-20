
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { EditorPreview } from '@/components/result-editor/EditorPreview';
import { PropertiesPanel } from '@/components/result-editor/PropertiesPanel';
import { useResultPageEditor } from '@/hooks/useResultPageEditor';
import { EditorToolbar } from '@/components/result-editor/EditorToolbar';
import { ComponentsSidebar } from '@/components/result-editor/ComponentsSidebar';
import { StyleResult } from '@/types/quiz';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { toast } from '@/components/ui/use-toast';

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

  const handleUpdateConfig = (newConfig: ResultPageConfig) => {
    console.log("Atualizando configuração", newConfig);
    
    try {
      // Preserve the current style type when updating the config
      const updatedConfig = {
        ...newConfig,
        styleType: styleCategory
      };
      
      // Update blocks if they exist in the new config
      if (newConfig.blocks) {
        actions.updateSection('blocks', newConfig.blocks);
      }
      
      // If there are other changes that need to be handled separately, do that here
      if (newConfig.globalStyles) {
        actions.updateSection('globalStyles', newConfig.globalStyles);
      }
      
      // Additional sections to update if changed
      if (newConfig.header) {
        actions.updateSection('header', newConfig.header);
      }
      
      if (newConfig.mainContent) {
        actions.updateSection('mainContent', newConfig.mainContent);
      }
      
      if (newConfig.secondaryStyles) {
        actions.updateSection('secondaryStyles', newConfig.secondaryStyles);
      }
      
      if (newConfig.offer) {
        actions.updateSection('offer', newConfig.offer);
      }
      
      toast({
        title: "Configuração atualizada",
        description: "As alterações foram aplicadas com sucesso",
        variant: "default"
      });
      
    } catch (error) {
      console.error("Erro ao atualizar configuração:", error);
      toast({
        title: "Erro ao atualizar configuração",
        description: "Ocorreu um erro ao aplicar as alterações",
        variant: "destructive"
      });
    }
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
