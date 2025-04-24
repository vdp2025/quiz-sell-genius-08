
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { exportProjectAsJson } from '@/utils/exportUtils';
import { QuizBuilderState, QuizStage } from '@/types/quizBuilder';

interface QuizExporterProps {
  isOpen: boolean;
  onClose: () => void;
  quizData: {
    stages: QuizStage[];
    components: any[];
  };
}

const QuizExporter: React.FC<QuizExporterProps> = ({ 
  isOpen, 
  onClose,
  quizData
}) => {
  const [activeTab, setActiveTab] = useState('json');
  const [isExporting, setIsExporting] = useState(false);
  
  const handleExportJson = () => {
    setIsExporting(true);
    try {
      const success = exportProjectAsJson(quizData);
      if (success) {
        toast({
          title: 'Quiz Exportado',
          description: 'O quiz foi exportado com sucesso no formato JSON.',
        });
        onClose();
      } else {
        throw new Error('Failed to export quiz');
      }
    } catch (error) {
      console.error('Error exporting quiz:', error);
      toast({
        title: 'Erro na Exportação',
        description: 'Ocorreu um erro ao exportar o quiz.',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  const handleExportHtml = () => {
    setIsExporting(true);
    try {
      // Here you would implement the HTML export functionality
      toast({
        title: 'Funcionalidade em Desenvolvimento',
        description: 'A exportação para HTML estará disponível em breve.',
      });
    } catch (error) {
      console.error('Error exporting HTML:', error);
      toast({
        title: 'Erro na Exportação',
        description: 'Ocorreu um erro ao exportar o HTML.',
        variant: 'destructive'
      });
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Exportar Quiz</DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="json">Arquivo JSON</TabsTrigger>
            <TabsTrigger value="html">HTML Estático</TabsTrigger>
          </TabsList>
          
          <TabsContent value="json" className="py-4">
            <div className="flex flex-col gap-4">
              <p className="text-sm">
                Exporte seu quiz como um arquivo JSON que pode ser importado posteriormente.
              </p>
              
              <Button onClick={handleExportJson} disabled={isExporting}>
                {isExporting ? 'Exportando...' : 'Exportar como JSON'}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="html" className="py-4">
            <div className="flex flex-col gap-4">
              <p className="text-sm">
                Exporte seu quiz como um arquivo HTML estático que pode ser hospedado em qualquer servidor web.
              </p>
              
              <Button onClick={handleExportHtml} disabled={isExporting || true}>
                Exportar como HTML (Em Breve)
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuizExporter;
