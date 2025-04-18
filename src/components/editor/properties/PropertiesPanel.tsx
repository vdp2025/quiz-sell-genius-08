
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PropertiesPanelProps {
  selectedComponentId: string | null;
  onClose: () => void;
}

const PropertiesPanel = ({ selectedComponentId, onClose }: PropertiesPanelProps) => {
  if (!selectedComponentId) {
    return (
      <div className="h-full p-4 bg-white">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center h-64 text-[#8F7A6A] text-sm">
          <p>Selecione um componente para editar suas propriedades</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 bg-white">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-lg font-playfair text-[#432818]">Propriedades</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-[#8F7A6A]">
          Editando componente: {selectedComponentId}
        </p>
        
        {/* Here you would render different property editors based on the component type */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-[#432818] block mb-1">
              Título
            </label>
            <input 
              type="text" 
              className="w-full border border-[#B89B7A]/30 rounded-md p-2 text-sm" 
              placeholder="Insira um título"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#432818] block mb-1">
              Alinhamento
            </label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                Esquerda
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Centro
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                Direita
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
