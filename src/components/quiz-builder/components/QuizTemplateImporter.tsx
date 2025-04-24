
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { QuizBuilderState } from '@/types/quizBuilder';
import { createBuilderStateFromQuiz } from '@/services/quizBuilderService';
import { importProjectFromJson } from '@/utils/exportUtils';

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
  const [activeTab, setActiveTab] = useState('templates');
  const [isImporting, setIsImporting] = useState(false);
  
  const handleTemplateSelect = (templateName: string) => {
    // Here we would fetch the template data from a service
    const mockTemplateData = {
      stages: [
        {
          id: 'stage-1',
          title: 'Quiz Cover',
          order: 0,
          type: 'cover' as const
        },
        {
          id: 'stage-2',
          title: 'Question 1',
          order: 1,
          type: 'question' as const
        },
        {
          id: 'stage-3',
          title: 'Result',
          order: 2,
          type: 'result' as const
        }
      ],
      components: [
        {
          id: 'component-1',
          type: 'stageCover' as const,
          order: 0,
          stageId: 'stage-1',
          data: {
            headline: 'Quiz Template',
            subheadline: 'Start your quiz journey',
            buttonText: 'Start'
          },
          style: {
            backgroundColor: '#f5f5f5',
            textColor: '#333333'
          }
        }
      ]
    };
    
    onImportTemplate(mockTemplateData);
    onClose();
    toast({
      title: 'Template Imported',
      description: `The ${templateName} template has been imported successfully.`,
    });
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    try {
      const importedData = await importProjectFromJson(file);
      if (importedData) {
        const builderState = createBuilderStateFromQuiz(importedData);
        onImportTemplate(builderState);
        onClose();
        toast({
          title: 'Project Imported',
          description: 'The project has been imported successfully.',
        });
      }
    } catch (error) {
      console.error('Error importing project:', error);
      toast({
        title: 'Import Error',
        description: 'Failed to import project. Please check the file format.',
        variant: 'destructive'
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  const handleImportGiseleTemplate = () => {
    // This would use a real template from your services
    const mockGiseleData = {
      stages: [
        {
          id: 'stage-g1',
          title: 'Gisele Quiz Cover',
          order: 0,
          type: 'cover' as const
        },
        {
          id: 'stage-g2',
          title: 'Style Question 1',
          order: 1,
          type: 'question' as const
        },
        {
          id: 'stage-g3',
          title: 'Style Result',
          order: 2,
          type: 'result' as const
        }
      ],
      components: [
        {
          id: 'component-g1',
          type: 'stageCover' as const,
          order: 0,
          stageId: 'stage-g1',
          data: {
            headline: 'Descubra seu Estilo Pessoal',
            subheadline: 'Responda às perguntas e encontre seu estilo predominante',
            buttonText: 'Começar'
          },
          style: {
            backgroundColor: '#FAF9F7',
            textColor: '#432818'
          }
        }
      ]
    };
    
    onImportTemplate(mockGiseleData);
    onClose();
    toast({
      title: 'Template Importado',
      description: 'O template Gisele foi importado com sucesso.',
    });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar Template de Quiz</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates Prontos</TabsTrigger>
            <TabsTrigger value="import">Importar</TabsTrigger>
            <TabsTrigger value="gisele">Template Gisele</TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Estilo Pessoal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Quiz para identificação de estilo pessoal com 10 perguntas.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleTemplateSelect('Estilo Pessoal')}>
                    Usar Template
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Coloração Pessoal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Quiz para identificar a paleta de cores ideal.</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => handleTemplateSelect('Coloração Pessoal')}>
                    Usar Template
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="import" className="py-4">
            <div className="flex flex-col items-center gap-4">
              <p className="text-sm text-center">
                Importe um quiz exportado anteriormente no formato JSON.
              </p>
              
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="w-full max-w-xs"
                disabled={isImporting}
              />
              
              {isImporting && <p className="text-sm">Importando...</p>}
            </div>
          </TabsContent>
          
          <TabsContent value="gisele" className="py-4">
            <div className="flex flex-col items-center gap-4">
              <p className="text-center">
                Template com o estilo da consultoria da Gisele, incluindo perguntas estratégicas
                e resultado personalizado.
              </p>
              
              <Button onClick={handleImportGiseleTemplate}>
                Importar Template Gisele
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuizTemplateImporter;
