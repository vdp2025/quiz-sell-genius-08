
import { useState, useCallback } from 'react';
import { Block, EditableContent } from '@/types/editor';
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
    }
  }, [onUpdate]);

  return {
    selectedTemplateId,
    setSelectedTemplateId,
    handleApplyTemplate
  };
};
