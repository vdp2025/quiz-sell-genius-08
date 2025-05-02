
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const QuizPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-[#fffaf7] p-4">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-6 shadow-md">
          <h1 className="text-2xl font-playfair text-[#aa6b5d] text-center mb-6">
            Quiz de Estilo Pessoal
          </h1>
          
          <p className="text-[#432818] text-center mb-8">
            O quiz está sendo reconstruído com um novo editor visual intuitivo.
            Volte em breve para descobrir seu estilo pessoal!
          </p>
          
          <div className="text-center">
            <Button 
              onClick={() => navigate('/resultado')}
              className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
            >
              Ver Exemplo de Resultado
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
