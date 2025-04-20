
import React from 'react';
import { Link } from 'react-router-dom';

const QuizPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-3xl font-playfair text-[#432818] mb-6">
          Quiz de Estilo
        </h1>
        <p className="text-[#8F7A6A] mb-8 max-w-md mx-auto">
          Esta página contém o quiz de estilo. No projeto completo, aqui estariam
          as perguntas para o usuário responder.
        </p>
        <Link 
          to="/resultado" 
          className="inline-block px-8 py-4 bg-[#B89B7A] hover:bg-[#8F7A6A] text-white rounded-md transition-colors"
        >
          Ver Resultados
        </Link>
      </div>
    </div>
  );
};

export default QuizPage;
