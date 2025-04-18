
import React from 'react';
import { useParams } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { getDefaultStyle } from '@/utils/styleUtils';
import { StyleResult } from '@/types/quiz';

export const EditorPage = () => {
  // Get style from params or use a default
  const { style } = useParams<{ style?: string }>();
  
  // Convert style param to proper type or use default
  const styleCategory = (style as "Natural" | "Clássico" | "Contemporâneo" | "Elegante" | "Romântico" | "Sexy" | "Dramático" | "Criativo") || 'Natural';
  
  // Create a properly typed StyleResult object
  const selectedStyle: StyleResult = {
    category: styleCategory,
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
