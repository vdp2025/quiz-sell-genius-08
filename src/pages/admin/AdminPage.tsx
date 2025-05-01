
import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

const AdminPage = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-4">Welcome to the admin dashboard.</p>
      </div>
    </AdminLayout>
  );
};

export default AdminPage;
