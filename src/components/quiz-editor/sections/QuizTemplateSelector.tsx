
import React from 'react';
import TemplateSelector from '../TemplateSelector';
import { QuizTemplate } from '@/types/quizTemplate';
import { toast } from '@/components/ui/use-toast';
import { getTemplateById } from '@/services/templates/templateService';

interface QuizTemplateSelectorProps {
  onSelectTemplate: (template: QuizTemplate) => void;
}

const QuizTemplateSelector: React.FC<QuizTemplateSelectorProps> = ({
  onSelectTemplate
}) => {
  const handleSelectTemplate = async (templateId: string) => {
    try {
      const template = await getTemplateById(templateId);
      if (template) {
        onSelectTemplate(template);
      }
    } catch (error) {
      console.error('Error loading template:', error);
      toast({
        title: 'Erro ao carregar modelo',
        description: 'Não foi possível carregar o modelo selecionado',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm h-full p-6">
      <TemplateSelector onSelectTemplate={handleSelectTemplate} />
    </div>
  );
};

export default QuizTemplateSelector;
