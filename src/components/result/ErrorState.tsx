
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

const ErrorState = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7F3] p-6 text-center">
      <div className="mb-6">
        <AlertCircle className="h-16 w-16 text-amber-500" />
      </div>
      <h1 className="text-2xl font-playfair text-[#432818] mb-4">
        Resultado não disponível
      </h1>
      <p className="text-[#8F7A6A] mb-8 max-w-md mx-auto">
        Parece que você não completou o quiz ou ocorreu um erro.
        Para ver seu resultado, é necessário responder todas as perguntas do quiz.
      </p>
      <Button asChild className="bg-[#B89B7A] hover:bg-[#9A7D5D]">
        <Link to="/">Iniciar o Quiz</Link>
      </Button>
    </div>
  );
};

export default ErrorState;
