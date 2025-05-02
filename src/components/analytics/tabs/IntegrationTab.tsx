
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FacebookPixelCard } from '@/components/analytics/integrations/FacebookPixelCard';
import { GoogleAnalyticsCard } from '@/components/analytics/integrations/GoogleAnalyticsCard';
import { ApiTokensCard } from '@/components/analytics/integrations/ApiTokensCard';
import { WebhookCard } from '@/components/analytics/integrations/WebhookCard';
import { MarketingPlatformsCard } from '@/components/analytics/integrations/MarketingPlatformsCard';

interface IntegrationTabProps {
  analyticsData: any;
  testFunction: () => boolean;
}

export const IntegrationTab: React.FC<IntegrationTabProps> = ({
  analyticsData,
  testFunction
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações e Conexões</CardTitle>
          <CardDescription>
            Conecte seus dados a outras plataformas e serviços
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tracking" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
              <TabsTrigger value="tracking">Pixels</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="marketing">Marketing</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tracking">
              <div className="space-y-4">
                <FacebookPixelCard testFunction={testFunction} />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="space-y-4">
                <GoogleAnalyticsCard />
              </div>
            </TabsContent>
            
            <TabsContent value="marketing">
              <div className="space-y-4">
                <MarketingPlatformsCard />
              </div>
            </TabsContent>
            
            <TabsContent value="api">
              <div className="space-y-4">
                <ApiTokensCard />
              </div>
            </TabsContent>
            
            <TabsContent value="webhooks">
              <div className="space-y-4">
                <WebhookCard />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
