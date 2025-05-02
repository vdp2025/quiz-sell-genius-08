
import React from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { StyleResult } from '@/types/quiz';
import { ResultPageEditorPanel } from '@/components/editor/result/ResultPageEditorPanel';
import { ResultPagePreview } from '@/components/editor/result/ResultPagePreview';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({
  isPreviewing,
  primaryStyle
}) => {
  return (
    <div className="h-full">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        {!isPreviewing && (
          <>
            <ResizablePanel defaultSize={30} minSize={20} maxSize={40}>
              <ResultPageEditorPanel 
                primaryStyle={primaryStyle}
                isPreviewing={isPreviewing}
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}
        
        <ResizablePanel defaultSize={isPreviewing ? 100 : 70}>
          <ResultPagePreview 
            primaryStyle={primaryStyle}
            isPreviewing={isPreviewing}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResultEditorPanel;
