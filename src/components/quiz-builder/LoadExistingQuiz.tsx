
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { QuizStep } from '@/types/quizBuilder';
import { PlusCircle, RefreshCw } from 'lucide-react';
import { styleQuizTemplate } from '@/services/templates/styleQuizTemplate';

interface LoadExistingQuizProps {
  onLoadQuiz: (steps: QuizStep[]) => void;
}

export const LoadExistingQuiz: React.FC<LoadExistingQuizProps> = ({ onLoadQuiz }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCreateNew = () => {
    onLoadQuiz([{
      id: `step-${Date.now()}`,
      title: 'Etapa 1',
      components: []
    }]);
  };
  
  const handleLoadTemplate = async () => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      onLoadQuiz(styleQuizTemplate as unknown as QuizStep[]);
      setIsLoading(false);
    }, 800);
  };
  
  return (
    <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-playfair text-[#432818] text-center mb-8">
          Construtor de Quiz
        </h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Criar Novo Quiz</CardTitle>
              <CardDescription>
                Comece do zero e crie um novo quiz personalizado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-6">
                <PlusCircle className="w-16 h-16 text-[#B89B7A]" />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleCreateNew}
                className="w-full bg-[#B89B7A] hover:bg-[#A38A69]"
              >
                Começar do Zero
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Carregar Template</CardTitle>
              <CardDescription>
                Use nosso template de Quiz de Estilo como ponto de partida
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center p-6">
                <img 
                  src="/lovable-uploads/0fb54364-9c71-4373-b6e7-500e6f9a2732.png" 
                  alt="Quiz de Estilo" 
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleLoadTemplate}
                className="w-full bg-[#432818] hover:bg-[#321808]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  'Carregar Template de Estilo'
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
