
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppearanceTab } from '@/components/settings/AppearanceTab';
import { ApiIntegrationsTab } from '@/components/settings/ApiIntegrationsTab';
import { AnalyticsTab } from '@/components/settings/AnalyticsTab';
import { MarketingTab } from '@/components/settings/MarketingTab';
import { AdvancedTab } from '@/components/settings/AdvancedTab';

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">Settings</h1>
        
        <Tabs defaultValue="appearance">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="integrations">API Integrations</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="mt-6">
            <AppearanceTab />
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6">
            <ApiIntegrationsTab />
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <AnalyticsTab />
          </TabsContent>
          
          <TabsContent value="marketing" className="mt-6">
            <MarketingTab />
          </TabsContent>
          
          <TabsContent value="advanced" className="mt-6">
            <AdvancedTab />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
