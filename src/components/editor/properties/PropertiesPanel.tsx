
import React from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
}

const PropertiesPanel = ({ selectedComponentId, onClose }: PropertiesPanelProps) => {
  if (!selectedComponentId) {
    return (
      <div className="p-4 text-center text-[#8F7A6A]">
        Selecione um componente para editar
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

      <Card className="p-4 space-y-4">
        <div>
          <label className="text-sm text-[#432818] mb-2 block">
            Título
          </label>
          <Input 
            placeholder="Digite o título..." 
            className="border-[#B89B7A]/20"
          />
        </div>

        <div>
          <label className="text-sm text-[#432818] mb-2 block">
            Conteúdo
          </label>
          <Textarea 
            placeholder="Digite o conteúdo..." 
            className="border-[#B89B7A]/20"
          />
        </div>

        <div>
          <label className="text-sm text-[#432818] mb-2 block">
            Alinhamento
          </label>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Esquerda</Button>
            <Button variant="outline" size="sm">Centro</Button>
            <Button variant="outline" size="sm">Direita</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PropertiesPanel;
