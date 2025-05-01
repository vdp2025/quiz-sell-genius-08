
import React, { useState } from 'react';
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
  const [config, setConfig] = useState<ResultPageConfig | undefined>(initialConfig);
  
  const handleUpdateConfig = (newConfig: ResultPageConfig) => {
    setConfig(newConfig);
  };
  
  return (
    <div className="h-full">
      <ResultPageVisualEditor
        selectedStyle={primaryStyle}
        onShowTemplates={() => {}}
        initialConfig={config}
        onUpdateConfig={handleUpdateConfig}
        isPreviewing={isPreviewing}
      />
    </div>
  );
};

export default ResultEditorPanel;
