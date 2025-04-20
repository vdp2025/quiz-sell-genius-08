
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { giseleStyleTemplate } from '@/services/templates/giseleStyleTemplate';
import { useEditor } from '@/hooks/useEditor';
import { toast } from '@/components/ui/use-toast';
import { useResultPageConfig } from '@/hooks/useResultPageConfig';

interface TemplateListProps {
  onSelectTemplate?: () => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({ onSelectTemplate }) => {
  const { config, setConfig } = useEditor();
  
  // Use the styleType from the current config or default to "Natural"
  const styleType = config?.styleType || "Natural";
  const { importConfig } = useResultPageConfig(styleType);

  const handleSelectTemplate = (template: any) => {
    try {
      if (importConfig) {
        importConfig(template);
      } else {
        setConfig({
          ...config,
          blocks: template.blocks || []
        });
      }
      
      toast({
        title: "Template aplicado",
        description: "O template foi aplicado com sucesso",
      });
      
      if (onSelectTemplate) {
        onSelectTemplate();
      }
    } catch (error) {
      console.error('Error applying template:', error);
      toast({
        title: "Erro ao aplicar template",
        description: "Ocorreu um erro ao aplicar o template",
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
