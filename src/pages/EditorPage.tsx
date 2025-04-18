
import React from 'react';
import { useParams } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { getDefaultStyle } from '@/utils/styleUtils';

export const EditorPage = () => {
  // Get style from params or use a default
  const { style } = useParams<{ style?: string }>();
  
  // If no style is specified, use 'Natural' as default
  const selectedStyle = {
    category: style || 'Natural',
    score: 100,
    percentage: 100
  };
  
  return (
    <div className="h-screen">
      <ResultPageVisualEditor selectedStyle={selectedStyle} />
    </div>
  );
};

export default EditorPage;
