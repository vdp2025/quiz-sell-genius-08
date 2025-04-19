
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizTemplate, QuizTemplatePreview } from '@/types/quizTemplate';
import { getTemplates } from '@/services/templates/templateService';
import { Button } from '@/components/ui/button';

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const [templates, setTemplates] = useState<QuizTemplatePreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const allTemplates = await getTemplates();
        setTemplates(allTemplates);
      } catch (error) {
        console.error('Error fetching templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-[#8F7A6A]">Carregando modelos...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair text-[#432818]">Selecione um Modelo de Quiz</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map(template => (
          <Card 
            key={template.id}
            className="hover:shadow-md transition-shadow cursor-pointer border-[#B89B7A]/20"
            onClick={() => onSelectTemplate(template.id)}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-[#432818]">{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-[#8F7A6A] text-sm mb-4">{template.description || 'Modelo de quiz padrão'}</p>
              <p className="text-xs text-[#8F7A6A]">
                {template.questionCount} perguntas • 
                Atualizado em {new Date(template.updatedAt).toLocaleDateString('pt-BR')}
              </p>
            </CardContent>
          </Card>
        ))}
        
        {templates.length === 0 && (
          <Card className="col-span-2 p-6 text-center">
            <p className="text-[#8F7A6A] mb-4">Nenhum modelo encontrado.</p>
            <Button 
              onClick={() => onSelectTemplate('create-new')}
              className="bg-[#B89B7A] hover:bg-[#A38A69]"
            >
              Criar Novo Modelo
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TemplateSelector;
