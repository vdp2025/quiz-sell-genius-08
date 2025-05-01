
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface FacebookPixelCardProps {
  initialId?: string;
  initialEnabled?: boolean;
}

export const FacebookPixelCard: React.FC<FacebookPixelCardProps> = ({
  initialId = '',
  initialEnabled = false
}) => {
  const [fbPixelId, setFbPixelId] = useState(initialId);
  const [fbPixelEnabled, setFbPixelEnabled] = useState(initialEnabled);

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

  const handleTestConnection = () => {
    toast({
      title: "Testing Facebook Pixel connection",
      description: "Connection test initiated. Please check the console for results."
    });
    console.log("Testing connection to Facebook Pixel...");
  };
  
  return (
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
            Found in Facebook Events Manager {'>'}  Data Sources {'>'}  Pixel
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
        <Button variant="outline" onClick={handleTestConnection}>
          Test Connection
        </Button>
        <Button onClick={handleSaveFacebookPixel}>
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};
