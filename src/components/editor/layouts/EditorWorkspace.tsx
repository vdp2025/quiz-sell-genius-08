
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import ComponentsSidebar from '../sidebar/ComponentsSidebar';
import { EditPreview } from '../preview/EditPreview';
import PropertiesPanel from '../properties/PropertiesPanel';
import { cn } from '@/lib/utils';

interface EditorWorkspaceProps {
  className?: string;
}

export function EditorWorkspace({ className }: EditorWorkspaceProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  return (
    <div className={cn("h-screen flex flex-col bg-[#FAF9F7]", className)}>
      <ResizablePanelGroup direction="horizontal">
        {/* Components Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar 
            onSelect={(id) => setSelectedComponentId(id)} 
            selectedId={selectedComponentId}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Area */}
        <ResizablePanel defaultSize={55}>
          <EditPreview 
            isPreviewing={isPreviewing}
            onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
            onSelectComponent={setSelectedComponentId}
            selectedComponentId={selectedComponentId}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Properties Panel */}
        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            componentId={selectedComponentId}
            onClose={() => setSelectedComponentId(null)}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
