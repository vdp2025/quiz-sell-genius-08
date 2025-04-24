
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const ErrorState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-lg w-full text-center">
        <AlertTriangle className="w-16 h-16 mx-auto mb-6 text-amber-500" />
        
        <h1 className="text-2xl font-playfair text-[#432818] mb-4">
          Ops! Não encontramos seus resultados
        </h1>
        
        <p className="text-gray-600 mb-6">
          Parece que você ainda não completou o quiz ou os resultados não foram salvos corretamente.
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/')}
            className="bg-[#B89B7A] hover:bg-[#A38A69] text-white w-full"
          >
            Fazer o Quiz Novamente
          </Button>
          
          <p className="text-sm text-gray-500">
            Se você já completou o quiz e está vendo esta mensagem, por favor tente novamente ou entre em contato com nosso suporte.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
