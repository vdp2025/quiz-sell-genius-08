
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { UTMAnalytics } from '@/components/analytics/UTMAnalytics';

const UTMAnalyticsPage = () => {
  return (
    <AdminLayout>
      <div className="p-6 bg-[#FAF9F7]">
        <h1 className="text-2xl font-playfair text-[#432818] mb-6">UTM Analytics</h1>
        <UTMAnalytics />
      </div>
    </AdminLayout>
  );
};

export default UTMAnalyticsPage;
