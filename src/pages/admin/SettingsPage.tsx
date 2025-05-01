
import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const SettingsPage = () => {
  const { globalStyles, updateGlobalStyles } = useGlobalStyles();
  const [pixelId, setPixelId] = useState(() => {
    try {
      // Try to extract the Pixel ID from an inline script in index.html
      const scriptContent = document.querySelector('script:not([src])')?.textContent || '';
      const match = scriptContent.match(/fbq\('init', ['"]([^'"]+)['"]\)/);
      return match?.[1] || '123456789012345';
    } catch (error) {
      console.error('Error extracting Pixel ID:', error);
      return '123456789012345';
    }
  });
  const [trackingEnabled, setTrackingEnabled] = useState(true);
  
  // New states for API Integration
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState(() => {
    return localStorage.getItem('ga_id') || '';
  });
  const [googleAnalyticsEnabled, setGoogleAnalyticsEnabled] = useState(() => {
    return localStorage.getItem('ga_enabled') !== 'false';
  });
  
  const [webhookUrl, setWebhookUrl] = useState(() => {
    return localStorage.getItem('webhook_url') || '';
  });
  const [webhookEnabled, setWebhookEnabled] = useState(() => {
    return localStorage.getItem('webhook_enabled') === 'true';
  });

  const handleSavePixelSettings = () => {
    // In a real application, this would save to a backend
    // Here we're just simulating with localStorage
    localStorage.setItem('fb_pixel_id', pixelId);
    localStorage.setItem('tracking_enabled', String(trackingEnabled));
    
    toast({
      title: "Settings saved",
      description: "Pixel settings have been updated successfully.",
    });
  };
  
  const handleSaveGoogleAnalytics = () => {
    localStorage.setItem('ga_id', googleAnalyticsId);
    localStorage.setItem('ga_enabled', String(googleAnalyticsEnabled));
    
    toast({
      title: "Settings saved",
      description: "Google Analytics settings have been updated successfully.",
    });
  };
  
  const handleSaveWebhook = () => {
    localStorage.setItem('webhook_url', webhookUrl);
    localStorage.setItem('webhook_enabled', String(webhookEnabled));
    
    toast({
      title: "Settings saved",
      description: "Webhook settings have been updated successfully.",
    });
  };
  
  const handleTestConnection = (service: string) => {
    toast({
      title: `Testing ${service} connection`,
      description: "Connection test initiated. Please check the console for results."
    });
    console.log(`Testing connection to ${service}...`);
  };

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
            <Card>
              <CardHeader>
                <CardTitle>Global Appearance</CardTitle>
                <CardDescription>
                  Customize the global appearance of your site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <Input 
                    id="backgroundColor" 
                    type="color" 
                    value={globalStyles.backgroundColor || '#fff'} 
                    onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                    className="h-10 w-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <Input 
                    id="textColor" 
                    type="color" 
                    value={globalStyles.textColor || '#432818'} 
                    onChange={(e) => updateGlobalStyles({ textColor: e.target.value })}
                    className="h-10 w-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo</Label>
                  <ImageUploader 
                    currentImage={globalStyles.logo}
                    onImageUpload={(url) => updateGlobalStyles({ logo: url })}
                  />
                </div>
                
                <Button 
                  className="bg-[#B89B7A] hover:bg-[#A38A69]"
                  onClick={() => {
                    toast({
                      title: "Settings saved",
                      description: "Appearance settings have been updated successfully."
                    });
                  }}
                >
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Google Analytics</CardTitle>
                <CardDescription>
                  Configure Google Analytics integration
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
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
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleTestConnection('Google Analytics')}
                  >
                    Test Connection
                  </Button>
                  
                  <Button 
                    className="bg-[#B89B7A] hover:bg-[#A38A69]"
                    onClick={handleSaveGoogleAnalytics}
                  >
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Webhook Integration</CardTitle>
                <CardDescription>
                  Configure webhook for event notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://your-api.com/webhook" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    Enter the URL that should receive webhook notifications
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="webhook-enabled"
                    checked={webhookEnabled}
                    onCheckedChange={setWebhookEnabled}
                  />
                  <Label htmlFor="webhook-enabled">Enable webhook notifications</Label>
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleTestConnection('Webhook')}
                  >
                    Test Webhook
                  </Button>
                  
                  <Button 
                    className="bg-[#B89B7A] hover:bg-[#A38A69]"
                    onClick={handleSaveWebhook}
                  >
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Tokens</CardTitle>
                <CardDescription>
                  Manage API tokens for your application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  API tokens allow external services to access your application's data.
                </p>
                <Button variant="outline">Generate New API Token</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Facebook Pixel Configuration</CardTitle>
                <CardDescription>Configure event tracking on Facebook</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pixelId">Facebook Pixel ID</Label>
                  <Input 
                    id="pixelId" 
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    placeholder="e.g. 123456789012345"
                  />
                  <p className="text-sm text-muted-foreground">
                    You can find your Pixel ID in Facebook Events Manager &gt; Settings &gt; Facebook Pixel.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="trackingEnabled"
                    checked={trackingEnabled}
                    onCheckedChange={setTrackingEnabled}
                  />
                  <Label htmlFor="trackingEnabled">Enable event tracking</Label>
                </div>
                
                <Button 
                  className="bg-[#B89B7A] hover:bg-[#A38A69]"
                  onClick={handleSavePixelSettings}
                >
                  Save Pixel Settings
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>View metrics and quiz performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  Use the analytics dashboard to track important metrics such as conversions, 
                  completion rates, and conversion funnel.
                </p>
                
                <Button asChild>
                  <Link to="/admin/analytics">
                    View Analytics Dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="marketing" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>UTM Configuration</CardTitle>
                <CardDescription>Configure UTM parameter tracking</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  UTM parameters help track the effectiveness of your marketing campaigns.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label className="text-base">Default UTM Sources</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      These sources are automatically tracked when present in URLs.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="utm-google" defaultChecked={true} />
                        <Label htmlFor="utm-google">Google (utm_source=google)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="utm-facebook" defaultChecked={true} />
                        <Label htmlFor="utm-facebook">Facebook (utm_source=facebook)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="utm-instagram" defaultChecked={true} />
                        <Label htmlFor="utm-instagram">Instagram (utm_source=instagram)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="utm-email" defaultChecked={true} />
                        <Label htmlFor="utm-email">Email (utm_source=email)</Label>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <Label className="text-base">Analytics Integration</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="utm-to-ga" defaultChecked={true} />
                      <Label htmlFor="utm-to-ga">Send UTM data to Google Analytics</Label>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <Switch id="utm-to-fb" defaultChecked={true} />
                      <Label htmlFor="utm-to-fb">Send UTM data to Facebook Pixel</Label>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-4 bg-[#B89B7A] hover:bg-[#A38A69]">
                  Save UTM Settings
                </Button>
                
                <div className="mt-6">
                  <Button variant="outline" asChild>
                    <Link to="/admin/analytics?tab=utm">
                      View UTM Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Settings</CardTitle>
                <CardDescription>
                  Options for experienced users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Coming soon: advanced settings such as SEO, Google Analytics, etc.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
