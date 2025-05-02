
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { testFacebookPixel } from '@/utils/analytics';

interface FacebookPixelCardProps {
  initialId?: string;
  initialEnabled?: boolean;
}

export const FacebookPixelCard: React.FC<FacebookPixelCardProps> = ({
  initialId = '',
  initialEnabled = false
}) => {
  const [fbPixelId, setFbPixelId] = useState(() => {
    try {
      return localStorage.getItem('fb_pixel_id') || initialId || '1311550759901086';
    } catch (e) {
      return initialId || '1311550759901086';
    }
  });
  
  const [fbPixelEnabled, setFbPixelEnabled] = useState(() => {
    try {
      const stored = localStorage.getItem('tracking_enabled');
      return stored !== null ? stored === 'true' : initialEnabled;
    } catch (e) {
      return initialEnabled;
    }
  });
  
  const [fbAccessToken, setFbAccessToken] = useState(() => {
    try {
      return localStorage.getItem('fb_access_token') || '';
    } catch (e) {
      return '';
    }
  });
  
  // Carregar as configurações do localStorage ao montar o componente
  useEffect(() => {
    try {
      const storedId = localStorage.getItem('fb_pixel_id');
      const storedEnabled = localStorage.getItem('tracking_enabled');
      const storedToken = localStorage.getItem('fb_access_token');
      
      if (storedId) setFbPixelId(storedId);
      if (storedEnabled !== null) setFbPixelEnabled(storedEnabled === 'true');
      if (storedToken) setFbAccessToken(storedToken);
    } catch (error) {
      console.error('Error loading Facebook Pixel settings:', error);
    }
  }, []);

  const handleSaveFacebookPixel = () => {
    try {
      localStorage.setItem('fb_pixel_id', fbPixelId);
      localStorage.setItem('tracking_enabled', String(fbPixelEnabled));
      localStorage.setItem('fb_access_token', fbAccessToken);
      
      toast({
        title: "Facebook Pixel settings saved",
        description: "Your Facebook Pixel integration settings have been updated. Refresh the page for changes to take effect.",
        duration: 5000
      });
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "There was an error saving your settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleTestConnection = () => {
    toast({
      title: "Testing Facebook Pixel connection",
      description: "Connection test initiated. Check the browser console for results."
    });
    
    const result = testFacebookPixel();
    
    setTimeout(() => {
      toast({
        title: result ? "Test successful" : "Test failed",
        description: result 
          ? "Facebook Pixel test event was sent successfully." 
          : "Facebook Pixel test failed. Please check your settings and browser console.",
        variant: result ? "default" : "destructive"
      });
    }, 1500);
  };
  
  return (
    <Card className="border-border/40 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Facebook Pixel</CardTitle>
            <CardDescription className="text-xs mt-0.5">Connect to Facebook Ads platform to track conversions</CardDescription>
          </div>
          <Badge variant={fbPixelEnabled ? "default" : "outline"} className="text-xs">
            {fbPixelEnabled ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 py-0">
        <div className="space-y-1.5">
          <Label htmlFor="fb-pixel-id" className="text-sm">Facebook Pixel ID</Label>
          <Input 
            id="fb-pixel-id" 
            placeholder="123456789012345" 
            value={fbPixelId}
            onChange={(e) => setFbPixelId(e.target.value)}
            className="h-8 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Found in Facebook Events Manager {'>'}  Data Sources {'>'}  Pixel
          </p>
        </div>
        
        <div className="space-y-1.5">
          <Label htmlFor="fb-access-token" className="text-sm">Access Token (optional)</Label>
          <Input 
            id="fb-access-token" 
            type="password"
            placeholder="EAAEJYWeJHLABO..." 
            value={fbAccessToken}
            onChange={(e) => setFbAccessToken(e.target.value)}
            className="h-8 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            Required for advanced conversion tracking
          </p>
        </div>
        
        <div className="flex items-center space-x-2 pt-1">
          <Switch 
            id="fb-tracking"
            checked={fbPixelEnabled}
            onCheckedChange={setFbPixelEnabled}
            className="data-[state=checked]:bg-blue-600"
          />
          <Label htmlFor="fb-tracking" className="text-sm">Enable Facebook Pixel tracking</Label>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" onClick={handleTestConnection} className="text-xs h-7">
          Test Connection
        </Button>
        <Button size="sm" onClick={handleSaveFacebookPixel} className="text-xs h-7">
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};
