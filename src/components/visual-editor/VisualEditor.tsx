
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { EditorPreview } from './preview/EditorPreview';
import { PropertiesPanel } from './properties/PropertiesPanel';
import { useEditor } from '@/hooks/useEditor';

export function VisualEditor() {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const { config, addBlock, updateBlock, deleteBlock } = useEditor();
  
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-0 h-full">
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
  );
}
