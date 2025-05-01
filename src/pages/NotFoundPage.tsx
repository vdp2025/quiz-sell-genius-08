
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF7F3] p-6 text-center">
      <h1 className="text-4xl font-playfair text-[#432818] mb-4">Página não encontrada</h1>
      <p className="text-[#8F7A6A] mb-8 max-w-md mx-auto">
        A página que você está procurando não existe ou foi movida.
      </p>
      <Button asChild className="bg-[#B89B7A] hover:bg-[#9A7D5D]">
        <Link to="/">Voltar para a página inicial</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
