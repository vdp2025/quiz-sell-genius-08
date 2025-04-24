
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { ResultPageVisualEditor } from '@/components/result-editor/ResultPageVisualEditor';
import { StyleResult } from '@/types/quiz';

const ResultPageEditorPage = () => {
  // Mock data for development - this would normally come from your quiz state
  const mockStyle: StyleResult = {
    category: 'Natural',
    score: 100,
    percentage: 100
  };

  return (
    <AdminLayout>
      <ResultPageVisualEditor 
        selectedStyle={mockStyle}
        onShowTemplates={() => {}}
      />
    </AdminLayout>
  );
};

export default ResultPageEditorPage;
