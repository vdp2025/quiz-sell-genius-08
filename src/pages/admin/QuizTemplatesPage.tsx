
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const QuizTemplatesPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz Templates</h1>
        <p>Manage your quiz templates here.</p>
      </div>
    </AdminLayout>
  );
};

export default QuizTemplatesPage;
