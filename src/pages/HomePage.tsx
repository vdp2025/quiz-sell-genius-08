
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-playfair text-[#432818] mb-6">
          Descubra seu Estilo Pessoal
        </h1>
        <p className="text-[#8F7A6A] mb-8 max-w-md mx-auto">
          Responda nossas perguntas para descobrir qual estilo combina mais com você
          e como expressar sua personalidade através das roupas.
        </p>
        <Link 
          to="/quiz" 
          className="inline-block px-8 py-4 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors"
        >
          Iniciar o Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
