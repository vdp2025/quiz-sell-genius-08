
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ErrorState: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fffaf7] flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-playfair text-[#432818] mb-4">
          Opa, algo deu errado!
        </h1>
        <p className="text-[#8F7A6A] mb-6">
          Não conseguimos encontrar seus resultados do quiz. Isso pode acontecer porque você ainda não completou o quiz ou houve algum problema técnico.
        </p>
        <Link to="/">
          <Button className="bg-[#B89B7A] hover:bg-[#A38A69] text-white">
            Voltar ao Início
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorState;
