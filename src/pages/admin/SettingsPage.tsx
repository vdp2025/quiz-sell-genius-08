
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { TrackingConfigForm } from '@/components/settings/TrackingConfigForm';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">Configurações</h1>
        <TrackingConfigForm />
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
