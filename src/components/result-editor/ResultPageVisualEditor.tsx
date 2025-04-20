
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
import { useBlockOperations } from '@/hooks/useBlockOperations';
import { EditorProps } from '@/types/editorTypes';
import { toast } from '@/components/ui/use-toast';

export const ResultPageVisualEditor: React.FC<EditorProps> = ({ 
  selectedStyle,
  onShowTemplates
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false);
  
  const {
    blocks,
    selectedBlockId,
    setSelectedBlockId,
    actions: blockActions
  } = useBlockOperations();

  // Dummy save function for now
  const handleSave = async () => {
    toast({
      title: "Configurações salvas",
      description: "As alterações foram salvas com sucesso.",
    });
    return Promise.resolve();
  };

  // Dummy reset function
  const handleReset = () => {
    toast({
      title: "Configurações resetadas",
      description: "As configurações foram resetadas para os valores padrão.",
    });
  };

  // Fix for the parameter mismatch issues
  const handleUpdateBlock = (id: string, content: any) => {
    blockActions.handleUpdateBlock(id, content);
  };

  const handleDeleteBlock = (id: string) => {
    blockActions.handleDeleteBlock(id);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col overflow-hidden">
        <EditorToolbar 
          onSave={handleSave}
          isPreviewMode={isPreviewMode}
          onPreviewToggle={() => setIsPreviewMode(!isPreviewMode)}
          onReset={handleReset}
          onEditGlobalStyles={() => setIsGlobalStylesOpen(true)}
          resultPageConfig={{}}
          onUpdateConfig={() => {}}
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
              isPreviewing={isPreviewMode}
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
              onUpdate={(content) => {
                if (selectedBlockId) {
                  handleUpdateBlock(selectedBlockId, content);
                }
              }}
              onDelete={() => {
                if (selectedBlockId) {
                  handleDeleteBlock(selectedBlockId);
                }
              }}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        {isGlobalStylesOpen && (
          <GlobalStylesEditor
            globalStyles={{
              primaryColor: '#B89B7A',
              secondaryColor: '#432818',
              textColor: '#1A1818',
              backgroundColor: '#fffaf7',
              fontFamily: 'Playfair Display'
            }}
            onSave={(styles) => {
              toast({
                title: "Estilos atualizados",
                description: "Os estilos globais foram atualizados com sucesso.",
              });
              setIsGlobalStylesOpen(false);
            }}
            onCancel={() => setIsGlobalStylesOpen(false)}
          />
        )}
      </div>
    </DndProvider>
  );
};
