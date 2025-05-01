
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
