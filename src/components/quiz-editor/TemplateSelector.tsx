
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import styleQuizTemplate from '@/services/templates/styleQuizTemplate';
import styleQuizTemplate2 from '@/services/templates/styleQuizTemplate2';

interface TemplateSelectorProps {
  onSelectTemplate: (templateId: string) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelectTemplate }) => {
  const templates = [
    {
      id: 'style-quiz-template',
      name: 'Quiz de Estilo',
      description: 'Template básico para quiz de estilo com 10 perguntas',
      image: '/template-thumbnails/style-quiz.jpg',
      template: styleQuizTemplate
    },
    {
      id: 'style-quiz-template-2',
      name: 'Quiz de Estilo Simplificado',
      description: 'Template simplificado para quiz de estilo com 2 perguntas',
      image: '/template-thumbnails/style-quiz-2.jpg',
      template: styleQuizTemplate2
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair text-[#432818]">Selecione um Template</h2>
      <p className="text-[#1A1818]/70">
        Escolha um template para começar a editar seu quiz. Você poderá personalizar todas as perguntas e opções.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {templates.map((template) => (
          <Card 
            key={template.id}
            className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelectTemplate(template.id)}
          >
            <div className="p-4 flex flex-col h-full">
              <div className="bg-[#FAF9F7] aspect-video rounded-md flex items-center justify-center mb-4">
                {template.image ? (
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="object-cover w-full h-full rounded-md"
                  />
                ) : (
                  <div className="text-[#B89B7A]">{template.name}</div>
                )}
              </div>
              
              <h3 className="text-lg font-medium text-[#432818] mb-2">{template.name}</h3>
              <p className="text-[#1A1818]/70 text-sm mb-4 flex-1">{template.description}</p>
              
              <Button 
                className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A]"
                onClick={() => onSelectTemplate(template.id)}
              >
                Selecionar Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
