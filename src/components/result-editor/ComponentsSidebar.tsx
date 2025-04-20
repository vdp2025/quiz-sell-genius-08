
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Image, 
  ListChecks, 
  Tag, 
  Palette, 
  ShieldCheck,
  Layout, 
  Sparkles 
} from 'lucide-react';

interface ComponentsSidebarProps {
  onComponentSelect: (type: string) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ 
  onComponentSelect 
}) => {
  return (
    <div className="h-full bg-white border-r border-[#B89B7A]/20 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#432818] mb-2">Componentes</h2>
        <p className="text-[#8F7A6A] text-sm mb-4">
          Arraste e solte ou clique para adicionar
        </p>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-[#432818] mb-2">Básicos</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('header')}
              >
                <Type className="w-4 h-4 mr-2" />
                Cabeçalho
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('headline')}
              >
                <Type className="w-4 h-4 mr-2" />
                Título
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('text')}
              >
                <Type className="w-4 h-4 mr-2" />
                Texto
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('image')}
              >
                <Image className="w-4 h-4 mr-2" />
                Imagem
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-[#432818] mb-2">Resultados</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('style-result')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Estilo
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('benefits')}
              >
                <ListChecks className="w-4 h-4 mr-2" />
                Benefícios
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium text-[#432818] mb-2">Venda</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('pricing')}
              >
                <Tag className="w-4 h-4 mr-2" />
                Preço
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="justify-start border-[#B89B7A]/30 hover:bg-[#FAF9F7]"
                onClick={() => onComponentSelect('guarantee')}
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Garantia
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
