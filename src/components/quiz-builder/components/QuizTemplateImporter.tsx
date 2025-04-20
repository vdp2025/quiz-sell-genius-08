
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, CheckCircle } from 'lucide-react';
import { QuizBuilderState } from '@/types/quizBuilder';
import { strategicQuestionsTemplate } from '@/services/templates/strategicQuestionsTemplate';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';

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
      id: 'style-quiz',
      title: 'Quiz de Estilo',
      description: 'Quiz para identificar o estilo pessoal predominante do participante.',
      features: [
        'Identificação de estilo pessoal',
        'Opções com imagens e texto',
        'Resultado com estilo predominante e estilos secundários'
      ],
      template: styleQuizTemplate
    },
    {
      id: 'strategic-questions',
      title: 'Perguntas Estratégicas',
      description: 'Faça perguntas para entender melhor as necessidades do seu cliente.',
      features: [
        'Perguntas de autopercepção',
        'Experiência com estilo',
        'Intenção de compra',
        'Resultados desejados'
      ],
      template: strategicQuestionsTemplate
    }
  ];

  const handleImport = (template: QuizBuilderState) => {
    onImportTemplate(template);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Escolha um Modelo de Quiz</DialogTitle>
          <DialogDescription>
            Selecione um modelo para começar rapidamente ou como base para personalização.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
          {templates.map((template) => (
            <Card key={template.id} className="border border-[#B89B7A]/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-playfair text-[#432818]">{template.title}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-[#B89B7A] mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleImport(template.template)}
                  className="w-full bg-[#B89B7A] hover:bg-[#9F836A]"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Usar este modelo
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
