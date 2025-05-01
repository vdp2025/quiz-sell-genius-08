
import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGlobalStyles } from '@/hooks/useGlobalStyles';
import { ImageUploader } from '@/components/ui/image-uploader';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const SettingsPage = () => {
  const { globalStyles, updateGlobalStyles } = useGlobalStyles();

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-semibold text-[#432818] mb-6">Configurações</h1>
        
        <Tabs defaultValue="appearance">
          <TabsList>
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
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
