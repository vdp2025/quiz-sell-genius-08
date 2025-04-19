
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { defaultTemplate } from '@/services/templates/defaultTemplate';
import { ResultPageConfig } from '@/types/resultPageConfig';

interface TemplateSelectorProps {
  onTemplateSelect: (template: ResultPageConfig) => void;
  currentStyle: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect,
  currentStyle
}) => {
  const handleTemplateSelect = (templateId: string) => {
    let selectedTemplate = { ...defaultTemplate, styleType: currentStyle };
    onTemplateSelect(selectedTemplate);
  };

  return (
    <div className="p-4 border-b bg-white">
      <div className="flex items-center gap-4">
        <Select onValueChange={handleTemplateSelect}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um modelo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Modelo Padrão</SelectItem>
            <SelectItem value="minimal">Minimalista</SelectItem>
            <SelectItem value="sales">Página de Vendas</SelectItem>
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          onClick={() => handleTemplateSelect('default')}
        >
          Visualizar Modelo
        </Button>
      </div>
    </div>
  );
};
