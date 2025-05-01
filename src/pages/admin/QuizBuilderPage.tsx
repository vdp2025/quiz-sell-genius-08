
import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

const QuizBuilderPage = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Quiz Builder</h1>
        <p className="mt-4">Build and customize quizzes here.</p>
      </div>
    </AdminLayout>
  );
};

export default QuizBuilderPage;
