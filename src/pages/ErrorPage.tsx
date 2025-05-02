
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffaf7] p-4">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-playfair text-[#aa6b5d] mb-4">Oops!</h1>
        <p className="text-[#432818] mb-6">
          Ocorreu um erro inesperado. Nossa equipe foi notificada.
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-[#B89B7A] hover:bg-[#A38A69] text-white"
        >
          Voltar para o Início
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
