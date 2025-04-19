
import { useState, useCallback } from 'react';
import { EditableContent } from '@/types/editor';
import { blockTemplates } from '@/utils/blockTemplates';
import { toast } from '@/components/ui/use-toast';

export const useTemplateSelection = (onUpdate: (id: string, content: EditableContent) => void) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const handleApplyTemplate = useCallback((templateId: string, blockId: string) => {
    const template = blockTemplates.find(t => t.id === templateId);
    if (template) {
      onUpdate(blockId, template.content);
      toast({
        title: "Template aplicado",
        description: "O template foi aplicado com sucesso ao bloco.",
      });
    } else {
      toast({
        title: "Erro ao aplicar template",
        description: "O template selecionado não foi encontrado.",
        variant: "destructive"
      });
    }
  }, [onUpdate]);

  return {
    selectedTemplateId,
    setSelectedTemplateId,
    handleApplyTemplate
  };
};
