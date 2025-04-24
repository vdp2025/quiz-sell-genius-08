
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { exportCurrentQuizToBuilderFormat, exportResultPageToBuilderFormat } from '@/utils/quizExportUtils';
import { exportProjectAsJson } from '@/utils/exportUtils';
import { QuizBuilderState } from '@/types/quizBuilder';
import { toast } from '@/components/ui/use-toast';

interface QuizExporterProps {
  onImportData: (data: QuizBuilderState) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuizExporter: React.FC<QuizExporterProps> = ({ onImportData, isOpen, onOpenChange }) => {
  const handleExportQuiz = () => {
    const quizData = exportCurrentQuizToBuilderFormat();
    const success = exportProjectAsJson(quizData);
    
    if (success) {
      toast({
        title: 'Quiz exportado',
        description: 'O arquivo JSON com os dados do quiz foi baixado.'
      });
    } else {
      toast({
        title: 'Erro ao exportar',
        description: 'Não foi possível exportar os dados do quiz.',
        variant: 'destructive'
      });
    }
  };

  const handleExportResultPage = (styleType: string) => {
    const resultData = exportResultPageToBuilderFormat(styleType);
    
    if (!resultData) {
      toast({
        title: 'Erro ao exportar',
        description: `Nenhuma configuração encontrada para o estilo ${styleType}`,
        variant: 'destructive'
      });
      return;
    }
    
    const success = exportProjectAsJson(resultData);
    
    if (success) {
      toast({
        title: 'Página de resultado exportada',
        description: 'O arquivo JSON com os dados da página de resultado foi baixado.'
      });
    } else {
      toast({
        title: 'Erro ao exportar',
        description: 'Não foi possível exportar os dados da página de resultado.',
        variant: 'destructive'
      });
    }
  };

  const handleImportQuiz = () => {
    const quizData = exportCurrentQuizToBuilderFormat();
    onImportData(quizData);
    onOpenChange(false);
    
    toast({
      title: 'Quiz importado',
      description: 'O quiz atual foi importado com sucesso para o construtor.'
    });
  };

  const handleImportResultPage = (styleType: string) => {
    const resultData = exportResultPageToBuilderFormat(styleType);
    
    if (!resultData) {
      toast({
        title: 'Erro ao importar',
        description: `Nenhuma configuração encontrada para o estilo ${styleType}`,
        variant: 'destructive'
      });
      return;
    }
    
    onImportData(resultData);
    onOpenChange(false);
    
    toast({
      title: 'Página de resultado importada',
      description: `A página de resultado para o estilo ${styleType} foi importada com sucesso.`
    });
  };

  const styleTypes = [
    'Elegante', 'Contemporâneo', 'Natural', 'Clássico', 
    'Romântico', 'Sexy', 'Dramático', 'Criativo'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-[#432818]">
            Exportar/Importar Quiz e Página de Resultado
          </DialogTitle>
          <DialogDescription>
            Exporte ou importe diretamente o quiz atual e as configurações da página de resultado.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="quiz">
          <TabsList className="mb-4">
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="result">Página de Resultado</TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="space-y-4">
            <div className="p-4 bg-[#F9F6F2] rounded-lg">
              <h3 className="font-medium mb-2">Quiz Atual (Home)</h3>
              <p className="text-sm text-gray-500 mb-4">
                Exporte o quiz atual para um arquivo JSON ou importe-o diretamente para o construtor.
              </p>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={handleExportQuiz} 
                  variant="outline" 
                  className="border-[#B89B7A]"
                >
                  Exportar como JSON
                </Button>
                <Button 
                  onClick={handleImportQuiz} 
                  className="bg-[#B89B7A] hover:bg-[#A38A69]"
                >
                  Importar para o Construtor
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="result" className="space-y-4">
            <div className="p-4 bg-[#F9F6F2] rounded-lg">
              <h3 className="font-medium mb-2">Páginas de Resultado</h3>
              <p className="text-sm text-gray-500 mb-4">
                Selecione um estilo para exportar ou importar sua configuração de página de resultado.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {styleTypes.map((style) => (
                  <div key={style} className="border border-[#B89B7A]/20 rounded-lg p-3 text-center">
                    <h4 className="font-medium mb-2">{style}</h4>
                    <div className="flex flex-col gap-2">
                      <Button 
                        onClick={() => handleExportResultPage(style)} 
                        variant="outline" 
                        size="sm" 
                        className="border-[#B89B7A] text-xs"
                      >
                        Exportar
                      </Button>
                      <Button 
                        onClick={() => handleImportResultPage(style)} 
                        size="sm" 
                        className="bg-[#B89B7A] hover:bg-[#A38A69] text-xs"
                      >
                        Importar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default QuizExporter;
