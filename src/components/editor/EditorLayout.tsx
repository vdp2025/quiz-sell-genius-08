
import React from 'react';
import { StyleResult } from '@/types/quiz';
import ComponentsSidebar from './sidebar/ComponentsSidebar';
import PropertiesPanel from './properties/PropertiesPanel';
import PagePreview from './preview/PagePreview';

interface EditorLayoutProps {
  primaryStyle: StyleResult;
}

const EditorLayout = ({ primaryStyle }: EditorLayoutProps) => {
  const [selectedComponent, setSelectedComponent] = React.useState<string | null>(null);

  return (
    <div className="flex h-screen bg-[#FAF9F7]">
      {/* Left Sidebar - Components */}
      <div className="w-64 border-r border-[#B89B7A]/20 bg-white overflow-y-auto">
        <ComponentsSidebar onComponentSelect={(componentType) => console.log('Selected:', componentType)} />
      </div>

      {/* Central Area - Page Preview */}
      <div className="flex-1 overflow-y-auto">
        <PagePreview
          primaryStyle={primaryStyle}
          onSelectComponent={setSelectedComponent}
        />
      </div>

      {/* Right Sidebar - Properties */}
      <div className="w-80 border-l border-[#B89B7A]/20 bg-white overflow-y-auto">
        <PropertiesPanel
          selectedComponentId={selectedComponent}
          onClose={() => setSelectedComponent(null)}
        />
      </div>
    </div>
  );
};

export default EditorLayout;
