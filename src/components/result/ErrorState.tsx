
import React from 'react';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ErrorState: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] p-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          
          <h2 className="text-2xl font-bold text-[#432818] mb-2">
            Não foi possível carregar seu resultado
          </h2>
          
          <p className="text-[#8F7A6A] mb-6">
            Desculpe, ocorreu um erro ao carregar seu resultado do quiz. 
            Talvez você ainda não tenha completado o quiz ou houve um problema técnico.
          </p>
          
          <div className="space-y-2">
            <Button 
              onClick={() => navigate('/quiz')}
              className="w-full bg-[#B89B7A] hover:bg-[#8F7A6A]"
            >
              Fazer o quiz novamente
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="w-full border-[#B89B7A] text-[#B89B7A]"
            >
              Voltar para a página inicial
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ErrorState;
