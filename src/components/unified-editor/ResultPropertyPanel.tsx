
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Trash, ImagePlus } from 'lucide-react';

interface ResultPropertyPanelProps {
  resultSettings: any;
  activeBlockId: string | null;
  onUpdateSettings: (settings: any) => void;
}

const ResultPropertyPanel: React.FC<ResultPropertyPanelProps> = ({
  resultSettings,
  activeBlockId,
  onUpdateSettings
}) => {
  if (!activeBlockId) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">Selecione um bloco para editar suas propriedades</p>
      </div>
    );
  }

  // Different panel content based on the selected block
  const renderBlockProperties = () => {
    switch (activeBlockId) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="header-title">Título</Label>
              <Input 
                id="header-title" 
                defaultValue="Seu Resultado de Estilo Pessoal" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="header-description">Descrição</Label>
              <Textarea 
                id="header-description" 
                defaultValue="Com base nas suas respostas, identificamos seu estilo predominante e suas influências secundárias." 
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="header-alignment">Alinhamento</Label>
              <Select defaultValue="center">
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Alinhamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Esquerda</SelectItem>
                  <SelectItem value="center">Centro</SelectItem>
                  <SelectItem value="right">Direita</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch id="header-visible" defaultChecked={true} />
              <Label htmlFor="header-visible">Exibir cabeçalho</Label>
            </div>
          </div>
        );
        
      case 'primary-style':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="style-title">Título da Seção</Label>
              <Input 
                id="style-title" 
                defaultValue="Seu estilo predominante é" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="style-description">Descrição Personalizada</Label>
              <Textarea 
                id="style-description" 
                defaultValue="O estilo Elegante é caracterizado por peças sofisticadas e com caimento impecável..." 
                className="mt-1"
                rows={5}
              />
            </div>
            
            <div>
              <Label className="mb-1 block">Imagem do Estilo</Label>
              <div className="border rounded-md p-4 text-center">
                <div className="mb-3">
                  <div className="w-40 h-40 mx-auto bg-gray-100 rounded-md flex items-center justify-center">
                    <ImagePlus className="text-gray-400" />
                  </div>
                </div>
                <Button variant="outline" size="sm">Escolher imagem</Button>
              </div>
            </div>
            
            <Tabs defaultValue="characteristics">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="characteristics">Características</TabsTrigger>
                <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
              </TabsList>
              
              <TabsContent value="characteristics">
                <div className="space-y-2 mt-2">
                  <Textarea 
                    placeholder="Adicione as características do estilo, uma por linha"
                    defaultValue="Peças bem estruturadas com caimento impecável\nCores neutras e sóbrias\nTecidos de alta qualidade\nAcessórios refinados e discretos"
                    rows={5}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations">
                <div className="space-y-2 mt-2">
                  <Textarea 
                    placeholder="Adicione recomendações para este estilo, uma por linha"
                    defaultValue="Invista em peças de qualidade e corte impecável\nPrefira tecidos nobres como seda, cashmere e lã\nEscolha cores neutras e combinações monocromáticas\nOpte por acessórios discretos, mas de qualidade"
                    rows={5}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        );
        
      case 'product-offer':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="offer-title">Título da Oferta</Label>
              <Input 
                id="offer-title" 
                defaultValue="Aprimore seu estilo com consultoria especializada" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="product-name">Nome do Produto</Label>
              <Input 
                id="product-name" 
                defaultValue="Consultoria de Imagem" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="product-description">Descrição do Produto</Label>
              <Textarea 
                id="product-description" 
                defaultValue="Uma consultoria personalizada para ajudar você a potencializar seu estilo e integrar elementos dos seus estilos secundários de forma harmoniosa." 
                className="mt-1"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="product-price">Preço</Label>
                <Input 
                  id="product-price" 
                  defaultValue="497,00" 
                  className="mt-1" 
                />
              </div>
              
              <div>
                <Label htmlFor="product-installments">Parcelamento</Label>
                <Input 
                  id="product-installments" 
                  defaultValue="12x de R$ 49,90" 
                  className="mt-1" 
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="cta-text">Texto do Botão</Label>
              <Input 
                id="cta-text" 
                defaultValue="Quero aprimorar meu estilo" 
                className="mt-1" 
              />
            </div>
            
            <div>
              <Label htmlFor="cta-url">Link do Botão</Label>
              <Input 
                id="cta-url" 
                defaultValue="https://checkout.example.com/product/123" 
                className="mt-1" 
                placeholder="URL da página de checkout"
              />
            </div>
            
            <div>
              <Label className="mb-1 block">Imagem do Produto</Label>
              <div className="border rounded-md p-4 text-center">
                <div className="mb-3">
                  <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                    <ImagePlus className="text-gray-400" />
                  </div>
                </div>
                <Button variant="outline" size="sm">Escolher imagem</Button>
              </div>
            </div>
          </div>
        );
          
      default:
        return (
          <div className="p-4 text-center">
            <p className="text-gray-500">Propriedades do bloco "{activeBlockId}"</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        {renderBlockProperties()}
        
        {/* Common actions for all blocks */}
        <div className="pt-6 border-t mt-6">
          <Button variant="destructive" className="w-full">
            <Trash className="w-4 h-4 mr-2" />
            Remover Bloco
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPropertyPanel;
