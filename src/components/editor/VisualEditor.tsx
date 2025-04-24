
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorState, EditorSection } from '@/types/editor/visualEditor';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { EditorPreview } from './preview/EditorPreview';
import { PropertiesPanel } from './properties/PropertiesPanel';

export const VisualEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>({
    selectedBlockId: null,
    isPreviewing: false,
    isGlobalStylesOpen: false,
    isDraggingBlock: false,
    currentEditingSection: 'quiz'
  });

  const handleSectionChange = (section: EditorSection) => {
    setEditorState(prev => ({ ...prev, currentEditingSection: section }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-background">
        <EditorToolbar
          isPreviewing={editorState.isPreviewing}
          onPreviewToggle={() => setEditorState(prev => ({ ...prev, isPreviewing: !prev.isPreviewing }))}
          onSave={() => {/* Implement save logic */}}
        />

        <Tabs 
          defaultValue="quiz" 
          className="flex-1"
          onValueChange={(value) => handleSectionChange(value as EditorSection)}
        >
          <div className="border-b px-4 bg-white">
            <TabsList>
              <TabsTrigger value="quiz">Editor do Quiz</TabsTrigger>
              <TabsTrigger value="result">Editor da Página de Resultado</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="quiz" className="flex-1 h-[calc(100vh-8rem)]">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={20} minSize={15}>
                <ComponentsSidebar 
                  type="quiz"
                  onSelect={(componentType) => {
                    // Implement component selection
                  }}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={55}>
                <EditorPreview
                  isPreviewing={editorState.isPreviewing}
                  selectedBlockId={editorState.selectedBlockId}
                  onSelectBlock={(id) => setEditorState(prev => ({ ...prev, selectedBlockId: id }))}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              <ResizablePanel defaultSize={25}>
                <PropertiesPanel
                  selectedBlockId={editorState.selectedBlockId}
                  onClose={() => setEditorState(prev => ({ ...prev, selectedBlockId: null }))}
                />
              </ResizablePanel>
            </ResizablePanelGroup>
          </TabsContent>

          <TabsContent value="result" className="flex-1 h-[calc(100vh-8rem)]">
            {/* Similar panel structure for result page editor */}
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
};
