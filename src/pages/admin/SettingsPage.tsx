
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

const SettingsPage = () => {
  const { globalStyles, updateGlobalStyles } = useGlobalStyles();
  const [pixelId, setPixelId] = useState(() => {
    try {
      // Tentar extrair o ID do pixel do script inline em index.html
      const scriptContent = document.querySelector('script:not([src])')?.textContent || '';
      const match = scriptContent.match(/fbq\('init', ['"]([^'"]+)['"]\)/);
      return match?.[1] || '123456789012345';
    } catch (error) {
      console.error('Erro ao extrair ID do Pixel:', error);
      return '123456789012345';
    }
  });
  const [trackingEnabled, setTrackingEnabled] = useState(true);

  const handleSavePixelSettings = () => {
    // Em uma aplicação real, isso salvaria em um backend
    // Aqui apenas simulamos com localStorage
    localStorage.setItem('fb_pixel_id', pixelId);
    localStorage.setItem('tracking_enabled', String(trackingEnabled));
    
    toast({
      title: "Configurações salvas",
      description: "As configurações do pixel foram atualizadas com sucesso.",
    });
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">Configurações</h1>
        
        <Tabs defaultValue="appearance">
          <TabsList>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Aparência Global</CardTitle>
                <CardDescription>
                  Customize a aparência global do seu site
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Cor de Fundo</Label>
                  <Input 
                    id="backgroundColor" 
                    type="color" 
                    value={globalStyles.backgroundColor || '#fff'} 
                    onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                    className="h-10 w-20"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="textColor">Cor do Texto</Label>
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
                  onClick={() => alert('Configurações salvas!')}
                >
                  Salvar Configurações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Integrações</CardTitle>
                <CardDescription>
                  Configure integrações com serviços externos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Em breve: integrações com Hotmart, RD Station, etc.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-6">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Configuração do Facebook Pixel</CardTitle>
                <CardDescription>Configure o rastreamento de eventos no Facebook</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pixelId">Facebook Pixel ID</Label>
                  <Input 
                    id="pixelId" 
                    value={pixelId}
                    onChange={(e) => setPixelId(e.target.value)}
                    placeholder="Ex: 123456789012345"
                  />
                  <p className="text-sm text-gray-500">
                    Você pode encontrar o ID do seu Pixel em Eventos do Facebook &gt; Configurações &gt; Pixel do Facebook.
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="trackingEnabled"
                    checked={trackingEnabled}
                    onCheckedChange={setTrackingEnabled}
                  />
                  <Label htmlFor="trackingEnabled">Habilitar rastreamento de eventos</Label>
                </div>
                
                <Button 
                  className="bg-[#B89B7A] hover:bg-[#A38A69]"
                  onClick={handleSavePixelSettings}
                >
                  Salvar Configurações do Pixel
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Dashboard de Analytics</CardTitle>
                <CardDescription>Visualize métricas e desempenho do seu quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <p>
                  Utilize o dashboard de analytics para acompanhar métricas importantes como conversões, 
                  taxa de conclusão, e funil de conversão.
                </p>
                
                <Button asChild>
                  <Link to="/admin/analytics">
                    Ver Dashboard de Analytics
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="advanced">
            <Card>
              <CardHeader>
                <CardTitle>Configurações Avançadas</CardTitle>
                <CardDescription>
                  Opções avançadas para usuários experientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>Em breve: configurações avançadas como SEO, Google Analytics, etc.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
