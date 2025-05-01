
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';

const StatisticsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Quiz Statistics</h1>
        <p>View detailed statistics about quiz performance.</p>
      </div>
    </AdminLayout>
  );
};

export default StatisticsPage;
