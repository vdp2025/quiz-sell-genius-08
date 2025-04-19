
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { giseleStyleTemplate } from '@/services/templates/giseleStyleTemplate';
import { useEditor } from '@/hooks/useEditor';
import { toast } from '@/components/ui/use-toast';

export const TemplateList = () => {
  const { config, updateConfig } = useEditor();

  const handleSelectTemplate = (template: any) => {
    try {
      updateConfig({
        ...config,
        blocks: template
      });
      
      toast({
        title: "Modelo aplicado",
        description: "O modelo foi aplicado com sucesso",
      });
    } catch (error) {
      console.error("Erro ao aplicar o modelo:", error);
      toast({
        title: "Erro ao aplicar modelo",
        description: "Não foi possível aplicar o modelo selecionado",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="grid gap-4">
      <Card className="p-4">
        <h3 className="text-lg font-medium mb-2 text-[#432818]">Modelo de Página - Estilo Gisele Galvão</h3>
        <p className="text-[#8F7A6A] mb-4">Página de vendas otimizada com design exclusivo e elementos estratégicos.</p>
        <Button 
          onClick={() => handleSelectTemplate(giseleStyleTemplate)}
          className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
        >
          Usar este modelo
        </Button>
      </Card>
    </div>
  );
};
