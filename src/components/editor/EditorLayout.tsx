
import React, { useState } from 'react';
import { StyleResult } from '@/types/quiz';
import ComponentsSidebar from './sidebar/ComponentsSidebar';
import PropertiesPanel from './properties/PropertiesPanel';
import PagePreview from './preview/PagePreview';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface EditorLayoutProps {
  primaryStyle?: StyleResult;
}

const EditorLayout = ({ primaryStyle }: EditorLayoutProps) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      {/* Left Sidebar - Components */}
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="h-full border-r border-[#B89B7A]/20 bg-white overflow-y-auto">
          <ComponentsSidebar onComponentSelect={(componentType) => console.log('Selected:', componentType)} />
        </div>
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Central Area - Page Preview */}
      <ResizablePanel defaultSize={55}>
        <PagePreview
          primaryStyle={primaryStyle || {
            category: 'Natural',
            score: 0,
            percentage: 100
          }}
          onSelectComponent={setSelectedComponent}
        />
      </ResizablePanel>
      
      <ResizableHandle withHandle />
      
      {/* Right Sidebar - Properties */}
      <ResizablePanel defaultSize={25} minSize={20} maxSize={40}>
        <div className="h-full border-l border-[#B89B7A]/20 bg-white overflow-y-auto">
          <PropertiesPanel
            selectedComponentId={selectedComponent}
            onClose={() => setSelectedComponent(null)}
          />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default EditorLayout;
