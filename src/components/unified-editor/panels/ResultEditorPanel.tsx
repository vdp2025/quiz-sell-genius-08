
import React from 'react';
import { StyleResult } from '@/types/quiz';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface ResultEditorPanelProps {
  isPreviewing: boolean;
  primaryStyle: StyleResult;
  initialConfig?: ResultPageConfig;
}

const ResultEditorPanel: React.FC<ResultEditorPanelProps> = ({ 
  isPreviewing, 
  primaryStyle,
  initialConfig
}) => {
  // Pass the isPreviewing prop to the ResultPageVisualEditor
  return (
    <div className="h-full">
      <ResultPageVisualEditor
        selectedStyle={primaryStyle}
        onShowTemplates={() => {}}
        initialConfig={initialConfig}
        isPreviewing={isPreviewing}
      />
    </div>
  );
};

export default ResultEditorPanel;
