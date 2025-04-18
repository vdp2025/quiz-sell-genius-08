
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import EditorLayout from '@/components/editor/EditorLayout';
import { useQuizLogic } from '@/hooks/useQuizLogic';

const EditorPage = () => {
  const { quizResult } = useQuizLogic();
  
  return (
    <AdminLayout>
      <EditorLayout 
        primaryStyle={quizResult?.primaryStyle || {
          category: 'Natural',
          score: 0,
          percentage: 100
        }} 
      />
    </AdminLayout>
  );
};

export default EditorPage;
