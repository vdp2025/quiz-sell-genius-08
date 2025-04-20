import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { EditorPreview } from './preview/EditorPreview';
import { PropertiesPanel } from './properties/PropertiesPanel';
import { useEditor } from '@/hooks/useEditor';
import { EditorToolbar } from './toolbar/EditorToolbar';

export function VisualEditor() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { config, addBlock, updateBlock, deleteBlock, saveConfig } = useEditor();
  
  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar 
        isPreviewing={isPreviewing}
        onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
        onSave={saveConfig}
        config={config}
      />
      
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        {/* Left Panel - Components */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar 
            onComponentSelect={(type) => {
              const id = addBlock(type);
              setSelectedBlockId(id);
            }} 
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Center Panel - Preview */}
        <ResizablePanel defaultSize={55}>
          <EditorPreview
            blocks={config.blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            isPreviewing={isPreviewing}
            onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Properties */}
        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            selectedBlockId={selectedBlockId}
            onClose={() => setSelectedBlockId(null)}
            onUpdate={(content) => {
              if (selectedBlockId) {
                updateBlock(selectedBlockId, content);
              }
            }}
            onDelete={() => {
              if (selectedBlockId) {
                deleteBlock(selectedBlockId);
                setSelectedBlockId(null);
              }
            }}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
