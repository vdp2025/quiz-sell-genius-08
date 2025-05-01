
import React from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-4">Configure application settings here.</p>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
