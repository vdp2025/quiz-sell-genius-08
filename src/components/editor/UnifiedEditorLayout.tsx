
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from './sidebar/ComponentsSidebar';
import { StyleResult } from '@/types/quiz';
import PropertiesPanel from './properties/PropertiesPanel';
import { EditorToolbar } from './toolbar/EditorToolbar';
import { useUnifiedEditor } from '@/hooks/useUnifiedEditor';
import QuizEditorPanel from '@/components/unified-editor/panels/QuizEditorPanel';
import ResultEditorPanel from '@/components/unified-editor/panels/ResultEditorPanel';
import SalesEditorPanel from '@/components/unified-editor/panels/SalesEditorPanel';

interface UnifiedEditorLayoutProps {
  activeTab: 'quiz' | 'result' | 'sales';
  primaryStyle: StyleResult;
}

export const UnifiedEditorLayout: React.FC<UnifiedEditorLayoutProps> = ({
  activeTab,
  primaryStyle
}) => {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  const {
    quizBuilder,
    resultPageEditor,
    saveAll
  } = useUnifiedEditor(primaryStyle);

  const handleTogglePreview = () => {
    setIsPreviewing(prev => !prev);
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'quiz':
        return (
          <QuizEditorPanel isPreviewing={isPreviewing} />
        );
      case 'result':
        return (
          <ResultEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
        );
      case 'sales':
        return (
          <SalesEditorPanel isPreviewing={isPreviewing} primaryStyle={primaryStyle} />
        );
    }
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <EditorToolbar
        isPreviewing={isPreviewing}
        viewportSize={viewportSize}
        onViewportSizeChange={setViewportSize}
        onTogglePreview={handleTogglePreview}
        onSave={saveAll}
      />
      
      <div className="flex-1 overflow-hidden">
        {renderActivePanel()}
      </div>
    </div>
  );
};
