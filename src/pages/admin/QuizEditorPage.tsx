
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import QuizEditor from '@/components/quiz-editor/QuizEditor';

const QuizEditorPage = () => {
  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7] p-6">
        <QuizEditor />
      </div>
    </AdminLayout>
  );
};

export default QuizEditorPage;
