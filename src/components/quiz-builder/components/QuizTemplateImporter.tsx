
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';
import { styleQuizTemplate2 } from '@/services/templates/styleQuizTemplate2';
import { QuizBuilderState } from '@/types/quizBuilder';

interface QuizTemplateImporterProps {
  isOpen: boolean;
  onClose: () => void;
  onImportTemplate: (template: QuizBuilderState) => void;
}

const QuizTemplateImporter: React.FC<QuizTemplateImporterProps> = ({
  isOpen,
  onClose,
  onImportTemplate
}) => {
  const templates = [
    {
      id: 'style-quiz-1',
      title: 'Quiz de Estilo Pessoal',
      description: 'Template padrão com perguntas sobre preferências de estilo e personalidade.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
      template: styleQuizTemplate
    },
    {
      id: 'style-quiz-2',
      title: 'Quiz de Estilo Avançado',
      description: 'Template com questões de múltipla escolha e imagens para análise de estilo detalhada.',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp',
      template: styleQuizTemplate2
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-[#432818]">Importar Template de Quiz</DialogTitle>
          <DialogDescription>
            Escolha um dos templates pré-configurados para iniciar seu quiz ou continuar editando.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden border border-[#B89B7A]/30 hover:border-[#B89B7A] transition-all cursor-pointer">
              <div className="w-full h-48 overflow-hidden">
                <img src={template.image} alt={template.title} className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="font-playfair text-[#432818]">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
                  onClick={() => {
                    onImportTemplate(template.template);
                    onClose();
                  }}
                >
                  Selecionar Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTemplateImporter;
