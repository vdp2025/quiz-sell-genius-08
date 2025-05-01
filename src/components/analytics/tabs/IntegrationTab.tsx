
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

export const IntegrationTab: React.FC = () => {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');
  const [googleAnalyticsEnabled, setGoogleAnalyticsEnabled] = useState(false);
  
  const [fbPixelId, setFbPixelId] = useState(() => {
    try {
      const stored = localStorage.getItem('fb_pixel_id');
      return stored || '';
    } catch (error) {
      return '';
    }
  });
  const [fbPixelEnabled, setFbPixelEnabled] = useState(() => {
    try {
      return localStorage.getItem('tracking_enabled') !== 'false';
    } catch (error) {
      return false;
    }
  });

  const [webhookUrl, setWebhookUrl] = useState('');
  const [webhookEnabled, setWebhookEnabled] = useState(false);
  
  const handleSaveGoogleAnalytics = () => {
    try {
      localStorage.setItem('ga_id', googleAnalyticsId);
      localStorage.setItem('ga_enabled', String(googleAnalyticsEnabled));
      toast({
        title: "Google Analytics settings saved",
        description: "Your Google Analytics integration settings have been updated."
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSaveFacebookPixel = () => {
    try {
      localStorage.setItem('fb_pixel_id', fbPixelId);
      localStorage.setItem('tracking_enabled', String(fbPixelEnabled));
      toast({
        title: "Facebook Pixel settings saved",
        description: "Your Facebook Pixel integration settings have been updated."
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleSaveWebhook = () => {
    try {
      localStorage.setItem('webhook_url', webhookUrl);
      localStorage.setItem('webhook_enabled', String(webhookEnabled));
      toast({
        title: "Webhook settings saved",
        description: "Your webhook integration settings have been updated."
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTestConnection = (service: string) => {
    toast({
      title: `Testing ${service} connection`,
      description: "Connection test initiated. Please check the console for results."
    });
    console.log(`Testing connection to ${service}...`);
  };

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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Google Analytics</CardTitle>
                  <CardDescription>Connect your Google Analytics account to track user behavior</CardDescription>
                </div>
                <Badge variant={googleAnalyticsEnabled ? "default" : "outline"}>
                  {googleAnalyticsEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ga-id">Measurement ID</Label>
                <Input 
                  id="ga-id" 
                  placeholder="G-XXXXXXXXXX" 
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Found in your Google Analytics property settings under "Data Streams"
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="ga-tracking"
                  checked={googleAnalyticsEnabled}
                  onCheckedChange={setGoogleAnalyticsEnabled}
                />
                <Label htmlFor="ga-tracking">Enable Google Analytics tracking</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleTestConnection('Google Analytics')}>
                Test Connection
              </Button>
              <Button onClick={handleSaveGoogleAnalytics}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Marketing Platforms Tab */}
        <TabsContent value="marketing" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Facebook Pixel</CardTitle>
                  <CardDescription>Connect to Facebook Ads platform to track conversions</CardDescription>
                </div>
                <Badge variant={fbPixelEnabled ? "default" : "outline"}>
                  {fbPixelEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
                <Input 
                  id="fb-pixel-id" 
                  placeholder="123456789012345" 
                  value={fbPixelId}
                  onChange={(e) => setFbPixelId(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Found in Facebook Events Manager > Data Sources > Pixel
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="fb-tracking"
                  checked={fbPixelEnabled}
                  onCheckedChange={setFbPixelEnabled}
                />
                <Label htmlFor="fb-tracking">Enable Facebook Pixel tracking</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleTestConnection('Facebook Pixel')}>
                Test Connection
              </Button>
              <Button onClick={handleSaveFacebookPixel}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>More Marketing Platforms</CardTitle>
              <CardDescription>Connect additional marketing and advertising platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Google Ads, TikTok Pixel, LinkedIn Insight Tag, and other platform integrations coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Custom Webhook</CardTitle>
                  <CardDescription>Send analytics events to your own endpoint</CardDescription>
                </div>
                <Badge variant={webhookEnabled ? "default" : "outline"}>
                  {webhookEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input 
                  id="webhook-url" 
                  placeholder="https://your-api.com/analytics-webhook" 
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Your endpoint that will receive analytics events
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="webhook-enabled"
                  checked={webhookEnabled}
                  onCheckedChange={setWebhookEnabled}
                />
                <Label htmlFor="webhook-enabled">Enable webhook</Label>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleTestConnection('Webhook')}>
                Test Webhook
              </Button>
              <Button onClick={handleSaveWebhook}>
                Save Settings
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Tokens</CardTitle>
              <CardDescription>Manage API tokens for direct access to analytics data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground mb-2">
                Create and manage API tokens to access your analytics data programmatically.
              </p>
              <Button variant="outline">
                Generate New API Token
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
