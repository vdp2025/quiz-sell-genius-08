
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { GoogleAnalyticsCard } from '../integrations/GoogleAnalyticsCard';
import { FacebookPixelCard } from '../integrations/FacebookPixelCard';
import { WebhookCard } from '../integrations/WebhookCard';
import { ApiTokensCard } from '../integrations/ApiTokensCard';
import { MarketingPlatformsCard } from '../integrations/MarketingPlatformsCard';

export const IntegrationTab: React.FC = () => {
  // Initial values from localStorage
  const [googleAnalyticsId] = useState('');
  const [googleAnalyticsEnabled] = useState(false);
  
  const [fbPixelId] = useState(() => {
    try {
      const stored = localStorage.getItem('fb_pixel_id');
      return stored || '';
    } catch (error) {
      return '';
    }
  });
  
  const [fbPixelEnabled] = useState(() => {
    try {
      return localStorage.getItem('tracking_enabled') !== 'false';
    } catch (error) {
      return false;
    }
  });

  const [webhookUrl] = useState('');
  const [webhookEnabled] = useState(false);

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="analytics">Analytics Services</TabsTrigger>
          <TabsTrigger value="marketing">Marketing Platforms</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks & Custom</TabsTrigger>
        </TabsList>
        
        {/* Analytics Services Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <GoogleAnalyticsCard 
            initialId={googleAnalyticsId}
            initialEnabled={googleAnalyticsEnabled}
          />
        </TabsContent>
        
        {/* Marketing Platforms Tab */}
        <TabsContent value="marketing" className="space-y-6">
          <FacebookPixelCard 
            initialId={fbPixelId}
            initialEnabled={fbPixelEnabled}
          />
          <MarketingPlatformsCard />
        </TabsContent>
        
        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-6">
          <WebhookCard 
            initialUrl={webhookUrl}
            initialEnabled={webhookEnabled}
          />
          <ApiTokensCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};
