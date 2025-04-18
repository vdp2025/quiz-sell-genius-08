
import React from 'react';
import EditorLayout from '@/components/editor/EditorLayout';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

const EditorPage = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Top Bar */}
      <div className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-[#432818]">Editor de Página</h1>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <EditorLayout />
      </div>
    </div>
  );
};

export default EditorPage;
