
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { X, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from 'lucide-react';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
}

const PropertiesPanel = ({ selectedComponentId, onClose }: PropertiesPanelProps) => {
  if (!selectedComponentId) {
    return (
      <div className="p-4 text-center text-[#8F7A6A]">
        Selecione um componente para editar suas propriedades
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="content">Conteúdo</TabsTrigger>
          <TabsTrigger value="style">Estilo</TabsTrigger>
          <TabsTrigger value="layout">Layout</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Título</Label>
                <Input placeholder="Digite o título..." />
              </div>
              <div>
                <Label>Conteúdo</Label>
                <Textarea placeholder="Digite o conteúdo..." className="h-32" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="style" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Formatação de Texto</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="icon">
                    <Bold className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Italic className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Underline className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Cor do Texto</Label>
                <Input type="color" className="h-10 w-full" />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="layout" className="space-y-4">
          <Card className="p-4">
            <div className="space-y-4">
              <div>
                <Label>Alinhamento</Label>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="icon">
                    <AlignLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <AlignCenter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <AlignRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Espaçamento</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <Input placeholder="Margem (px)" type="number" />
                  <Input placeholder="Padding (px)" type="number" />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PropertiesPanel;
