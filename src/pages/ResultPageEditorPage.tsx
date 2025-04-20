
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';

const ResultPageEditorPage = () => {
  const [searchParams] = useSearchParams();
  
  // Get style from URL or use default
  const styleCategory = searchParams.get('style') || 'Natural';
  const styleScore = parseInt(searchParams.get('score') || '0');
  const stylePercentage = parseInt(searchParams.get('percentage') || '0');
  
  const selectedStyle = {
    category: styleCategory as 'Natural' | 'Clássico' | 'Contemporâneo' | 'Elegante' | 'Romântico' | 'Sexy' | 'Dramático' | 'Criativo',
    score: styleScore || 10,
    percentage: stylePercentage || 75
  };

  return (
    <div className="h-screen">
      <ResultPageVisualEditor 
        selectedStyle={selectedStyle}
        onShowTemplates={() => {
          // Show templates functionality
          console.log('Show templates');
        }}
      />
    </div>
  );
};

export default ResultPageEditorPage;
