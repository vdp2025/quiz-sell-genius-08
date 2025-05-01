
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
  
  // We'll handle updates internally since ResultPageVisualEditor doesn't have onUpdateConfig
  const handleShowTemplates = () => {
    // This is a placeholder function since we're not handling templates here
    console.log('Show templates clicked');
  };
  
  return (
    <div className="h-full">
      <ResultPageVisualEditor
        selectedStyle={primaryStyle}
        onShowTemplates={handleShowTemplates}
        initialConfig={config}
        isPreviewing={isPreviewing}
      />
    </div>
  );
};

export default ResultEditorPanel;
