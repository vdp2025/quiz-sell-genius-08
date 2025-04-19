
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { pageTemplate } from '@/services/templates/pageTemplate';

interface TemplateSelectorProps {
  onTemplateSelect: (template: any) => void;
  currentStyle: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  onTemplateSelect,
  currentStyle
}) => {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-4">
        <Select
          onValueChange={(value) => {
            if (value === 'default') {
              onTemplateSelect({
                ...pageTemplate,
                styleType: currentStyle
              });
            }
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Selecione um modelo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Modelo Padrão</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => onTemplateSelect(pageTemplate)}
        >
          Visualizar Modelo
        </Button>
      </div>
    </div>
  );
};
